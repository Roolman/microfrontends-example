import { NextPageContext } from 'next';
import React from 'react';
import '@trutoo/event-bus';

import styles from "@/styles/auth-form/auth-form.module.css";
import { login } from "@mf-example/utils";
import { UsersEvents } from '@mf-example/events/users';
import { PopupEvents } from '@mf-example/events/popup';

function SignIn () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    login(email, password)
      .then(() => {
        eventBus.register(UsersEvents.LoginSuccess, { })
        eventBus.publish(UsersEvents.LoginSuccess, { email })
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
          <h3 className={styles.authFormTitle}>Вход</h3>
          <label className={styles.authFormInput}>
            <input type="text" name="name" id="email"
              className={styles.authFormTextfield} placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className={styles.authFormInput}>
            <input type="password" name="password" id="password"
              className={styles.authFormTextfield} placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className={styles.authFormButton} type="submit">Войти</button>
      </form>
    </div>
  )
}

export const getServerSideProps = (ctx: NextPageContext) => {
  console.log("THIS CODE RUNS ON SERVER")

  return {
    props: {
      id: ctx.query.id || '0'
    }
  }
}

export default SignIn;
