import Image from 'next/image';
import styles from '../styles/globals.module.scss';
import detoLogo from '../assets/deto-logo.jpg';
import yellowPantera1 from '../assets/yellowPantera1.png';
import Link from 'next/link'


export default function Landing() {

  return (
    <>
    <main className={styles.landing}>
          <div className={styles.landing_img}>
            <Image
            src={yellowPantera1} />
          </div>
         <div className={styles.title_container}>
          <Image
           src={detoLogo}
            alt="logo"
            alt="Picture of the author"
          /> 
          <div className={styles.landing_info}>
            <h4>NFT Market about de Tomaso brand</h4>
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
        <h2>Explore <span>NFT's</span> gallery</h2>
        <div className={styles.landing_collectionImg}>
        
        </div>
      </section>
      </>
  )
}