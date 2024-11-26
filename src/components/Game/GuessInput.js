const GuessInput = (props) => {
  const { handleChange, handleSubmit, value } = props

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input id="guess-input" type="text" onChange={handleChange} value={value} maxLength={5} minLength={5} required />
    </form>
  )
}

export default GuessInput
