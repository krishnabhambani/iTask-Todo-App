import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from './components/Navbar'
import { useFormState } from 'react-dom'
import { v4 as uuidv4 } from 'uuid';

function App() {
  // const [count, setCount] = useState(0)
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] =useState(false);

  useEffect(()=>{
    let todos=JSON.parse(localStorage.getItem("todos")) 
    setTodos(todos || []);
  },[])

  const saveToLS=(params)=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!== id;
    })
    setTodos(newTodos);
    saveToLS();
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(), todo,isCompled: false}])
    setTodo("");
    saveToLS();
  }
  
  const handleCheckbox=(e)=>{
    let id = e.target.name; // string
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompled = !newTodos[index].isCompled;
    setTodos(newTodos);
  }
  const handleChange=(e)=>{
    setTodo(e.target.value);
    saveToLS();
  }

  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 bg-white' />
          {/* <input onChange={handleChange} value={todo} type="text" className="bg-white text-black w-full border border-gray-400 rounded px-4 py-2"/> */}
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 rounded-md p-3 py-1 text-white mx-6 cursor-pointer">Add</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className='mx-2' htmlFor="show"> Show Finished</label>
        <div className='h-[1px] bg-black opacity-45 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length==0 && <div className="text-center text-gray-500 font-bold">No Todos Found</div>}
          {todos.map(item=>{ 
           return (showFinished || !item.isCompled) && <div key={item.id} className="todo flex  justify-between my-3">
            <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompled} id="" />
            {/* <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompled} className="checkbox" id="" /> */}
            <div className={item.isCompled?"line-through" : ""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}}  className='bg-violet-800 hover:bg-violet-950 p-2 px-3 py-3 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 px-3 py-3 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><AiFillDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
