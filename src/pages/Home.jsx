import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', margin: '0', color: '#4a90e2' }}>
          React + Zustand
        </h1>
        <p style={{ fontSize: '20px', color: '#ccc', margin: '10px 0' }}>
          Learn state management with practical examples
        </p>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>What is Zustand?</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#ccc' }}>
          Zustand is a small, fast, and scalable state management solution for React. 
          It has a simple API based on hooks, without boilerplate code. Unlike Redux, 
          Zustand doesn't require providers, reducers, or actions - just create a store 
          and start using it!
        </p>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Examples</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          
          {/* Counter Example */}
          <div style={{ 
            border: '1px solid #444', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#2d2d2d'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#4a90e2' }}>
              1. Counter App - Basic Zustand
            </h3>
            <p style={{ margin: '0 0 15px 0', color: '#ccc' }}>
              Learn the fundamentals of Zustand with a simple counter example. 
              This covers store creation, state updates, and component subscriptions.
            </p>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#fff' }}>Key concepts:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#ccc' }}>
                <li>Creating a basic store with <code style={{ backgroundColor: '#1a1a1a', padding: '2px 4px', borderRadius: '3px', color: '#4a90e2' }}>create()</code></li>
                <li>State updates with actions</li>
                <li>Component subscriptions with selectors</li>
                <li>Managing multiple state pieces</li>
              </ul>
            </div>
            <Link 
              to="/counter"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4a90e2',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Try Counter Example →
            </Link>
          </div>
          
          {/* Posts Example */}
          <div style={{ 
            border: '1px solid #444', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#2d2d2d'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#4a90e2' }}>
              2. Posts App - Advanced API Integration
            </h3>
            <p style={{ margin: '0 0 15px 0', color: '#ccc' }}>
              Explore advanced Zustand patterns with real API integration. 
              This example fetches data from JSONPlaceholder and demonstrates production-ready patterns.
            </p>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#fff' }}>Advanced features:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#ccc' }}>
                <li>Async actions with loading states</li>
                <li>Error handling and retry logic</li>
                <li>Data persistence with <code style={{ backgroundColor: '#1a1a1a', padding: '2px 4px', borderRadius: '3px', color: '#4a90e2' }}>persist</code> middleware</li>
                <li>Optimistic updates</li>
                <li>Redux DevTools integration</li>
                <li>State selectors and computed values</li>
              </ul>
            </div>
            <Link 
              to="/posts"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Try Posts Example →
            </Link>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Why Choose Zustand?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: '#1e3a1e', borderRadius: '6px', border: '1px solid #28a745' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Simple API</h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#ccc' }}>
              No boilerplate, no providers, no reducers. Just create a store and use it.
            </p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#1e2a3a', borderRadius: '6px', border: '1px solid #4a90e2' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#4a90e2' }}>Lightweight</h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#ccc' }}>
              Under 3KB gzipped, with no dependencies. Perfect for performance-critical apps.
            </p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#3a2e1e', borderRadius: '6px', border: '1px solid #ffc107' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>TypeScript Ready</h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#ccc' }}>
              Built with TypeScript, providing excellent type safety and developer experience.
            </p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#3a1e2e', borderRadius: '6px', border: '1px solid #e91e63' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#e91e63' }}>Extensible</h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#ccc' }}>
              Rich middleware ecosystem for persistence, devtools, and more advanced patterns.
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        padding: '30px', 
        backgroundColor: '#2d2d2d',
        borderRadius: '8px',
        border: '1px solid #444'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#4a90e2' }}>
          Ready to explore?
        </h3>
        <p style={{ margin: '0 0 20px 0', color: '#ccc' }}>
          Start with the Counter example to learn the basics, then move to the Posts example 
          to see advanced patterns in action.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link 
            to="/counter"
            style={{
              padding: '12px 24px',
              backgroundColor: '#4a90e2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Start with Counter
          </Link>
          <Link 
            to="/posts"
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Jump to Advanced
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home