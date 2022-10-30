import './App.css';
import profileImage from './assets/github_img.png';
import React, { useState } from 'react';
import RepositoryCard from './component/RepositoryCard';
import { useEffect } from 'react';
import axios from "axios"

function App() {

  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading]=useState(false)
  const githubURL = "https://api.github.com/users/samson063/repos";
  

  useEffect(()=>{
    setIsLoading(true)
    axios.get(githubURL).then(res=>{
      setIsLoading(false)
      setRepositories(res.data)
    }).catch(err=>{
      console.log(err.message)
    })
  }, [])

  return (
    <>
{isLoading && (<p>Loading...</p>)}
{!isLoading && ( <><header className="App-header">
        <div className='profile'>
          <img src={profileImage} alt='profile' id='profile_img' />
          <div className='name'>
            <h3>Samson063</h3>
            <button>Edit profile</button>
          </div>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-items">
            <a href="index.html" className="navbar-links">Home</a>
          </li>
          <li className="navbar-items">
            <a href="Tech.html" className="navbar-links">Tech</a>
          </li>
          <li className="navbar-items">
            <a href="#" className="navbar-links">Product</a>
          </li>
          <li className="navbar-items">
            <a href="#" className="navbar-links">Sign Up </a>
          </li>
        </ul>
      </header><div className='repositories'>
          <p>Popular repositories</p>
          <a href='#' className="navbar-links">Customise your Pin</a>
        </div><div className='repo-box'>
         {repositories.map((repo)=>{
        
        return  <RepositoryCard name={repo.full_name} visibility={repo.private ? "Private": "Public"} language={repo.language} url={repo.html_url} star_count={repo.stargazers_count} />
        
        })}


        </div></>) }
     
    </>
  );
}

export default App;