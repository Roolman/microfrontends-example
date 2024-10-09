import { CardItem } from "@/types/types";

import styles from './Card.module.css';

interface CardProps {
    card: CardItem;
    userId: string;
    onCardClick: (card: CardItem) => void;
    onCardLike: (card: CardItem) => void;
    onCardDelete: (card: CardItem) => void;
}

export function Card({ card, userId, onCardClick, onCardLike, onCardDelete}: CardProps) {

  const isLiked = card.likes.some(i => i._id === userId);
  const cardLikeButtonClassName = `${styles.cardLikeButton} ${isLiked && styles.cardLikeButtonIsActive}`;

  const isOwn = card.owner._id === userId;
  const cardStyle = { backgroundImage: `url(${card.link})` };
  const cardDeleteButtonClassName = (
    `${styles.cardDeleteButton} ${isOwn ? styles.cardDeleteButtonVisible : styles.cardDeleteButtonHidden}`
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className={styles.card}>
      <div className={styles.cardImage} style={cardStyle} onClick={handleClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className={styles.cardDescription}>
        <h2 className={styles.cardTitle}>
          {card.name}
        </h2>
        <div className={styles.cardLikes}>
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className={styles.cardLikeCount}>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
