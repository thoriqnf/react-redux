import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUsers,
  clearError,
  selectUsers,
  selectUsersLoading,
  selectUsersError
} from '../features/users/userSlice'

function UserList() {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const loading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleRetry = () => {
    dispatch(clearError())
    dispatch(fetchUsers())
  }

  if (loading) {
    return (
      <div className="user-container">
        <h1>User List</h1>
        <div className="loading">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="user-container">
        <h1>User List</h1>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="user-container">
      <h1>User List</h1>
      <p>Users fetched from JSONPlaceholder API</p>
      
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <div className="user-address">
              <p><strong>Address:</strong></p>
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
            </div>
            <div className="user-company">
              <p><strong>Company:</strong> {user.company.name}</p>
              <p><em>{user.company.catchPhrase}</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList