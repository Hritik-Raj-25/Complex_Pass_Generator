import { useState, useCallback, useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*-_+=?/\|";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  let copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  let passwordRef = useRef(null)


  useEffect(() => {
    passGenerator()
  }, [length, numberAllowed, charAllowed,setPassword, passGenerator])



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-xl rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>

        <h1 className='text-white text-center my-2'>Password Generator</h1>
        <div className='flex shadow-xl  overflow-hidden mb-4 '>
          <input type="text"
            value={password}
            className='outline-none rounded-md w-full py-1 px-3  '
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className=' text-gray-400 rounded-md bg-gray-900 mx-2 px-2'
          onClick={copyPassword}
          >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer '
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-violet-300'>
              Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className='text-violet-300'
              htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className='text-violet-300'
              htmlFor="numberInput">Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
