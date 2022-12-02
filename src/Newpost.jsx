import React from 'react'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api/posts'
import { format } from 'date-fns'
import DataContext from './context/DataContext'

const Newpost = () => {
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const {posts,setPosts} = useContext(DataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id= posts.length ? [posts.length - 1].id + 1 :1
    const datetime= format(new Date(),'MMMM dd, yyyy pp')
    const newPost= { id, title:postTitle, datetime, body:postBody }
    
    try{
      const response= await api.post('/post',newPost)
      const allPosts = [ ...posts,response.data ]  
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`)
    }
}
 
  return (
    <main className="NewPost">
        <h3>New Post</h3>
        <form className='newPostForm' onSubmit={handleSubmit}>
           <label htmlFor="postTitle">Title:</label>
            <input 
              id="postTitle"
              type="text" 
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea 
              id="postBody"
              required
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)} 
            />
            <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default Newpost