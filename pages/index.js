import { indigo, purple, violet, whiteA } from '@radix-ui/colors'
import { styled } from '@stitches/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Countdown from 'react-countdown'
import { Button } from '../component/Button'
import { SiEthereum } from 'react-icons/si'
import {  RiGroupFill } from 'react-icons/ri'
const Container = styled('div', {
  minWidth: "100vw",
  minHeight: "100vh",
 
})

const StyledLink = styled(Link, {
  color: violet.violet5
})

const Box = styled('div')

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box css={{ textAlign: "center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
        
        <h1 style={{color: violet.violet2}}>KRIPTO LOTTTERY</h1>

        <Box css={{
          '& a':{
            transition:"0.4s ease all",
            color: violet.violet8,
            '&:hover':{
              color: violet.violet7
            }
          },
          display:"flex",
          gap:20
        }}>

          <Link href='#about'>About</Link>
          <Link href='#howtoplay'>How to play</Link>

        </Box>
        <br/>

        <Box css={{width:600, maxWidth:"90vw", padding:20,  borderRadius:12,   background:`linear-gradient(125deg, ${purple.purple9} 0%, ${violet.violet10} 74%)`,}}>
            <h4 style={{margin:5}}>NEXT LOTTERY IN</h4>
            <h1 style={{fontSize:"45px"}}>  <Countdown date={Date.now() + 1000000}  /></h1>
            <Button size='md' >Connect to wallet</Button>
        </Box>

        <Box  css={{width:1000, maxWidth:"90vw", padding:20, display:"flex", color: violet.violet6, alignItems:"center", justifyContent:"space-between" }}>
          <Box >
            <h3 style={{fontWeight:"400"}}>Game</h3>
            <h1 style={{color:whiteA.whiteA12}}>#25</h1>
          </Box>

          <Box>
            <h3 style={{fontWeight:"400"}}>Participants</h3>
            <h1 style={{color:whiteA.whiteA12}}>10 <RiGroupFill/></h1>
          </Box>

          <Box>
            <h3 style={{fontWeight:"400"}}>Pool</h3>
            <h1 style={{color:whiteA.whiteA12}}>0.02 ETH <SiEthereum/></h1>
          </Box>

          <Box>
            <h3 style={{fontWeight:"400"}}>Payout</h3>
            <h1 style={{color:whiteA.whiteA12}}>95%</h1>
          </Box>
          
        </Box>
        <br/>
        
      </Box>
      <Box css={{height:'30vh'}}>

      </Box>
      <Box css={{paddingLeft:'10%', paddingRight:"10%"}}>
      <Box id='about'>
          <h4 style={{color: violet.violet5}}>About</h4>
          <p style={{fontSize:"1.2em", fontWeight:300}}>Krypto Lottery is the digitized version of the traditional lottery system. Secure, transparent, randomness verifiable living on Polygon blockchain.</p>
        </Box>
        <Box id='howtoplay'>
          <h4 style={{color: violet.violet5}}>How to play</h4>
          {/* <p style={{fontSize:"1.2em", fontWeight:300}}>Krypto Lottery is the digitized version of the traditional lottery system. Secure, transparent, randomness verifiable living on Polygon blockchain.</p> */}
        </Box>
        </Box>

    </Container>
  )
}
