import { useCallback, useEffect, useState } from "react";
import "@trutoo/event-bus";

import { api } from "@mf-example/utils";

import styles from './UserData.module.css';
import type { User } from "@/types/types";
import type { Subscription } from "@trutoo/event-bus/dist/event-bus";
import { UsersEvents } from "@mf-example/events/users";
import { PopupEvents } from '@mf-example/events/popup';

export const UserData = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const subs: Subscription[] = [];

        eventBus.register(PopupEvents.OpenAddPlace, {})
        eventBus.register(PopupEvents.EditProfile, {})
        eventBus.register(PopupEvents.EditAvatar, {})

        eventBus.register(UsersEvents.UpdateData, {})

        subs.push(eventBus.subscribe<User>(UsersEvents.UpdateData, ({ payload }) => {
            if(payload) {
                setUser(payload)
            }
        }))

        return () => {
            subs.forEach(sub => sub.unsubscribe())
        }
    }, [])

    useEffect(() => {
        api
        .getUserInfo()
        .then((userData) => {
            eventBus.publish(UsersEvents.UpdateData, userData)
        })
        .catch((err) => console.log(err));
    }, []);

    const onEditAvatar = useCallback(() => {
        eventBus.publish(PopupEvents.EditAvatar)
    }, [])

    const onEditProfile = useCallback(() => {
        eventBus.publish(PopupEvents.EditProfile)
    }, [])

    const onAddPlace = useCallback(() => {
        eventBus.publish(PopupEvents.OpenAddPlace)
    }, [])

    const imageStyle = { backgroundImage: `url(${user?.avatar})` };

    return (
     <section className={styles.profile + " page__section"}>
        <div className={styles.profileImage} onClick={onEditAvatar} style={imageStyle}></div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileTitle}>{user?.name}</h1>
          <button className={styles.profileEditButton} type="button" onClick={onEditProfile}></button>
          <p className={styles.profileDescription}>{user?.about}</p>
        </div>
        <button className={styles.profileAddButton} type="button" onClick={onAddPlace}></button>
      </section>
    )
}
