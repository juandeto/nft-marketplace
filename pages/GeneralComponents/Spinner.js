import styles from'../../styles/globals.module.scss'


export default function Spinner() {
    return(
        <div className={styles.spinner_container}>
            <div className={styles.spinner}></div>
        </div>
    )
}