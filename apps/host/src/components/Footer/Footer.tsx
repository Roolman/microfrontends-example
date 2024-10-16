import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer + " page__section"}>
      <p className={styles.footerCopyright}>
        © 2024 Mesto Russia
      </p>
    </footer>
  );
}
