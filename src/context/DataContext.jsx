import {createContext, useState, useEffect} from 'react'

import useAxiosFetch from '../hooks/useAxiosFetch'
const DataContext = createContext({})


export const DataProvider = ({ children }) => {

    const [posts,setPosts]=useState([])
    const [search,setSearch] = useState('')
    const [SearchResults,setSearchResults]=useState([])
   
    /*  custom hook getting windowsize from usewindowsize hook */
    
    const { data,fetchError,isLoading } = useAxiosFetch('http://localhost:3500/post')
 
    useEffect (() => {
       
     setPosts(data)
 
    },[data])
    
    /* useEffect(() => {
     const fetchPosts = async () => {
       try{
         const response = await api.get('/post')
          setPosts(response.data )
       }catch(err){
           if(err.response){
             console.log(err.response.data)
             console.log(err.response.status)
             console.log(err.response.headers)
         }else{
           console.log(`Error:${err.message}`)
         }
     }
     }
     fetchPosts()
    },[]) */
 
    useEffect(() => {
        const filteredResults = posts.filter(
         post => ((post.body).toLowerCase()).includes(search.toLowerCase())
         || ((post.title).toLowerCase().includes(search.toLowerCase()))
        )
        setSearchResults(filteredResults.reverse())
    },[posts,search])

    
   
    



 return(
    <DataContext.Provider value={{
         search,setSearch,SearchResults,fetchError,isLoading,setPosts,
        posts
  }}>
         {children} 

    </DataContext.Provider>
 )
}

export default DataContext