import './App.css';
// import { BrowserRouter, Route } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import SearchSection from './SearchSection/SearchSection';
import JobsSection from './JobsSection/JobsSection';
import './SearchSection/SearchSectionCSS/SearchSection.scss'
import './JobsSection/JobsSectionCSS/JobsSection.scss'
import useFetch from './hooks/useFetch'
import { isCompositeComponent } from 'react-dom/test-utils';




function App() {

  // const [url, setUrl] = useState('https://remotive.com/api/remote-jobs?category=software-dev&limit=5')
//   const [url, setUrl] = useState('https://remotive.com/api/remote-jobs?category=software&limit=2')
//   const [url, setUrl] = useState(`https://remotive.com/api/remote-jobs?limit=2&category=`+word)
    // const [url, setUrl] = useState('')
//   const { data } = useFetch(url)



    const [titleSearch, setTitleSearch] = useState('')
    const [errorMsg, setErrorMsg] = useState(false)
    const [data, setData] = useState([])
    const [formState, setFormState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [jobNo, setJobNo] = useState(5)
    const [jobLoading, setJobLoading] = useState(false)
    const [url, setUrl] = useState('https://remotive.com/api/remote-jobs')
    // const [url, setUrl] = useState('https://remotive.com/api/remote-jobs?search=php&20developer&limit=4')

       // function to run on form submit
        const handleSearchSubmit = (e) => {
        e.preventDefault()

        if(titleSearch.length == 0) {
            setErrorMsg(true)
            return
        }

        let trimInput = titleSearch.trim()
        let search = trimInput.replace(/\s/g, '%20')

        setFormState(true)
        setTitleSearch(search)

        setUrl(`https://remotive.com/api/remote-jobs?search=${search}`)

        setIsLoading(true)
        resetForm()
    }

    const handleSetJobNo = () => {
        setJobLoading(true)
        const timer = setTimeout(() => {
            setJobNo((prev) => prev + 2)
            setJobLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                if(formState) {
                    console.log(isLoading)
                    const res = await fetch(url)
                    const json = await res.json()
                    setData(json.jobs)
                    setIsLoading(false)
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchData(url);
    }, [url, jobNo])
    
    const resetForm = () => {
        setTitleSearch('')
    }

    return (
        <div className="App">
            <div className='search-section'>
                <div className='search-section-container'>
                    <div className='logo-section'>
                        <p>rcajobs</p>
                        <div className='site-mode'></div>
                    </div>
                    <div className='search-form-container'>
                        <form id='search-form' onSubmit={handleSearchSubmit}>
                            <div className='title-search'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input 
                                type='text' 
                                name='title'
                                placeholder='Filter by title, expertise...' 
                                onChange={(e) => {
                                    setTitleSearch(e.target.value)
                                    setErrorMsg(false)
                                }}
                                value={titleSearch}
                            />
                            </div>
                            {/* <div className='location-search'>
                                <i className="fa-solid fa-location-dot"></i>
                                <input 
                                type='text' 
                                placeholder='Filter by location...' 
                                onChange={(e) => setLocationSearch(e.target.value)}    
                                value={locationSearch}
                            />
                            </div> */}
                            {/* <div className='option-search'>
                                    <input 
                                        type="checkbox" 
                                        id="full-time"
                                        checked={timeOption}
                                        onChange={handleCheckboxInput}
                                        
                                    />
                                    <label htmlFor="full-time"> Full Time Only</label>
                            </div> */}
                            <div className='submit-btn-wrapper'>
                                <input type='submit' value='Search' />
                            </div>
                        </form>
                        {errorMsg && <p className='search-form-error-msg'>Can't be empty</p>}
                    </div>
                </div>
            </div>

            {/* job section start */}
            <div className='jobs-section'>
            <div className='jobs-section-container'>
                {isLoading && <div className='loader'>Loading...</div>}
                {!isLoading && <div className="jobs-wrapper">
                {data?.slice(0, jobNo).map(job => {  return <div key={job.id} onClick={() => console.log(job.id)} className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>5h ago</p>
                            <span></span>
                            <p>Full time</p>
                        </div>
                        <p className='job-title'>{job.title}</p>
                        <p className='company-name'>{job.company_name}</p>
                        <p className='country'>{job.candidate_required_location}</p>
                    </div>
                })}
                    {/* <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>5h ago</p>
                            <span></span>
                            <p>Full time</p>
                        </div>
                        <p className='job-title'>iOS Engineer</p>
                        <p className='company-name'>Vector</p>
                        <p className='country'>Kenya</p>
                    </div> */}
                    
                </div>}
                {/* <div className='job-wrapper'></div> */}
                
                {data.length > 0 && <div className='load-more-btn-wrapper'>
                    <button onClick={handleSetJobNo} >{jobLoading ? 'Loading...' : 'Load More'}</button>
                </div>}
            </div>
        </div>

                {/* <SearchSection/> */}
                {/* <JobsSection /> */}

        </div>
    )
}

export default App;
