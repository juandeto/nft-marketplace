import { useState } from 'react'
import Image from 'next/image';
import styles from '../styles/globals.module.scss';
import detoLogo from '../assets/deto-logo.jpg';
import yellowPantera1 from '../assets/yellowPantera1.png';
import pantera2 from '../assets/pantera2.png'
import Link from 'next/link'


export default function Landing() {

  return (
    <>
    <main className={styles.landing}>
          <div className={styles.landing_img}>
            <Image
            alt="yellow classic pantera"
            src={yellowPantera1} />
          </div>
         <div className={styles.title_container}>
           <div className={styles.title_image}>
             <Image
              src={detoLogo}
                alt="de Tomaso brand logo"
              /> 
           </div>
          
          <div className={styles.landing_info}>
            <h1>NFT Market about de Tomaso brand</h1>
            <Link href="/create-item">
              <button>Start</button>
            </Link>
          </div>
          </div>
      </main>
      <section className={styles.landing_msg}>
        <h2>We are</h2>
        <p>a community that shares love for de Tomaso brand,</p>
        <p>so we want to discover and show unique material.</p>
        <h3>¡Welcome!</h3>
      </section>
      <section className={styles.landing_collection}>
        <div className={styles.info}>
          <h2>Explore <span>NFT&#39;s</span> gallery</h2>
          <button>Go</button>
        </div>
        <div className={styles.landing_collectionImg}>
          <Image src={pantera2} alt="front picture -black'n white- Pantera car" />
        </div>
      </section>
      </>
  )
}