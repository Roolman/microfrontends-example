import React, { useEffect } from 'react';
import Link from 'next/link';
import '@trutoo/event-bus';

import styles from "@/styles/auth-form/auth-form.module.css";
import { register } from "@mf-example/utils";
import { UsersEvents } from '@mf-example/events/users';
import { PopupEvents } from '@mf-example/events/popup';

function SignUp () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    eventBus.register(UsersEvents.RegisterSuccess, {})
    eventBus.register(PopupEvents.TooltipShow, {})
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    register(email, password)
      .then((res) => {
        console.log({res})
        eventBus.publish(UsersEvents.RegisterSuccess, { email })
        eventBus.publish(PopupEvents.TooltipShow, { status: "success" })
      })
      .catch((err) => {
        console.error(err);
        eventBus.publish(PopupEvents.TooltipShow, { status: "fail" })
      });
  }

  return (
    <div className={styles.authForm}>
      <form className={styles.authFormForm} onSubmit={handleSubmit}>
        <div>
          <h3 className={styles.authFormTitle}>Регистрация</h3>
          <label className={styles.authFormInput}>
            <input type="text" name="email" id="email"
              className={styles.authFormTextfield} placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className={styles.authFormInput}>
            <input type="password" name="password" id="password"
              className={styles.authFormTextfield} placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <div>
          <button className={styles.authFormButton} type="submit">Зарегистрироваться</button>
          <p className={styles.authFormText}>Уже зарегистрированы? <Link className={styles.authFormLink} href={"/signin"}>Войти</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
