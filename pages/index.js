import { amber, amberDark, blackA, indigo, mauve, orange, orangeDark, purple, violet, whiteA } from '@radix-ui/colors'
import { styled } from '@stitches/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Countdown from 'react-countdown'
import { Button } from '../component/Button'
import { SiEthereum } from 'react-icons/si'
import { RiGroupFill } from 'react-icons/ri'
import { ethers } from 'ethers'
import React, { useEffect, useMemo, useState } from 'react'
import { Input } from '../component/Input'
import truncateEthAddress from 'truncate-eth-address'
import { useContract, useGetAffiliatePercentage, useGetCurrentGameNumber, useGetCurrentLotteryParticipants, useGetIsJoined, useGetIsSubmittedSecret, useGetLotteryEndingTime, useGetLotteryHistory, useGetLotteryTicketPrice } from '../services/contract'
import { contractABI, contractAddress } from '../contract.config'
import ReactConfetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'


import {  keyframes } from '@stitches/react';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

function Content({ children, ...props }) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
}

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogTitle = StyledTitle;
export const AlertDialogDescription = StyledDescription;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

// Your app...
const Flex = styled('div', { display: 'flex' });



const MAX = 9999999999
const Container = styled('div', {
  minWidth: "100vw",
  minHeight: "100vh",
})


const Abicoder = ethers.utils.defaultAbiCoder
const sha3 = (number, address) => ethers.utils.solidityKeccak256(['uint256', 'address'], [number, address])



const Box = styled('div')

export default function Home() {

  const [address, setAddress] = useState()
  const { data: contract } = useContract();







  const [secret, setSecret] = useState('');

  const [playConffeti, setPlayConffeti] = useState(false);
  const { data: gameID } = useGetCurrentGameNumber()
  const { data: participants } = useGetCurrentLotteryParticipants()
  const { data: affiliatePercen } = useGetAffiliatePercentage()
  const { data: ticketPrice } = useGetLotteryTicketPrice()
  const { data: isJoined } = useGetIsJoined()
  const { data: isSubmitted } = useGetIsSubmittedSecret()
  const { data: endingTime } = useGetLotteryEndingTime()
  const { data: lotteryHistory } = useGetLotteryHistory();
 
  const isAvailableToJoin = new Date(endingTime).getTime() > new Date().getTime();

  React.useEffect(() => {
    if(lotteryHistory?.length){
      var lastLottery = lotteryHistory[lotteryHistory?.length - 2]
      console.log(lotteryHistory, lastLottery?.timestamp + 120000 - new Date().getTime())
      if(lastLottery?.timestamp + 120000 - new Date().getTime() >= 0){
       
        setPlayConffeti(true)
        alert('Congrats, you won previous lottery!')
      }
    }
    
  }, [lotteryHistory])



  const conntectToWallet = async () => {
    if (!window.ethereum) {
      alert('Browser does not support metamask wallet')
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];

    const signer = provider.getSigner();

    const address = await signer.getAddress();
    setAddress(address)

  }


  const joinLottery = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    let accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    let tx = await contract.join(sha3(secret, address), { value: ethers.utils.parseEther('0.02') });
    await tx.wait();
  }

  const submitSecret = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    let accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    let tx = await contract.submitSecret(secret, { value: ethers.utils.parseEther('0') });
    await tx.wait();
  }

  const onAccountsChanged = (accounts) => {
    setAddress(accounts[0])
  }


  const onLotteryEnd = (
    winner,
    affiliateAmount,
    winningPrice) => {
      console.log('end', winner,
        affiliateAmount,
        winningPrice)
    if (winner == address) {
      setPlayConffeti(true)
    }
  }



  React.useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    provider.on('LotteryRunFinished', onLotteryEnd)

    return () => {
      provider.removeAllListeners('LotteryRunFinished')
    }
  }, [])

  React.useEffect(() => {
    window.ethereum?.on('accountsChanged', onAccountsChanged)

    return () => {
      window.ethereum?.removeListener("accountsChanged", onAccountsChanged)
    }
  }, [])


  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box css={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        <h1 style={{ color: violet.violet2 }}>KRIPTO LOTTTERY</h1>

        <Box css={{
          '& a': {
            transition: "0.4s ease all",
            color: violet.violet8,
            '&:hover': {
              color: violet.violet7
            }
          },
          display: "flex",
          gap: 20
        }}>

          <Link href='#about'>About</Link>
          <Link href='#howtoplay'>How to play</Link>

        </Box>
        <br />

        {address ? <p style={{ fontWeight: 300 }}>connected {truncateEthAddress(address)}</p> : null}

        <Box css={{ width: 500, maxWidth: "90vw", padding: 20, borderRadius: 12, background: `linear-gradient(125deg, ${purple.purple9} 0%, ${violet.violet10} 74%)`, }}>
          <h4 style={{ margin: 5 }}>CLOSING LOTTERY IN</h4>
          <h1 style={{ fontSize: "45px" }}>  <Countdown date={new Date(endingTime)} /></h1>


          <div style={{ height: 10 }}></div>
          {!address && <Button size='md' onClick={conntectToWallet}>Connect to wallet</Button>}
          {address && !isJoined && isAvailableToJoin && <Box css={{ padding: '5%', display: "flex", flexDirection: "column", gap: 10, textAlign: "left", color: violet.violet11, background: 'white', borderRadius: 10 }}>
            <span style={{ fontSize: "smaller" }}>Your secret number</span>
            <Input min={0} max={MAX} value={secret} onChange={(e) => {
              let val = e.target.value
              if (val <= MAX)
                setSecret(val)
            }} variant='violet' type='number' placeholder='secret number'></Input>

            <span style={{ fontSize: "smaller" }} >SHA3 hash of the secret number and your wallet address</span>
            <Input value={secret ? sha3(parseInt(secret), address).toString() : ''} variant='violet' placeholder='sha3 value'></Input>
            <br />
            <Button onClick={joinLottery} variant='violet'>Join</Button>
          </Box>}

          {address && isJoined && !isSubmitted && <Box style={{ padding: '5%', display: "flex", flexDirection: "column", gap: 10, textAlign: "left", color: violet.violet11, background: 'white', borderRadius: 10 }}>
            <span style={{ fontSize: "smaller" }}>Your secret number</span>
            <Input min={0} max={MAX} value={secret} onChange={(e) => {
              let val = e.target.value
              if (val <= MAX)
                setSecret(val)
            }} variant='violet' type='number' placeholder='secret number'></Input>
            <br />
            <Button onClick={submitSecret} variant='violet'>Submit Secret Number</Button>
          </Box>}
          {address && isJoined && isSubmitted && <p>Waiting for lottery result</p>}
          {address && !isJoined && !isAvailableToJoin && <Box css={{ padding: '5%', display: "flex", flexDirection: "column", gap: 10, textAlign: "left", color: violet.violet11, background: 'white', borderRadius: 10 }}>
            <span style={{ fontSize: "smaller" }}>Current lottery is closing. Please comeback for next lottery. </span>

          </Box>}
        </Box>
        <br />


        <Box css={{ width: 1000, maxWidth: "90vw", padding: 20, display: "flex", color: violet.violet6, alignItems: "center", justifyContent: "space-between" }}>
          <Box >
            <h3 style={{ fontWeight: "400" }}>Game</h3>
            <h1 style={{ color: whiteA.whiteA12 }}>#{gameID}</h1>
          </Box>

          <Box>
            <h3 style={{ fontWeight: "400" }}>Participants</h3>
            <h1 style={{ color: whiteA.whiteA12 }}>{participants} <RiGroupFill /></h1>
          </Box>

          <Box>
            <h3 style={{ fontWeight: "400" }}>Ticket price</h3>
            <h1 style={{ color: whiteA.whiteA12 }}>{ticketPrice} ETH <SiEthereum /></h1>
          </Box>

          <Box>
            <h3 style={{ fontWeight: "400" }}>Payout</h3>
            <h1 style={{ color: whiteA.whiteA12 }}>{100 - affiliatePercen}%</h1>
          </Box>

        </Box>
        <br />
        <h2>History</h2>
        <Box css={{
          width: 700, maxWidth: "90vw", color: whiteA.whiteA12, padding: 20, borderRadius: 12, background: `linear-gradient(125deg, ${orange.orange9} 0%, ${amber.amber8} 74%)`
        }}>
          <Box css={{
            columnGap: 10,
            padding: 10,
            rowGap: 5,
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: '10% 30% auto',
            textAlign: "left"
          }}>
            <span><strong>ID</strong></span>
            <span><strong>Date</strong></span>
            <span><strong>Winner</strong></span>


          </Box>
          {lotteryHistory?.map((item, id) => <Box css={{
            background: whiteA.whiteA7,
            padding: 10,
            borderRadius: 5,
            display: "grid",
            columnGap: 10,
            rowGap: 5,
            gridTemplateColumns: '10% 30% auto',
            textAlign: "left"
          }}>
            <span key={`item ${id}`}>#{item.id + 1}</span>
            <span key={`date ${id}`}> {item?.timestamp ? new Date(item?.timestamp).toLocaleString() : '-'}</span>
            <span key={`address ${id}`}>{item.winner != '0x0000000000000000000000000000000000000000' ? truncateEthAddress(item.winner) : '-'}</span>
          </Box>)}
        </Box>


      </Box>
      <Box css={{ height: '30vh' }}>

      </Box>
      <Box css={{ paddingLeft: '10%', paddingRight: "10%" }}>
        <Box id='about'>
          <h4 style={{ color: violet.violet5 }}>About</h4>
          <p style={{ fontSize: "1.2em", fontWeight: 300 }}>Krypto Lottery is the digitized version of the traditional lottery system. Secure, transparent, randomness verifiable living on Polygon blockchain.</p>
        </Box>
        <Box id='howtoplay'>
          <h4 style={{ color: violet.violet5 }}>How to play</h4>
          {/* <p style={{fontSize:"1.2em", fontWeight:300}}>Krypto Lottery is the digitized version of the traditional lottery system. Secure, transparent, randomness verifiable living on Polygon blockchain.</p> */}
        </Box>
      </Box>
      {playConffeti && <Box style={{ position:"absolute", top:0, left:0, width: "100vw", height: "100vh", overflow:"hidden", display: "flex", justifyContent: "center" }}>
        <ReactConfetti width={1000} height={800} />
      </Box>}

      

    </Container >
  )
}
