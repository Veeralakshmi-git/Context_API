import React from 'react'
import {useState,useEffect,useContext} from 'react'
import DataContext, { DataProvider } from './context/DataContext'
import {useParams,Link} from 'react-router-dom'
import api from './api/posts'
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom'

const Editpost = ({}) => {
  const {posts,setPosts}=useContext(DataContext)
  const {id} =  useParams()
  const navigate = useNavigate()
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const post = posts.find(post => (post.id).toString() === id )
     
    useEffect(() => {
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditTitle,setEditBody])

    const handleEdit = async (id) => {
      const datetime= format(new Date(),'MMMM dd, yyyy pp')
      const updatedPost={id, title:editTitle, datetime, body:editBody}
      try{
        const response = await api.put(`/post/${id}`,updatedPost)
        setPosts(posts.map(post => post.id === id ? {...response.data}: post ))
        setEditTitle('')
        setEditBody('')
        navigate('/')
      }catch(err){
        console.log(`Error: ${err.message}`)
      }
    
    }

  return (
    <main className="NewPost">
        {editTitle &&
        <>
        <h3>New Post</h3>
        <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
           <label htmlFor="postTitle">Title:</label>
            <input 
              id="postTitle"
              type="text" 
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea 
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)} 
            />
            <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
        </form>
        </>
       }
       {!editTitle && 
       <>
            <h2>Post Not Found</h2>
            <p>Well,that's disappointing</p>
            <p>
                <Link to='/'>Visit Our Home Page</Link>
            </p>
       </>

       }
    </main>
  )
}

export default Editpost