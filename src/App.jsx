import React, { useEffect, useRef, useState } from 'react';
import useFetch from './hooks/useFetch';
import TriviaCard from './components/TriviaCard';
import './App.css'; // Import the CSS file correctly
import Paginate from './components/Paginate';

// Assuming you control the dog.ceo API server:

function App() {
  const [inputValue, setInputValue] = useState('10'); // Set a default value
  const [trivias, getTrivias] = useFetch();
  const [images, setImages] = useState([]); // Initialize images as empty array
  const textInput = useRef();

  const [page, setPage] = useState(1); // Current page

  useEffect(() => {
    const urlTrivia = `https://opentdb.com/api.php?amount=${inputValue}`;
    getTrivias(urlTrivia);

    const urlImages = `https://dog.ceo/api/breeds/image/random/${inputValue}`;

    // This approach assumes you have configured the dog.ceo API server to allow CORS for your frontend's origin:
    fetch(urlImages)
      .then(response => response.json())
      .then(data => setImages(data.message || [])) // Handle potential empty response
      .catch(error => console.error("Error fetching images:", error)); // Handle errors

  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
  };

  const quantity = 5;
  const total = Math.ceil((trivias?.results.length || 0) / quantity); // Handle empty results

  const pagination = () => {
    const end = quantity * page;
    const start = end - quantity;
    const triv = trivias?.results.slice(start, end);
    const img = images.slice(start, end); // Use the state variable 'images'
    return [triv, img];
  };

  const handleNext = () => { // Function for "Next" button
    if (page < total) {
      setPage(page + 1);
    }
  };

  console.log(inputValue);

  return (
    <div className="app">
      <h1>Custom Hooks</h1>
      <form onSubmit={handleSubmit}>
        <input ref={textInput} type="number" min="1" />
        <button type="submit">Submit</button>
      </form>
      <Paginate
        page={page} // Pass current page state
        setPage={setPage} // Pass function to update page state
        total={total}
        onNext={handleNext} // Add `onNext` prop and pass `handleNext` function
      />
      <div className="app__container">
        {pagination()[0]?.map((trivia, index) => (
          <TriviaCard
            key={trivia.question}
            trivia={trivia}
            image={pagination()[1]?.[index]} // Use the image from pagination
          />
        ))}
      </div>
    </div>
  );
}

export default App;
