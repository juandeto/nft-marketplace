import styles from '../styles/globals.module.scss';
import '../styles/global.scss';
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.main__container}>
      <nav className={styles.nav__container}>
        <h1>Juan Marketplace</h1>
        <div className={styles.nav__linkContainer}>
          <Link href="/">
            <a className={styles.nav__link}>
              Home
            </a>
          </Link>
          <Link href="/create-item">
            <a className={styles.nav__link}>
              Vender NFT&apos;s
            </a>
          </Link>
          <Link href="/my-assets">
            <a className={styles.nav__link}>
              Mis NFT&apos;s
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className={styles.nav__link}>
              Crear
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  
  )
}

export default MyApp
