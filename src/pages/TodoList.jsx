import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  clearCompleted,
  selectFilteredTodos,
  selectFilter,
  selectActiveCount,
  selectCompletedCount
} from '../features/todos/todoSlice'

function TodoList() {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  
  const todos = useSelector(selectFilteredTodos)
  const filter = useSelector(selectFilter)
  const activeCount = useSelector(selectActiveCount)
  const completedCount = useSelector(selectCompletedCount)

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()))
      setInputValue('')
    }
  }

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id))
  }

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id))
  }

  const handleSetFilter = (filterType) => {
    dispatch(setFilter(filterType))
  }

  const handleClearCompleted = () => {
    dispatch(clearCompleted())
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      <div className="todo-filters">
        <button 
          onClick={() => handleSetFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All ({activeCount + completedCount})
        </button>
        <button 
          onClick={() => handleSetFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active ({activeCount})
        </button>
        <button 
          onClick={() => handleSetFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed ({completedCount})
        </button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button 
              onClick={() => handleRemoveTodo(todo.id)}
              className="remove-button"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-state">
          {filter === 'all' ? 'No todos yet!' : 
           filter === 'active' ? 'No active todos!' : 
           'No completed todos!'}
        </p>
      )}

      {completedCount > 0 && (
        <button 
          onClick={handleClearCompleted}
          className="clear-completed"
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  )
}

export default TodoList