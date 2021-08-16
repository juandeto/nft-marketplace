import catalogue from '../../styles/catalogue.module.scss'
import {FaEthereum} from 'react-icons/fa'
import Image from "next/image"
import Router from 'next/router'
export default function NFTCard({nft}) {
  

const handleDetailRoute = () => {
  Router.push({
    pathname: '/nft-detail',
    query: { nft: JSON.stringify(nft)}
})
}
    return(
        <div 
        onClick={handleDetailRoute}
        className={catalogue.nft__card}>
              <div className={catalogue.nft__cardImage}>
                <Image src={nft.image} alt="image__nft" layout='fill'/>
              </div>
              
              {/* <div className={catalogue.nft__info}>
                <p className={catalogue.nft__name}>{nft.name}</p>
                <div className={catalogue.nft__description}>
                  <p>{nft.description}</p>
                </div>
              </div> */}
              <div className={catalogue.nft_buyOption}>
                  <div className={catalogue.nft__name}>
                      <label>Name</label>
                        <p><strong>{nft.name}</strong></p>
                  </div>
                  <div className={catalogue.price}>
                      <label>Price</label>
                      <p><FaEthereum /><strong>{nft.price}</strong></p>
                  </div>
              </div>
        </div>
    )
}