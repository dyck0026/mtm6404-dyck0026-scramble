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
  let base = ['kitties', 'rather', 'player', 'rowdy', 'estimate', 'monkey', 'lunge', 'conceive', 'feather', 'sacred', 'summit', 'colleague']
  let words = shuffle(base)

  if (localStorage.getItem('words') != null) {
    words = JSON.parse(localStorage.getItem('words'))
  }


  const [word, setWord] = React.useState((localStorage.getItem('word') != null) ? localStorage.getItem('word') : words[0])
  const [points, setPoints] = React.useState((localStorage.getItem('points') != null) ? Number(localStorage.getItem('points')) : 0)
  const [strikes, setStrikes] = React.useState((localStorage.getItem('strikes') != null) ? Number(localStorage.getItem('strikes')) : 0)
  const [passes, setPasses] = React.useState((localStorage.getItem('passes') != null) ? Number(localStorage.getItem('passes')) : 3)

  words.splice(0, 1)

  console.log(word)
  console.log(words)

  function btn(e) {
    e.preventDefault()
    setPasses(passes-1)
    setWord(words[0])
  }
  function txt(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      if (e.target.value == word) {
        setPoints(points+1)
        setWord(words[0])
      } else {
        setStrikes(strikes+1)
      }
    }
  }
  function reset(e) {
    e.preventDefault()
    let words = shuffle(base)
    setWord(words[0])
    setPoints(0)
    setStrikes(0)
    setPasses(3)
    localStorage.clear()
  }

  localStorage.setItem('word', word)
  localStorage.setItem('words', JSON.stringify(words))
  localStorage.setItem('points', points)
  localStorage.setItem('strikes', strikes)
  localStorage.setItem('passes', passes)
  localStorage.setItem('word', word)

  let pc = 0;
  if (passes == 0) {
    pc = 3;
  } else if (passes == 1) {
    pc = 2;
  } else if (passes == 2) {
    pc = 2;
  } 
  console.log(pc+strikes+points)

  return (
    <React.Fragment>
      <h1>Welcome to Scramble</h1>
      <div id="info">
    <div id="points">
      <p>{points}</p>
      <p>Points</p>
    </div>
    <div id="strikes">
      <p>{strikes}</p>
      <p>Strikes</p>
    </div>
    </div>
    {((strikes+points+pc < 12)) && 
    <form id="scramble">
      <label htmlFor="input">{shuffle(word)}</label>
      <input type="text" id="input" onKeyPress={txt}></input>
      {passes > 0 && <button type="button" id="pass" onClick={btn}>{passes} Passes Remaining</button>}
    </form>
    }
    {((strikes+points >= 12)||((strikes+points >= 9) && (passes==0))||((strikes+points >= 10) && (passes==1))||((strikes+points >= 11) && (passes==2))) &&
      <button type="button" id="reset" onClick={reset}>Reset</button>
    }
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)