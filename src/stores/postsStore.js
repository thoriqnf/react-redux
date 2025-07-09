import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'

const API_BASE = 'https://jsonplaceholder.typicode.com'

// Posts store with advanced API handling patterns
const usePostsStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        // State
        posts: [],
        users: [],
        comments: {},
        selectedUserId: null,
        
        // Loading states
        loading: {
          posts: false,
          users: false,
          comments: false
        },
        
        // Error states
        errors: {
          posts: null,
          users: null,
          comments: null
        },
        
        // Cache timestamps for data freshness
        lastFetch: {
          posts: null,
          users: null
        },
        
        // Actions
        fetchPosts: async (force = false) => {
          const now = Date.now()
          const fiveMinutes = 5 * 60 * 1000
          
          // Check cache freshness
          if (!force && get().lastFetch.posts && (now - get().lastFetch.posts) < fiveMinutes) {
            return get().posts
          }
          
          set((state) => {
            state.loading.posts = true
            state.errors.posts = null
          })
          
          try {
            const response = await axios.get(`${API_BASE}/posts`)
            
            set((state) => {
              state.posts = response.data
              state.loading.posts = false
              state.lastFetch.posts = now
            })
            
            return response.data
          } catch (error) {
            set((state) => {
              state.errors.posts = error.message
              state.loading.posts = false
            })
            throw error
          }
        },
        
        fetchUsers: async (force = false) => {
          const now = Date.now()
          const fiveMinutes = 5 * 60 * 1000
          
          if (!force && get().lastFetch.users && (now - get().lastFetch.users) < fiveMinutes) {
            return get().users
          }
          
          set((state) => {
            state.loading.users = true
            state.errors.users = null
          })
          
          try {
            const response = await axios.get(`${API_BASE}/users`)
            
            set((state) => {
              state.users = response.data
              state.loading.users = false
              state.lastFetch.users = now
            })
            
            return response.data
          } catch (error) {
            set((state) => {
              state.errors.users = error.message
              state.loading.users = false
            })
            throw error
          }
        },
        
        fetchComments: async (postId) => {
          // Check if comments already exist
          if (get().comments[postId]) {
            return get().comments[postId]
          }
          
          set((state) => {
            state.loading.comments = true
            state.errors.comments = null
          })
          
          try {
            const response = await axios.get(`${API_BASE}/posts/${postId}/comments`)
            
            set((state) => {
              state.comments[postId] = response.data
              state.loading.comments = false
            })
            
            return response.data
          } catch (error) {
            set((state) => {
              state.errors.comments = error.message
              state.loading.comments = false
            })
            throw error
          }
        },
        
        // Optimistic update for new post
        createPost: async (postData) => {
          const tempId = Date.now()
          const tempPost = {
            ...postData,
            id: tempId,
            userId: get().selectedUserId || 1,
            __isOptimistic: true
          }
          
          // Optimistic update
          set((state) => {
            state.posts.unshift(tempPost)
          })
          
          try {
            const response = await axios.post(`${API_BASE}/posts`, postData)
            
            // Replace optimistic post with real one
            set((state) => {
              const index = state.posts.findIndex(p => p.id === tempId)
              if (index !== -1) {
                state.posts[index] = response.data
              }
            })
            
            return response.data
          } catch (error) {
            // Remove optimistic post on error
            set((state) => {
              state.posts = state.posts.filter(p => p.id !== tempId)
            })
            throw error
          }
        },
        
        deletePost: async (postId) => {
          const originalPosts = get().posts
          
          // Optimistic update
          set((state) => {
            state.posts = state.posts.filter(p => p.id !== postId)
          })
          
          try {
            await axios.delete(`${API_BASE}/posts/${postId}`)
          } catch (error) {
            // Revert on error
            set((state) => {
              state.posts = originalPosts
            })
            throw error
          }
        },
        
        // Filter actions
        setSelectedUserId: (userId) => set({ selectedUserId: userId }),
        
        // Clear actions
        clearErrors: () => set((state) => {
          state.errors = { posts: null, users: null, comments: null }
        }),
        
        clearCache: () => set((state) => {
          state.posts = []
          state.users = []
          state.comments = {}
          state.lastFetch = { posts: null, users: null }
        }),
        
        // Computed values
        getFilteredPosts: () => {
          const { posts, selectedUserId } = get()
          if (!selectedUserId) return posts
          return posts.filter(post => post.userId === selectedUserId)
        },
        
        getPostById: (id) => {
          return get().posts.find(post => post.id === id)
        },
        
        getUserById: (id) => {
          return get().users.find(user => user.id === id)
        },
        
        getPostsStats: () => {
          const posts = get().posts
          const users = get().users
          
          return {
            totalPosts: posts.length,
            totalUsers: users.length,
            averagePostsPerUser: users.length > 0 ? (posts.length / users.length).toFixed(1) : 0,
            mostActiveUser: users.reduce((max, user) => {
              const userPosts = posts.filter(p => p.userId === user.id).length
              const maxPosts = posts.filter(p => p.userId === max.id).length
              return userPosts > maxPosts ? user : max
            }, users[0] || {})
          }
        },
        
        // Retry mechanism
        retryFetch: async (type) => {
          switch (type) {
            case 'posts':
              return get().fetchPosts(true)
            case 'users':
              return get().fetchUsers(true)
            default:
              throw new Error('Invalid retry type')
          }
        }
      })),
      {
        name: 'posts-storage',
        partialize: (state) => ({
          posts: state.posts,
          users: state.users,
          comments: state.comments,
          lastFetch: state.lastFetch
        })
      }
    ),
    { name: 'posts-store' }
  )
)

export default usePostsStore