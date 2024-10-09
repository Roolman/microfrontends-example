import React, { useCallback, useEffect } from 'react';
import { PopupWithForm } from "@mf-example/ui/components/PopupWithForm";
import { api } from "@mf-example/utils"
import type { Subscription } from '@trutoo/event-bus/dist/event-bus';
import { UsersEvents } from '@mf-example/events/users';
import { PopupEvents } from '@mf-example/events/popup';

export function EditAvatarPopup() {
  const inputRef = React.useRef(null);

  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const subs: Subscription[] = [];

    eventBus.register(UsersEvents.Logout, {})
    eventBus.register(PopupEvents.CloseAll, {})
    eventBus.register(PopupEvents.EditAvatar, {})

    subs.push(eventBus.subscribe(PopupEvents.EditAvatar, () => {
      setIsOpen(true);
    }))
    subs.push(eventBus.subscribe(PopupEvents.CloseAll, () => {
      setIsOpen(false);
    }))

    return () => {
        subs.forEach(sub => sub.unsubscribe())
    }
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // @ts-expect-error нервеные типы
    const avatar = inputRef?.current?.value;

    api.setUserAvatar({avatar}).then((newUserData) => {
      eventBus.publish(UsersEvents.UpdateData, newUserData)
      eventBus.publish(PopupEvents.CloseAll)
    })
    .catch((err) => console.log(err));
  }

  const onClose = useCallback(() => {
    setIsOpen(false);
    eventBus.publish(PopupEvents.CloseAll)
  }, [])

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar"
    >
      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}
