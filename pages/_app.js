import styles from '../styles/globals.module.scss';
import '../styles/global.scss';
import Link from "next/link";
import { GoogleFonts } from "next-google-fonts";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;700;900&display=swap" rel="stylesheet" />
    <div className={styles.main__container}>
          <nav className={styles.nav__linkContainer}>
            <div className={styles.nav__column1}>
              <button>Connect</button>
            </div>
            <div className={styles.nav__column2}>
              <Link href="/">
                <a className={styles.nav__link}>
                  Home
                </a>
              </Link>
              <Link href="/catalogue">
                <a className={styles.nav__link}>
                  Gallery
                </a>
              </Link>
              <Link href="/create-item">
                <a className={styles.nav__link}>
                  Sell NFT&apos;s
                </a>
              </Link>
              <Link href="/my-assets">
                <a className={styles.nav__link}>
                  My NFT&apos;s
                </a>
              </Link>
              <Link href="/creator-dashboard">
                <a className={styles.nav__link}>
                  Create
                </a>
              </Link>
            </div >
        </nav>
      <Component {...pageProps} />
    </div>
    </>
  
  )
}

export default MyApp
