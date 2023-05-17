import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './TodoApp.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
)
