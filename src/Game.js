import React from 'react';
import { useRef, useState } from 'react';
import './App.css';
import H0 from './hangman0.png';
import H1 from './hangman1.png';
import H2 from './hangman2.png';
import H3 from './hangman3.png';
import H4 from './hangman4.png';
import H5 from './hangman5.png';
import H6 from './hangman6.png';

function Game(){
    const [word, setWord] = useState('');
  const [guessingWord, setGuessingWord] = useState([]);
  const [guessedWord, setGuessedWord] = useState([]);
  const [start, setStart] = useState(true);
  const [guess, setGuess] = useState('');
  const [letter, setLetter] = useState('');
  const [alertMessage, setAlertMessage] = useState('')
  const [images, setImages] = useState([H0, H1, H2, H3, H4, H5, H6]);
  const [active, setActive] = useState(images[0])
  const [misses, setMisses] = useState([]);
  const focus = useRef(null);

  const handleWord = ({target}) =>{
    setGuessedWord([])
    setGuessingWord([])
    setWord(target.value.toUpperCase());
  }

  const handleSubmit = () =>{
    if(word !== ''){
      for(let i = 0; i < word.length; i++){
        setGuessingWord((prev) => [...prev, word[i]])
        setGuessedWord((prev) => [...prev, '_'])
        setActive(images[0])
        setMisses([])
      }
      setStart(false);
    }
    else{
      setAlertMessage('Morate unijeti pojam za pogađanje')
    }
  }

  const handleGuess = ({target}) =>{
    setGuess(target.value.toUpperCase())
  }

  const handleLetter = ({target}) =>{
    setLetter(target.value.toUpperCase())
  }

  const handleTry = () =>{
    if(guess !== ''){
      if(guess === word){
        setAlertMessage('Pogodili ste');
        setGuess('')
        setGuessedWord([])
        for(let i = 0; i < word.length; i++){
          setGuessedWord((prev) => [...prev, word[i]])
        }
        setWord('')
        setTimeout(() => {setStart(true)}, 3000);
      }
      else{
        setAlertMessage('Izgubili ste')
        setActive(images[6])
        setGuess('')
        setWord('')
        setTimeout(() => {setStart(true)}, 3000);
      }
      setTimeout(() => {setAlertMessage('')}, 2500);
    }
    else if(letter !== ''){
      if(misses.includes(letter)){
        setAlertMessage('Već ste pogađali to slovo')
        setTimeout(() => {setAlertMessage('')}, 2500);
        setLetter('');
      }
      else{
        if(word.includes(letter)){
          setAlertMessage('Pojam sadrži to slovo')
          while(guessingWord.includes(letter)){
            let a = guessingWord.indexOf(letter)
            guessingWord[a] = '_'
            guessedWord[a] = letter
          }
          setLetter('');

          if(!guessedWord.includes('_')){
            setAlertMessage('Pogodili ste');
            setWord('')
            setTimeout(() => {setStart(true)}, 3000);
          }
          setTimeout(() => {setAlertMessage('')}, 2500);
        }
        else{
          setMisses((prev) => [...prev, letter])
          setActive(images[misses.length + 1])
          if(misses.length === 5){
            setAlertMessage('Izgubili ste')
            setWord('')
            setTimeout(() => {setStart(true)}, 3000);
          }
          else{
            setAlertMessage('Pojam ne sadrži to slovo')
          }
          setTimeout(() => {setAlertMessage('')}, 2500);
          setLetter('');
        }
      }
    }
  }

  return (
    <div className='app'>
      {start ? <div className='container'>
        <input value={word} type='text' placeholder='Unesite pojam' onChange={handleWord} ref={focus}/>
        <button onClick={handleSubmit}>Dalje</button>
      </div> : 
      <div>
        <h3>Pogodite pojam</h3>
          {guessedWord.map((item) =>
            <label key={Math.random()}> {item} </label>
          )}
        <div className='container'>
          <input value={letter} type='text' placeholder='Pogađajte slovo' maxLength='1' onChange={handleLetter}/><br/>
          <input value={guess} type='text' placeholder='Pogađajte cijeli pojam' onChange={handleGuess}/><br/>
          <button onClick={handleTry}>Pogađaj</button>
        </div>
        <img src={active} className='image' alt='' />
        <br/>
        {misses.map((item) =>
          <label key={Math.random()} className='missed'> {item} </label>
        )}
      </div>}
      <p className='alert'>{alertMessage}</p>
    </div>
  );
}

export default Game