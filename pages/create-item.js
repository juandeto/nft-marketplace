import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import styles from '../styles/globals.module.scss';
import axios from 'axios';
import Image from 'next/image'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftaddress, nftmarketaddress
  } from '../config';

import NFT from './artifacts/contracts/NFT.sol/NFT.json'
import Market from './artifacts/contracts/NFTMarket.sol/NFTMarket.json'
    
  
export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()
  
    async function onChange(e) {
      const file = e.target.files[0]
      try {
        console.log('file: ', file)
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`received: ${prog}`)
          }
        )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    }


    const createMarket = async (event) => {
      event.preventDefault()
      debugger
      const { name, description, price } = formInput
      if (!name || !description || !price || !fileUrl){
        alert('Complete todos los campos antes de crear el NFT');
        return
      }
      /* first, upload to IPFS */
      const data = JSON.stringify({
        name, description, image: fileUrl
      })
    

      try {
        const added = await client.add(data)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
        createSale(url)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    }
  
    async function createSale(url) {
      
      const web3Modal = new Web3Modal()
      console.log('web3Modal: ', web3Modal) 
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)   
      const signer = provider.getSigner()
      /* next, create the item */
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      let transaction = await contract.createToken(url)
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()
  
      const price = ethers.utils.parseUnits(formInput.price, 'ether')
    
      /* then list the item for sale on the marketplace */
      contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()
  
      transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
      await transaction.wait()
      router.push('/')
    }
  
    return (
      <div className={styles.createItem__container}>
        <form className={styles.createItem__form} onSubmit={(event) => createMarket(event)}>
          <input 
            placeholder="Nombre del activo"
            className={styles.createItem__input}
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Descripción del activo"
            className={styles.createItem__textarea}
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            placeholder="Precio en Eth"
            className={styles.createItem__input}
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            type="file"
            name="Archivo"
            className={styles.createItem__input}
            onChange={onChange}
          />
          {
            fileUrl && (
              <Image alt="preview of the uploaded file" className={styles.createItem__container} width="350" src={fileUrl} />
            )
          }
          <button type="submit" className={styles.createItem__container}>
            Create NFT
          </button>
        </form>
      </div>
    )
}