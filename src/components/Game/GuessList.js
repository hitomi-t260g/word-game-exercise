import React from 'react'
import { range } from '../../utils'
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'

const GuessList = (props) => {
  const { fixedGuesses } = props

  console.log('fixedGuesses: ', fixedGuesses)
  const emptyArray = Array(5).fill('')

  return (
    <div className="guess-results">
      {!fixedGuesses || fixedGuesses.length === 0 ? (
        range(NUM_OF_GUESSES_ALLOWED).map((row) => (
          <p className="guess" key={row}>
            {emptyArray.map((col, i) => (
              <span className="cell" key={i}>
                {col}
              </span>
            ))}
          </p>
        ))
      ) : (
        <>
          {fixedGuesses.map((row, i) => (
            <p className="guess" key={i}>
              {row.map((col, i) => (
                <span className={`cell ${col.status}`} key={i}>
                  {col.letter}
                </span>
              ))}
            </p>
          ))}
          {fixedGuesses < 5 &&
            range(NUM_OF_GUESSES_ALLOWED - fixedGuesses.length).map((row) => (
              <p className="guess" key={row}>
                {emptyArray.map((col, i) => (
                  <span className="cell" key={i}>
                    {col}
                  </span>
                ))}
              </p>
            ))}
        </>
      )}
    </div>
    // Exercise 2: Keeping track of guesses
    // <div className="guess-results">
    //   {guess &&
    //     guess.length > 0 &&
    //     guess.map((g) => {
    //       return (
    //         <p className="guess" key={g.id}>
    //           {g.text}
    //         </p>
    //       )
    //     })}
    // </div>
  )
}

export default GuessList
