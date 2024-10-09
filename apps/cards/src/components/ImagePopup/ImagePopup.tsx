import { CardItem } from "@/types/types";
import { Subscription } from "@trutoo/event-bus/dist/event-bus";
import { useCallback, useEffect, useState } from "react";
import { PopupEvents } from '@mf-example/events/popup';

export function ImagePopup() {

  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState<CardItem | null>(null);

  useEffect(() => {
    const subs: Subscription[] = [];

    eventBus.register(PopupEvents.OpenImage, {})
    eventBus.register(PopupEvents.CloseAll, {})

    subs.push(eventBus.subscribe<CardItem>(PopupEvents.OpenImage, ({ payload }) => {
        setIsOpen(true);

        if(payload) {
          setCard(payload)
        }
    }))
    subs.push(eventBus.subscribe(PopupEvents.CloseAll, () => {
        setIsOpen(false);
    }))

    return () => {
      subs.forEach(s => s.unsubscribe())
    }
  }, [])

  const onClose = useCallback(() => {
    eventBus.publish(PopupEvents.CloseAll);
  }, [])

  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}
