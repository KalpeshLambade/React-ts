import './App.css'
import AddToDo from './components/AddToDo'
import { HomePage } from './components/HomePage'
import NotNavbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import ViewTodo from './components/ViewTodo'
import UpdateToDo from './components/UpdateToDo'

function App() {

  return (
    <>
      <NotNavbar/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/add' element={<AddToDo/>} />
          <Route path='/view' element={<ViewTodo/>} />
          <Route path='/update/:uuid' element={<UpdateToDo/>} />
      </Routes>
    </>
  )
}

export default App
