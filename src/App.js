import './App.css';
// import { BrowserRouter, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import SearchSection from './SearchSection/SearchSection';
import JobsSection from './JobsSection/JobsSection';
import './SearchSection/SearchSectionCSS/SearchSection.scss'
import './JobsSection/JobsSectionCSS/JobsSection.scss'
import useFetch from './hooks/useFetch'




function App() {

  // const [url, setUrl] = useState('https://remotive.com/api/remote-jobs?category=software-dev&limit=5')
//   const [url, setUrl] = useState('https://remotive.com/api/remote-jobs?category=software&limit=2')
//   const [url, setUrl] = useState(`https://remotive.com/api/remote-jobs?limit=2&category=`+word)
    // const [url, setUrl] = useState('')
//   const { data } = useFetch(url)



    const [titleSearch, setTitleSearch] = useState('')
    const [errorMsg, setErrorMsg] = useState(false)
    const [data, setData] = useState('')
    const [formState, setFormState] = useState(false)
    // const [url, setUrl] = useState('https://remotive.com/')
    const [url, setUrl] = useState('https://remotive.com/api/remote-jobs?search=php&20developer&limit=4')

    // let url = `https://remotive.com/api/remote-jobs?search=${titleSearch}&limit=1`;
    // let url = `https://remotive.com/api/remote-jobs?search=`+titleSearch;
    
    if (formState) {}

    const test = (k) => {
        if(formState) {
            console.log(k)
        }
    }

    // useEffect(() => {
    //     if(formState) {
    //         console.log(url)
    //         console.log(titleSearch)
    //     }
    // }, [formState])

       // function to run on form submit
       const handleSearchSubmit = (e) => {
        e.preventDefault()

        if(titleSearch.length == 0) {
            setErrorMsg(true)
            return
        }

        // setUrl(`https://remotive.com/api/remote-jobs?category=${titleSearch}&limit=1`)

        // setTitleSearch('titleSearch')

        // console.log(titleSearch)
        // console.log(url)
        // handleSearchInput(titleSearch)
        console.log('yooo')


        setFormState(true)
        resetForm()
    }


    useEffect(() => {

        const fetchData = async () => {
            try {
                if(formState) {
                    const res = await fetch(url)
                    const json = await res.json()
                    console.log(url)
                    console.log(json)
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchData(url);

    }, [formState])



    const fetchApi = async (url) => {
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)
    }

    // useEffect(() => {
    //     fetchApi()
    // }, [])


    // function handling error if input is empty on form submit
    const handleSearchInput = (input) => {
        if(input.length == 0) {
            setErrorMsg(true)
            return false;
        }
    }

    const handleTitle = (e) => {
        const name = e.target.value
        console.log(name)
    }
    
    const resetForm = () => {
        setTitleSearch('')
    }
    
        // const handleCheckboxInput = (e) => {
        //     setTimeOption(e.target.checked)
        // }

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
                                // onChange={(e) => setTitleSearch(e.target.value)}   
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
                <div className="jobs-wrapper">
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>5h ago</p>
                            <span></span>
                            <p>Full time</p>
                        </div>
                        <p className='job-title'>iOS Engineer</p>
                        <p className='company-name'>Vector</p>
                        <p className='country'>Kenya</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>20h ago</p>
                            <span></span>
                            <p>Part time</p>
                        </div>
                        <p className='job-title'>Midlevel Back end Engineer</p>
                        <p className='company-name'>Scoot</p>
                        <p className='country'>United States</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>1d ago</p>
                            <span></span>
                            <p>Full time</p>
                        </div>
                        <p className='job-title'>Senior Application Engineer</p>
                        <p className='company-name'>Office Lite</p>
                        <p className='country'>Japan</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>1d ago</p>
                            <span></span>
                            <p>Full time</p>
                        </div>
                        <p className='job-title'>Senior Application EngineerSenior Application EngineerSenior Application Engineer</p>
                        <p className='company-name'>Office Lite</p>
                        <p className='country'>Japan</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>1month ago</p>
                            <span></span>
                            <p>Part time</p>
                        </div>
                        <p className='job-title'>Full Stack Developer</p>
                        <p className='company-name'>Crowdfund</p>
                        <p className='country'>New Zealand</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>4d ago</p>
                            <span></span>
                            <p>Part time time</p>
                        </div>
                        <p className='job-title'>Technical Lead Engineer</p>
                        <p className='company-name'>Typemaster</p>
                        <p className='country'>United Kingdom</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>4d ago</p>
                            <span></span>
                            <p>Part time time</p>
                        </div>
                        <p className='job-title'>Technical Lead Engineer</p>
                        <p className='company-name'>Typemaster</p>
                        <p className='country'>United Kingdom</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>4d ago</p>
                            <span></span>
                            <p>Part time time</p>
                        </div>
                        <p className='job-title'>Technical Lead Engineer</p>
                        <p className='company-name'>Typemaster</p>
                        <p className='country'>United Kingdom</p>
                    </div>
                    <div className='job'>
                        <div className='company-logo'></div>
                        <div className='job-posting-time'>
                            <p>4d ago</p>
                            <span></span>
                            <p>Part time time</p>
                        </div>
                        <p className='job-title'>Technical Lead Engineer</p>
                        <p className='company-name'>Typemaster</p>
                        <p className='country'>United Kingdom</p>
                    </div>
                </div>
                {/* <div className='job-wrapper'></div> */}
                
                <div className='load-more-btn-wrapper'>
                    <button>Load More</button>
                </div>
            </div>
        </div>

                {/* <SearchSection/> */}
                {/* <JobsSection /> */}

        </div>
    )
}

export default App;
