import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Home = ({}) => {
 const {SearchResults,fetchError,isLoading} = useContext(DataContext)
 
 return (
    <main className='Home'>
      {/* {posts.length ? (<Feed posts={posts} />) :
      (<p style={{marginTop:"2rem"}}>No Posts To Display</p>)
      } */}

      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (SearchResults.length ? <Feed posts={SearchResults} />
       : <p className='statusMsg'>No POSTS TO DISPLAY</p>)}
    </main>
  )
}

export default Home