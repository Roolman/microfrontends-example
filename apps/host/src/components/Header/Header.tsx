import React from 'react';
import Link from 'next/link';

import logoPath from '../../images/logo.svg';
import styles from './Header.module.css';
import dynamic from 'next/dynamic';

const LogoutButton = dynamic(() => import('activation/logout-button'), { ssr: false });

export function Header ({ isLoggedIn, email }: { isLoggedIn: boolean; email?: string }) {
  return (
    <header className={styles.header + " page__section"}>
      <img src={logoPath.src} alt="Логотип проекта Mesto" className={styles.headerLogo + " logo"} />
      <div className={styles.headerWrapper}>
          {email ? <p className={styles.headerUser}>{email}</p> : null}
          {isLoggedIn ? <LogoutButton /> : null}
      </div>
      {isLoggedIn ? null : <Link className={styles.headerAuthLink} href="/signin">Войти</Link>}
      {isLoggedIn ? null : <Link className={styles.headerAuthLink} href="/signup">Регистрация</Link>}
    </header>
  )
}
