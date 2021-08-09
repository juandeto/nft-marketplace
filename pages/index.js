import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import styles from '../styles/globals.module.scss';

import {
  nftaddress, nftmarketaddress
} from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNfts()
  }, [])

  async function loadNfts() {
    setLoading(true)
    const provider = new ethers.providers.JsonRpcProvider() //provider génerico
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

if(loading || !nfts.length) return (
    <h2 className={styles.empty__state}>No hay items en el mercado</h2>
  )

  return (
    <div className={styles.home__container}>
      <div className={styles.nfts_container}>
        {
          nfts.map((nft, i) => (
            <div key={i} className={styles.nft__card}>
              <img src={nft.image} alt="image__nft"/>
              <div className={styles.nft__info}>
                <p className={styles.nft__name}>{nft.name}</p>
                <div className={styles.nft__description}>
                  <p>{nft.description}</p>
                </div>
              </div>
              <div className={styles.nft_buyOption}>
                <p>{nft.price}</p>
                <button 
                onClick={() => buyNft(nft)}
                className={styles.nft__buyBtn}>Comprar</button>  
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}