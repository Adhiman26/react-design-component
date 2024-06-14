import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { Column } from './components/Column/Column';
import { arrayMove } from '@dnd-kit/sortable';
import { Input } from './components/Input/Input';

function App() {
  const [results, setResults] = useState([]);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add Player Name" },
    { id: 2, title: "Add Player Number" },
    { id: 3, title: "Upload Background Image" }
  ]);

  const addTask = title => {
    setTasks(tasks => [...tasks, {id: tasks.length + 1, title}])
  }

  const getTaskPos = id => tasks.findIndex( task => task.id === id)
  const handleDragEnd = event => {
    const {active , over} = event

    if(active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos (active.id)
      const newPos = getTaskPos (over.id)
      return arrayMove(tasks, originalPos, newPos)
    })
  }
  return (
    <div className='App'>
        <div className='search-bar-container'>
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <Input onSubmit = {addTask} />
              <Column tasks={tasks}/>
            </DndContext>
        </div>
    </div>
  )
}

export default App
