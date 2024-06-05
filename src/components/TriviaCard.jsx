import React from 'react';

const TriviaCard = ({ trivia, image }) => {
  return (
    <article className="triviacard">
      <h2>{trivia.category}</h2>
      <h3>{trivia.question}</h3>
      <p>{trivia.answer}</p>
      <img src={image} alt="Imagen de trivia" />
    </article>
  );
};

export default TriviaCard;
