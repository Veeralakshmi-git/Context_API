import React from 'react'
import Home from './Home'
import Newpost from './Newpost'
import Postpage from './Postpage'
import Editpost from './Editpost'
import About from './About'
import Missing from './Missing'
import Layout from './Layout'
import { Route, Routes} from 'react-router-dom'
import { DataProvider} from './context/DataContext'

function App() {
   
    return(
      <DataProvider>
              <Routes>
              
                  <Route path="/" element={<Layout />} >
                      <Route index element={<Home /> } />
                      <Route path="post">
                          <Route index element={<Newpost />} />
                          <Route path="/post/edit/:id" element={<Editpost />} />
                          <Route path="/post/:id" element={<Postpage />} />
                       </Route>
                      <Route path="about" element={<About />} />
                      <Route path="*" element={ <Missing />} />
                  </Route> 
                
              </Routes>
        </DataProvider>
      
    )
}

export default App
