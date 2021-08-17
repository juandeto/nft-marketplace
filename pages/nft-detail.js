import { useRouter } from "next/router"
import catalogue from '../styles/catalogue.module.scss'
import {FaEthereum} from 'react-icons/fa'
import Image from 'next/image'

export default function NFTDetail() {
    const router = useRouter()
    const obj_empty = {
        image: '',
        name: 'empty',
        description: 'none',
        price: '0'
    }
    const nft = JSON.parse(router?.query?.nft || obj_empty);

    
    return(
        <div className={catalogue?.detail_container}>
            <article className={catalogue?.detail_main  }>
                <span className={catalogue?.detail_column1}>
                    <Image src={nft?.image} alt="nft picture" />
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
                            <button>Buy</button>
                        </div>
                    </div>
                </span>
            </article>
        </div>
    )
}