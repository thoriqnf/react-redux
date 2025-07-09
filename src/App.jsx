import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Counter from './pages/Counter'
import Posts from './pages/Posts'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
