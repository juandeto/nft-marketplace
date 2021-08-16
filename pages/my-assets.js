import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import NFTCard from './GeneralComponents/NFTCard'
import assets from '../styles/myAssets.module.scss';
import Spinner from './GeneralComponents/Spinner'

import {
  nftaddress, nftmarketaddress
} from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function MyAssets() {
const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    setLoadingState(true)
    const web3Modal = new Web3Modal()

    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    setNfts(items)
    setLoadingState(false) 
  }
  if (loadingState) return <Spinner />
  return (
    <div className={assets.container}>
      <div className={assets.gallery_container}>
        <header>
            <h2>Gallery</h2>
        </header>
        <div className={assets.gallery}>
          {!nfts.length ? <h3 className={assets.empty_state}>No assets owned</h3>:
             nfts.map((nft, i) => <NFTCard key={i} nft={nft}/>)
          }
        </div>
      </div>
    </div>
  )
}