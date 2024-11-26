import React, { useEffect } from 'react'

import GuessInput from './GuessInput'

import { sample } from '../../utils'
import { WORDS } from '../../data'
import GuessList from './GuessList'
import { checkGuess } from '../../game-helpers'
import Result from './Result'
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'
// Pick a random word on every pageload.
const answer = sample(WORDS)
// To make debugging easier, we'll log the solution in the console.
console.info('answer', { answer })

function Game() {
  const [value, setValue] = React.useState('')
  const [guesses, setGuesses] = React.useState([])
  const [result, setResult] = React.useState(null)

  const handleChange = (e) => {
    // change to uppercase
    e.target.value = e.target.value.toUpperCase()
    setValue(e.target.value)
  }

  const generateGuessArray = () => {
    // check guess.text status
    let resultGuesses = guesses.map((guess) => checkGuess(guess.text, guess.answer))

    return resultGuesses
  }
  const fixedGuesses = generateGuessArray()

  // check all letter statuses are correct in each guess
  const countCorrectGuesses = (fixedGuesses) => {
    return fixedGuesses.reduce((count, guess) => {
      const isAllCorrect = guess.every((cell) => cell.status === 'correct')
      return isAllCorrect ? count + 1 : count
    }, 0)
  }
  const correctGuessCount = countCorrectGuesses(fixedGuesses)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (value.length !== 5) {
      console.error('Guess must be 5 characters long.')
    } else {
      const userGuess = { id: crypto.randomUUID(), text: value, answer: answer }
      // guess配列に新しいguessを追加する
      // guess stateに新しいguessを追加する
      setGuesses([...guesses, userGuess])
      setValue('')
    }
  }
  useEffect(() => {
    if (correctGuessCount === 1) {
      // すべてのletterが正解の場合、resultをSuccessにする
      setResult('Success')
    }
    if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setResult('Failure')
    }
  }, [guesses, correctGuessCount])

  return (
    <>
      <GuessList fixedGuesses={fixedGuesses} />
      {result === 'Success' || result === 'Failure' ? (
        <Result result={result} guessLength={guesses.length} answer={answer} />
      ) : (
        <GuessInput handleChange={handleChange} handleSubmit={handleSubmit} value={value} />
      )}
    </>
  )
}

export default Game
