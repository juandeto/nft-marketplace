import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import NFTCard from './GeneralComponents/NFTCard'
import styles from '../styles/globals.module.scss';
import Spinner from './GeneralComponents/Spinner'

import {
  nftaddress, nftmarketaddress
} from '../config';

import NFT from './artifacts/contracts/nft.sol/nft.json'
import Market from './artifacts/contracts/nftmarket.sol/nftmarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNfts()
  }, [])

  async function loadNfts() {
    setLoading(true)
    const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/d6b40571d3fb4b5c81ec4e57b58c39d5') //provider génerico
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri) //https://ifps... sacas la metadata del token: imagen, etc
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

      let item = {
        price: price,
        tokenId: i.price.toString(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      }

      return item
    }))

    setNfts(items)
    setLoading(false)
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }


  return (
    <div className={styles?.home__container}>
      <header>
        <h2>Gallery</h2>
      </header>
      <div className={styles?.nfts_container}>
        {loading ? <Spinner /> :
         nfts.map((nft, i) => <NFTCard key={i} nft={nft}/>)
        }
      </div>
    </div>
  )
}