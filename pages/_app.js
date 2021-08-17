import { useState } from 'react'
import styles from '../styles/globals.module.scss';
import '../styles/global.scss';
import Link from "next/link";
import { GoogleFonts } from "next-google-fonts";
import Head from 'next/head'
import {FiMenu} from 'react-icons/fi'
import {ImCross} from 'react-icons/im'

function MyApp({ Component, pageProps }) {
  const [displayMenu, setDisplayMenu] = useState(false)

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1" />
    </Head>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;700;900&display=swap" rel="stylesheet" />

    <div className={styles?.main__container}>
            <div className={styles?.nav_menuResponsive} onClick={() => setDisplayMenu(!displayMenu)}>
              {!displayMenu ?
                <FiMenu />:
                <ImCross />
              }
            </div>
          <nav className={`${styles?.nav__linkContainer} ${displayMenu ? styles?.opened:""}`}>
            <div className={`${styles?.nav__column1}`} >
              {/* <button>Connect</button> */}
            </div>
            <div className={`${styles?.nav__column2}`}>
              <Link href="/">
                <a className={styles?.nav__link} onClick={() => setDisplayMenu(!displayMenu)}>
                  Home
                </a>
              </Link>
              <Link href="/catalogue">
                <a className={styles?.nav__link} onClick={() => setDisplayMenu(!displayMenu)}>
                  Gallery
                </a>
              </Link>
              <Link href="/create-item">
                <a className={styles?.nav__link} onClick={() => setDisplayMenu(!displayMenu)}>
                  Sell NFT&apos;s
                </a>
              </Link>
              <Link href="/my-assets">
                <a className={styles?.nav__link} onClick={() => setDisplayMenu(!displayMenu)}>
                  My NFT&apos;s
                </a>
              </Link>
              <Link href="/creator-dashboard">
                <a className={styles?.nav__link} onClick={() => setDisplayMenu(!displayMenu)}>
                  Creator Dashboard
                </a>
              </Link>
            </div >
        </nav>
      <Component {...pageProps} />
      <footer className={styles?.footer_container}>
      <section className={styles?.media_links}>
          <span><a
            href="mailto:juandeto10@gmail.com?"
            rel="noreferrer"
              target="_blank"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a></span>
          <span>
            <a
              href="https://www.linkedin.com/in/juan-de-tomaso-38942a17/"
              rel="noreferrer"
              target="_blank"
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a
            >
          </span>
          <span>
            <a
              href="https://github.com/juandeto"
              rel="noreferrer"
              target="_blank"
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a
            >
          </span>
        </section>
      </footer>
    </div>
    </>
  
  )
}

export default MyApp;
