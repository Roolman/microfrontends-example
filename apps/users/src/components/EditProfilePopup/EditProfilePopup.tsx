import React, { useCallback, useEffect } from 'react';
import { PopupWithForm } from "@mf-example/ui/components/PopupWithForm";
import { api } from "@mf-example/utils";

import type { Subscription } from '@trutoo/event-bus/dist/event-bus';
import type { User } from '@/types/types';
import { UsersEvents } from '@mf-example/events/users';
import { PopupEvents } from '@mf-example/events/popup';

export function EditProfilePopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  useEffect(() => {
    const subs: Subscription[] = [];

    eventBus.register(UsersEvents.UpdateData, {})
    eventBus.register(PopupEvents.CloseAll, {})
    eventBus.register(PopupEvents.EditProfile, {})
    
    subs.push(eventBus.subscribe(PopupEvents.EditProfile, () => {
      setIsOpen(true);
    }))
    subs.push(eventBus.subscribe<User>(UsersEvents.UpdateData, ({ payload }) => {
        if(payload) {
          setName(payload.name)
          setDescription(payload.about)
        }
    }))
    subs.push(eventBus.subscribe(PopupEvents.CloseAll, () => {
      setIsOpen(false);
    }))

    return () => {
        subs.forEach(sub => sub.unsubscribe())
    }
}, [])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
      .setUserInfo({
        name,
        about: description,
      })
      .then((newUserData) => {
        eventBus.publish(UsersEvents.UpdateData, newUserData)
        eventBus.publish(PopupEvents.CloseAll)
      })
      .catch((err) => console.log(err));
  }

  const onClose = useCallback(() => {
    eventBus.publish(PopupEvents.CloseAll)
  }, [])

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength={2} maxLength={40} pattern="[a-zA-Zа-яА-Я -]{1,}"
               value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength={2} maxLength={200}
               value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}
