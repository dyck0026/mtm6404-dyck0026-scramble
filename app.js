/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/


function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function App () {
  let words = ['kitties', 'rather', 'player', 'rowdy', 'estimate', 'monkey', 'lunge', 'conceive', 'feather', 'sacred', 'summit', 'colleague']

  if (localStorage.getItem('words') != null) {
    words = JSON.parse(localStorage.getItem('words'))
  }

  const [number, setNumber] = React.useState(localStorage.getItem('number') != null && Number(localStorage.getItem('number')), randomNum(0, (words.length - 1)))
  const [word, setWord] = React.useState(localStorage.getItem('word') != null && localStorage.getItem('word'), words[number])
  const [points, setPoints] = React.useState(localStorage.getItem('points') != null && Number(localStorage.getItem('points')), 0)
  const [strikes, setStrikes] = React.useState(localStorage.getItem('strikes') != null && Number(localStorage.getItem('strikes')), 0)
  const [passes, setPasses] = React.useState(localStorage.getItem('passes') != null && Number(localStorage.getItem('passes')), 3)

  // const [number, setNumber] = React.useState(randomNum(0, (words.length-1)))
  // const [word, setWord] = React.useState(words[number])
  // const [points, setPoints] = React.useState(0)
  // const [strikes, setStrikes] = React.useState(0)
  // const [passes, setPasses] = React.useState(3)

  words.splice(number, 1)

  console.log(number)
  console.log(word)
  console.log(words)

  function btn(e) {
    e.preventDefault()
    setPasses(passes-1)
    setNumber(randomNum(0, (words.length-1)))
    setWord(words[number])
  }
  function txt(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      if (e.target.value == word) {
        setNumber(randomNum(0, (words.length-1)))
        setPoints(points+1)
        setWord(words[number])
      } else {
        setStrikes(strikes+1)
      }
    }
  }
  function reset(e) {
    e.preventDefault()
    localStorage.clear()
  }

  localStorage.setItem('number', number)
  localStorage.setItem('word', word)
  localStorage.setItem('words', JSON.stringify(words))
  localStorage.setItem('points', points)
  localStorage.setItem('strikes', strikes)
  localStorage.setItem('passes', passes)
  localStorage.setItem('word', word)

  return (
    <React.Fragment>
      <h1>Welcome to Scramble</h1>
    <div id="points">
      <p>{points}</p>
      <p>Points</p>
    </div>
    <div id="strikes">
      <p>{strikes}</p>
      <p>Strikes</p>
    </div>
    {strikes < 12 && words.length > 0 && 
    <form id="scramble">
      <label htmlFor="input">{shuffle(word)}</label>
      <input type="text" id="input" onKeyPress={txt}></input>
      {passes > 0 && <button type="button" id="pass" onClick={btn}>{passes} Passes Remaining</button>}
    </form>
    }
    {strikes == 12 || words.length == 0 &&
      <button type="button" id="reset" onClick={reset}></button>
    }
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)