import SuccessIcon from './assets/success-icon.svg';
import ErrorIcon from './assets/error-icon.svg';
import { useCallback, useEffect, useState } from 'react';
import type { Subscription } from '@trutoo/event-bus/dist/event-bus';
import { PopupEvents } from '@mf-example/events/popup';

export function InfoTooltip() {
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const subs: Subscription[] = [];

    eventBus.register(PopupEvents.CloseAll, {})
    eventBus.register(PopupEvents.TooltipShow, {})
    
    subs.push(eventBus.subscribe<{ status: string }>(PopupEvents.TooltipShow, ({ payload }) => {
      setIsOpen(true);
      
      console.log(payload?.status)

      if(payload) {
        setStatus(payload.status)
      }
    }))
    subs.push(eventBus.subscribe(PopupEvents.CloseAll, () => {
      setIsOpen(false);
    }))

    return () => {
        subs.forEach(sub => sub.unsubscribe())
    }
}, [])

  const onClose = useCallback(() => {
    eventBus.publish(PopupEvents.CloseAll)
  }, [])

  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const text = status === 'success' ? "Вы успешно зарегистрировались" : 
     "Что-то пошло не так! Попробуйте ещё раз."

  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
            <div>
              <img className="popup__icon" src={icon.src} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

 