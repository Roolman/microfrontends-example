import { CardItem } from "@/types/types";
import { api } from "@mf-example/utils"
import { useEffect, useState } from "react";

import { Card } from "../Card/Card";

import styles from './CardsSection.module.css';
import type { Subscription } from "@trutoo/event-bus/dist/event-bus";
import { CardsEvents } from "@mf-example/events/cards";
import { UsersEvents } from '@mf-example/events/users';
import { PopupEvents } from '@mf-example/events/popup';

export const CardsSection = () => {
    const [userId, setUserId] = useState('');
    const [cards, setCards] = useState<CardItem[] | null>(null);

    useEffect(() => {
      const subs: Subscription[] = [];

      eventBus.register(CardsEvents.AddCard, {})
      eventBus.register(UsersEvents.UpdateData, {})
      eventBus.register(PopupEvents.OpenImage, {})

      subs.push(eventBus.subscribe<CardItem>(CardsEvents.AddCard, ({ payload: newCard }) => {
        if(newCard) {
          setCards([newCard, ...(cards || [])]);
        }
      }))

      subs.push(eventBus.subscribe<{ _id: string }>(UsersEvents.UpdateData, ({ payload }) => {
        if(payload) {
            setUserId(payload._id);
        }
      }))

      return () => {
        subs.forEach(s => s.unsubscribe())
      }
    })

    useEffect(() => {
      api
        .getCardList()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }, [])

    function handleCardClick(card: CardItem) {
      eventBus.publish(PopupEvents.OpenImage, card);
    }
  
    function handleCardLike(card: CardItem) {
      const isLiked = card.likes.some((i) => i._id === userId);
      api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards ? cards.map((c) => (c._id === card._id ? newCard : c)) : cards
          );
        })
        .catch((err) => console.log(err));
    }
  
    function handleCardDelete(card: CardItem) {
      api
        .removeCard(card._id)
        .then(() => {
          setCards((cards) => cards ? cards.filter((c) => c._id !== card._id) : cards);
        })
        .catch((err) => console.log(err));
    }

    return (
      <section className={styles.places + " page__section"}>
        <ul className={styles.placesList}>
          {cards?.map((card) => (
            <Card
              key={card._id}
              userId={userId}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
          {cards === null && <p className={styles.placesLoadingText}>Загрузка мест...</p>}
        </ul>
      </section>
    )
}
