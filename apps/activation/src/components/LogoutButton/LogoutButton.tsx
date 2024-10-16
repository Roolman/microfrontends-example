import { UsersEvents } from "@mf-example/events/users"

import styles from './LogoutButton.module.css';

export const LogoutButton = () => {

    const handleSignOut = () => {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        
        eventBus.publish(UsersEvents.Logout)
    }

    return (
        <button className={styles.logoutButton} onClick={handleSignOut}>Выйти</button>
    )
}
