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

function App () {
  const words = ['kitties', 'rather', 'player', 'rowdy', 'estimate', 'monkey', 'lunge', 'conceive', 'feather', 'sacred', 'summit', 'colleague',]

  // const [points, setPoints] = React.useState(localStorage.getItem('points') != 'null' && localStorage.getItem('points'), 0)
  // const [strikes, setStrikes] = React.useState(localStorage.getItem('strikes') != 'null' && localStorage.getItem('strikes'), 0)
  // const [passes, setPasses] = React.useState(localStorage.getItem('passes') != 'null' && localStorage.getItem('passes'), 3)

  const [points, setPoints] = React.useState(0)
  const [strikes, setStrikes] = React.useState(0)
  const [passes, setPasses] = React.useState(3)

  let array = shuffle(words)
  let word = shuffle(array[0])
  console.log(array[0])

  // if (localStorage.getItem('word') != 'null') {
  //   word = localStorage.getItem('word')
  // }

  function btn(e) {
    e.preventDefault()
    setPasses(passes-1)
  }
  function txt(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      if (e.target.value == array[0]) {
        setPoints(points+1)
        word = shuffle(array[0])
      } else {
        setStrikes(strikes+1)
      }
      console.log(strikes)
      console.log(points)
    }
  }
 
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
    <form id="scramble">
      <label htmlFor="input">{word}</label>
      <input type="text" id="input" onKeyPress={txt}></input>
      {passes > 0 && <button type="button" id="pass" onClick={btn}>{passes} Passes Remaining</button>}
    </form>
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)