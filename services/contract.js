import { ethers } from "ethers";
import useSWR from "swr";
import { contractABI, contractAddress } from "../contract.config";





export const useContract = () => {

    const { data, error } = useSWR('useContract', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        return contract
    })

    return {
        data,
        error
    }

}


export const useGetCurrentLotteryParticipants = () => {

    const { data, error } = useSWR('useGetCurrentLottery', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        let res = await contract.getCurrentCount()
        return parseInt(res.toString())
    })


    return {
        data,
        error
    }


}


export const useGetAffiliatePercentage = () => {

    const { data, error } = useSWR('useGetAffiliatePercentage', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        let res = await contract.affiliateRatio()
        return parseInt(res.toString())
    })


    return {
        data,
        error
    }


}


export const useGetLotteryTicketPrice = () => {

    const { data, error } = useSWR('useGetLotteryTicketPrice', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        let res = await contract.lotteryAmount()
        return ethers.utils.formatEther(res);
    })


    return {
        data,
        error
    }

}


export const useGetCurrentGameNumber = () => {

    const { data, error } = useSWR('useGetCurrentGameNumber', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        let res = await contract.currentLottery()
        return parseInt(res.toString())
    })

    return {
        data,
        error
    }

}


export const useGetLotteryEndingTime = () => {
    const { data, error } = useSWR('useGetLotteryEndingTime', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        let currentLottery = await contract.currentLottery()
        let res = await contract.lotteries(currentLottery)
        return res.endingTime?.toNumber() * 1000
    })

    return {
        data,
        error
    }
}







export const useGetIsJoined = () => {
    
    const { data, error } = useSWR('useGetIsJoined', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        let res = await contract.isWalletSubmittedHash()
        return res
    })

    return {
        data,
        error
    }
}

export const useGetIsSubmittedSecret = () => {
    
    const { data, error } = useSWR('useGetIsSubmittedSecret', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        let res = await contract.isWalletSubmittedSecret()
        return res
    })

    return {
        data,
        error
    }
}




export const useGetLotteryHistory = () => {
   
    const { data, error } = useSWR('useGetLotteryHistory', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
        let currentGameId = parseInt(await contract.currentLottery())
            
        let res = await Promise.all([...Array(currentGameId).keys()].map(async (id) => {
            let currentLottery = await contract.lotteries(id+1);
            console.log(id, currentLottery)
            return {
                id,
                winnder: currentLottery.winner?.toString(),
                timestamp: currentLottery.resultTime?.toNumber() * 1000
            }
        }))
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const contract = new ethers.Contract(contractAddress, contractABI, provider);
        // let res = await contract.isWalletSubmittedHash()
        return res;
    })

    return {
        data,
        error
    }
}