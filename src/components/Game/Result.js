const Result = (props) => {
  const { result, guessLength, answer } = props

  return result === 'Success' ? (
    <div class="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong> {guessLength} guesses</strong>.
      </p>
    </div>
  ) : (
    <div class="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  )
}

export default Result
