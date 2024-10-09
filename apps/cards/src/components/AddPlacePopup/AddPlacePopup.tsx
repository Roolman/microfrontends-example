import { useCallback, useEffect, useState } from 'react';
import "@trutoo/event-bus";

import { PopupWithForm } from '@mf-example/ui/components/PopupWithForm'
import { api } from "@mf-example/utils"
import { CardsEvents } from "@mf-example/events/cards"
import "@mf-example/ui/styles/popup/popup.css";
import type { Subscription } from '@trutoo/event-bus/dist/event-bus';
import { PopupEvents } from '@mf-example/events/popup';

export function AddPlacePopup() {

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const subs: Subscription[] = [];

    eventBus.register(CardsEvents.AddCard, {})
    eventBus.register(PopupEvents.OpenAddPlace, {})
    eventBus.register(PopupEvents.CloseAll, {})

    subs.push(eventBus.subscribe(PopupEvents.OpenAddPlace, () => {
        setIsOpen(true);
    }))
    subs.push(eventBus.subscribe(PopupEvents.CloseAll, () => {
        setIsOpen(false);
    }))

    return () => {
      subs.forEach(s => s.unsubscribe())
    }
  }, [])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
      .addCard({name, link})
      .then((newCardFull) => {
        eventBus.publish(CardsEvents.AddCard, newCardFull);
        eventBus.publish(PopupEvents.CloseAll);
      })
      .catch((err) => console.log(err));
  }

  const onClose = useCallback(() => {
    eventBus.publish(PopupEvents.CloseAll);
  }, [])

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength={1} maxLength={30} value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}
