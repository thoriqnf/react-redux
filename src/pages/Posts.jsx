import { useEffect, useState } from 'react'
import usePostsStore from '../stores/postsStore'

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <div style={{ 
      border: '4px solid #444',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    }}></div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
)

// Error Component
const ErrorMessage = ({ error, onRetry, type }) => (
  <div style={{ 
    padding: '15px', 
    backgroundColor: '#3d1a1a', 
    border: '1px solid #f44336',
    borderRadius: '4px',
    margin: '10px 0'
  }}>
    <p style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>
      Error loading {type}: {error}
    </p>
    <button 
      onClick={onRetry}
      style={{ 
        backgroundColor: '#f44336', 
        color: 'white', 
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Retry
    </button>
  </div>
)

// User Filter Component
const UserFilter = () => {
  const users = usePostsStore((state) => state.users)
  const selectedUserId = usePostsStore((state) => state.selectedUserId)
  const setSelectedUserId = usePostsStore((state) => state.setSelectedUserId)
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#ffffff' }}>
        Filter by User:
      </label>
      <select 
        value={selectedUserId || ''} 
        onChange={(e) => setSelectedUserId(e.target.value ? parseInt(e.target.value) : null)}
        style={{ 
          padding: '8px', 
          fontSize: '14px', 
          width: '200px',
          backgroundColor: '#2d2d2d',
          color: '#ffffff',
          border: '1px solid #444',
          borderRadius: '4px'
        }}
      >
        <option value="">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} (@{user.username})
          </option>
        ))}
      </select>
    </div>
  )
}

// New Post Form Component
const NewPostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const createPost = usePostsStore((state) => state.createPost)
  const selectedUserId = usePostsStore((state) => state.selectedUserId)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    
    setIsSubmitting(true)
    try {
      await createPost({
        title: title.trim(),
        body: body.trim(),
        userId: selectedUserId || 1
      })
      setTitle('')
      setBody('')
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#2d2d2d', 
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #444'
    }}>
      <h3 style={{ color: '#ffffff' }}>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#2d2d2d',
              color: '#ffffff'
            }}
            disabled={isSubmitting}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Post content..."
            rows="4"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#2d2d2d',
              color: '#ffffff',
              resize: 'vertical'
            }}
            disabled={isSubmitting}
          />
        </div>
        <button 
          type="submit"
          disabled={isSubmitting || !title.trim() || !body.trim()}
          style={{
            backgroundColor: isSubmitting ? '#666' : '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}

// Post Comments Component
const PostComments = ({ postId }) => {
  const [showComments, setShowComments] = useState(false)
  
  const comments = usePostsStore((state) => state.comments[postId] || [])
  const loading = usePostsStore((state) => state.loading.comments)
  const error = usePostsStore((state) => state.errors.comments)
  const fetchComments = usePostsStore((state) => state.fetchComments)
  
  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      await fetchComments(postId)
    }
    setShowComments(!showComments)
  }
  
  return (
    <div style={{ marginTop: '10px' }}>
      <button
        onClick={handleToggleComments}
        style={{
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '5px 10px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px'
        }}
      >
        {showComments ? 'Hide' : 'Show'} Comments ({comments.length})
      </button>
      
      {showComments && (
        <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage error={error} onRetry={() => fetchComments(postId)} type="comments" />}
          {comments.map(comment => (
            <div key={comment.id} style={{ 
              padding: '10px',
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              margin: '5px 0',
              fontSize: '14px',
              border: '1px solid #444'
            }}>
              <strong style={{ color: '#ffffff' }}>{comment.name}</strong>
              <p style={{ margin: '5px 0', color: '#ccc' }}>{comment.body}</p>
              <small style={{ color: '#999' }}>by {comment.email}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Post Item Component
const PostItem = ({ post }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const deletePost = usePostsStore((state) => state.deletePost)
  const getUserById = usePostsStore((state) => state.getUserById)
  
  const user = getUserById(post.userId)
  const isOptimistic = post.__isOptimistic
  
  const handleDelete = async () => {
    try {
      await deletePost(post.id)
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
    setShowDeleteConfirm(false)
  }
  
  return (
    <div style={{ 
      border: '1px solid #444', 
      borderRadius: '8px', 
      padding: '15px',
      margin: '10px 0',
      backgroundColor: isOptimistic ? '#3d3d1a' : '#2d2d2d'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>
            {post.title}
            {isOptimistic && <span style={{ color: '#ffeb3b', fontSize: '12px' }}> (Posting...)</span>}
          </h3>
          <p style={{ margin: '0 0 10px 0', color: '#ccc' }}>{post.body}</p>
          <small style={{ color: '#999' }}>
            by {user?.name || 'Unknown'} (@{user?.username || 'unknown'})
          </small>
        </div>
        
        <div style={{ display: 'flex', gap: '5px' }}>
          {!isOptimistic && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px',
          backgroundColor: '#3d1a1a',
          borderRadius: '4px',
          border: '1px solid #444'
        }}>
          <p style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>
            Are you sure you want to delete this post?
          </p>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              marginRight: '10px'
            }}
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            style={{
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px'
            }}
          >
            Cancel
          </button>
        </div>
      )}
      
      <PostComments postId={post.id} />
    </div>
  )
}

// Stats Component
const PostsStats = () => {
  const stats = usePostsStore((state) => state.getPostsStats())
  
  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      padding: '15px',
      backgroundColor: '#2d2d2d',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #444'
    }}>
      <div style={{ color: '#ccc' }}><strong style={{ color: '#ffffff' }}>Total Posts:</strong> {stats.totalPosts}</div>
      <div style={{ color: '#ccc' }}><strong style={{ color: '#ffffff' }}>Total Users:</strong> {stats.totalUsers}</div>
      <div style={{ color: '#ccc' }}><strong style={{ color: '#ffffff' }}>Avg Posts/User:</strong> {stats.averagePostsPerUser}</div>
      {stats.mostActiveUser?.name && (
        <div style={{ color: '#ccc' }}><strong style={{ color: '#ffffff' }}>Most Active:</strong> {stats.mostActiveUser.name}</div>
      )}
    </div>
  )
}

// Main Posts Page Component
const Posts = () => {
  const posts = usePostsStore((state) => state.posts)
  const users = usePostsStore((state) => state.users)
  const loading = usePostsStore((state) => state.loading)
  const errors = usePostsStore((state) => state.errors)
  
  const fetchPosts = usePostsStore((state) => state.fetchPosts)
  const fetchUsers = usePostsStore((state) => state.fetchUsers)
  const getFilteredPosts = usePostsStore((state) => state.getFilteredPosts)
  const retryFetch = usePostsStore((state) => state.retryFetch)
  const clearCache = usePostsStore((state) => state.clearCache)
  
  const filteredPosts = getFilteredPosts()
  
  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [fetchPosts, fetchUsers])
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
      <h1 style={{ color: '#ffffff' }}>Posts App - Advanced API Integration</h1>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        This example demonstrates advanced Zustand patterns with real API integration:
      </p>
      <ul style={{ color: '#ccc', marginBottom: '20px' }}>
        <li><strong style={{ color: '#ffffff' }}>JSONPlaceholder API:</strong> Real HTTP requests to external API</li>
        <li><strong style={{ color: '#ffffff' }}>Loading States:</strong> Proper loading indicators for async operations</li>
        <li><strong style={{ color: '#ffffff' }}>Error Handling:</strong> Graceful error handling with retry functionality</li>
        <li><strong style={{ color: '#ffffff' }}>Caching:</strong> Data persistence and cache invalidation</li>
        <li><strong style={{ color: '#ffffff' }}>Optimistic Updates:</strong> Immediate UI updates with rollback on failure</li>
        <li><strong style={{ color: '#ffffff' }}>Devtools:</strong> Redux DevTools integration for debugging</li>
      </ul>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => fetchPosts(true)}
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
        >
          Refresh Posts
        </button>
        <button 
          onClick={clearCache}
          style={{ backgroundColor: '#FF9800', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
        >
          Clear Cache
        </button>
      </div>
      
      {loading.posts && posts.length === 0 && <LoadingSpinner />}
      {loading.users && users.length === 0 && <LoadingSpinner />}
      
      {errors.posts && <ErrorMessage error={errors.posts} onRetry={() => retryFetch('posts')} type="posts" />}
      {errors.users && <ErrorMessage error={errors.users} onRetry={() => retryFetch('users')} type="users" />}
      
      {posts.length > 0 && users.length > 0 && (
        <>
          <PostsStats />
          <UserFilter />
          <NewPostForm />
          
          <div>
            <h2 style={{ color: '#ffffff' }}>Posts ({filteredPosts.length})</h2>
            {filteredPosts.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
            
            {filteredPosts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#ccc', fontStyle: 'italic' }}>
                No posts found for selected filter
              </p>
            )}
          </div>
        </>
      )}
      
      <div style={{ marginTop: '30px', fontSize: '12px', color: '#999' }}>
        <p><strong style={{ color: '#ffffff' }}>Features demonstrated:</strong></p>
        <ul>
          <li>Data fetching with caching (5-minute cache)</li>
          <li>Optimistic updates for creating posts</li>
          <li>Error handling with retry mechanisms</li>
          <li>Loading states for better UX</li>
          <li>Real-time filtering and statistics</li>
          <li>Lazy loading for comments</li>
        </ul>
      </div>
    </div>
  )
}

export default Posts