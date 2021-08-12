import { useRouter } from "next/router"
import catalogue from '../styles/catalogue.module.scss'
import {FaEthereum} from 'react-icons/fa'

export default function NFTDetail() {
    const router = useRouter()
    console.log('Router:', router)
    const nft = JSON.parse(router.query.nft);
    return(
        <div className={catalogue.detail_container}>
            <article className={catalogue.detail_main  }>
                <span className={catalogue.detail_column1}>
                    <img src={nft?.image} alt="pic_nft?" />
                </span>
                <span className={catalogue.detail_column2}>
                    <h2>{nft?.name}</h2>
                    <div className={catalogue.detail_info}>
                        <div className={catalogue.detail_info_desc}>
                            <span>Description</span>
                            <p>{nft?.description}</p>
                        </div>
                        <div className={catalogue.detail_info_price}>
                            <span>Price</span>
                            <p><FaEthereum/> {nft?.price}</p>
                        </div>
                        <div className={catalogue.detail_buyBtn}>
                            <button>Buy</button>
                        </div>
                    </div>
                </span>
            </article>
        </div>
    )
}