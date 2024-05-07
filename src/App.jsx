import { useState, useCallback, useEffect ,useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(6)
  const [number, setnumber] = useState(false)
  const [char, setchar] = useState(false)
  const [password,setpassword]=useState("")

  let generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    if(number) str+= "0123456789"
    if(char) str+= "!@#$%^&*_><?"
    for(let i=1; i<=length ;i++ ){
      let char = Math.floor(Math.random() * str.length+1)
      pass +=str.charAt(char)
    }
    setpassword(pass)
  }, [length, number, char,setpassword])

  useEffect(()=>{
    generatePassword(pass)
  },[length,number,char,generatePassword])

  const passwordRef=useRef(null);
   const copyPaswword=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
   },[password])

  return (
    <>
      <div className=' w-full h-screen bg-slate-600 p-10 flex items-center justify-center  '>

        <div className="bg-black rounded-s p-14 flex items-center justify-center flex-col  ">

          <h1 className='text-white font-bold w-full flex-auto text-center h-8 text-2xl mb-8'>PASSWORD GENERATOR</h1>
          <div>
            <div className='mb-4 flex items-center justify-center'>
              <input type="text" name="text" value={password} id="pass" placeholder='Password'
               className='outline-none  p-2 rounded-sm w-4/5 ' ref={passwordRef}/>
              <button className="bg-green-600 text-white p-2 rounded-sm cursor-pointer
              "onClick={copyPaswword}> Copy</button>
            </div>
            <div className='flex items-center justify-center'>
              <input  type='Range'
              min={6}
              max={25}
              value={length}
              className='cursor-pointer m-1'
              onChange={(e)=>{setlength(e.target.value)}}
              />
              <label className='text-white m-1' >Length: {length}</label>
              <input type="checkbox" name="check" id="check" className='m-2 ' 
              onChange={()=>{
                setnumber((prev)=>!prev)
              }} />
              <label htmlFor="checkbox" className='text-white'>Number</label>
              <input type="checkbox" name="check" id="check" className='m-2 ' 
              onChange={()=>{
                setchar((prev)=>!prev)
                }}/>
              <label htmlFor="checkbox " className='text-white'
             >Alphabet</label>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default App
