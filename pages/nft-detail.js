import { useRouter } from "next/router"
import catalogue from '../styles/catalogue.module.scss'
import {FaEthereum} from 'react-icons/fa'
import Image from 'next/image'
import pantera2 from '../assets/pantera2.png'
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';

import {
    nftaddress, nftmarketaddress
  } from '../config';

import NFT from './artifacts/contracts/nft.sol/nft.json'
import Market from './artifacts/contracts/nftmarket.sol/nftmarket.json'


export default function NFTDetail() {
    const router = useRouter()
    const obj_empty = {
        image: '',
        name: 'empty',
        description: 'none',
        price: '0'
    }
    const nft = JSON.parse(router?.query?.nft || JSON.stringify(obj_empty));

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
    
    return(
        <div className={catalogue?.detail_container}>
            <article className={catalogue?.detail_main  }>
                <span className={catalogue?.detail_column1}>
                    <Image src={nft?.image || pantera2} objectFit="cover" alt="nft picture" layout='fill' loading="lazy"/>
                </span>
                <span className={catalogue?.detail_column2}>
                    <h2>{nft?.name}</h2>
                    <div className={catalogue?.detail_info}>
                        <div className={catalogue?.detail_info_desc}>
                            <span>Description</span>
                            <p>{nft?.description}</p>
                        </div>
                        <div className={catalogue?.detail_info_price}>
                            <span>Price</span>
                            <p><FaEthereum/> {nft?.price}</p>
                        </div>
                        <div className={catalogue?.detail_buyBtn}>
                            <button
                            onClick={() => buyNft(nft)}
                            >Buy</button>
                        </div>
                    </div>
                </span>
            </article>
        </div>
    )
}