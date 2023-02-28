import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment';
import './JobsSection.scss'
import JobDescriptions from './JobDescriptions';
import JobDescription from './JobDescription';




function JobsSection() {


    const [titleSearch, setTitleSearch] = useState('')
    const [errorMsg, setErrorMsg] = useState(false)
    const [data, setData] = useState([])
    const [formState, setFormState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [jobNo, setJobNo] = useState(6)
    const [jobLoading, setJobLoading] = useState(false)
    const [errorFetching, setErrorFetching] = useState('')
    const [descriptionState, setDescriptionState] = useState(false)
    const [jobDescriptions, setJobDescritions] = useState(null)
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

    // function loading more jobs to display 
    const handleSetJobNo = () => {
        setJobLoading(true)
        const timer = setTimeout(() => {
            setJobNo((prev) => prev + 6)
            setJobLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }

    // function sending api request to fetch jobs data
    useEffect(() => {

        const fetchData = async () => {
            try {
                if(formState) {
                    // console.log(isLoading)
                    const res = await fetch(url)
                    const json = await res.json()
                    setData(json.jobs)
                    setIsLoading(false)

                    if(data.length === 0) {
                        setErrorFetching('Couldn\'t get the job you are searching. Please try again')
                    }

                } 
            } catch (err) {
                setIsLoading(false)
                console.log(err)
            }
        }


        fetchData(url);

    }, [url, jobNo])


    
    const resetForm = () => {
        setTitleSearch('')
    }

    const convertJobPublicationTime = (str) => {
        let publicationDate = moment(str).format('MMM Do YYYY')
        return publicationDate
    }

    const handleUnderscoreReplacement = (str) => {
        let input = str.charAt(0).toUpperCase() + str.slice(1)
        let jobType = input.replace('_', ' ')
        return jobType
    }


    const handleJobDescription = (index, id) => {

        const jobDescription = {
            url: data[index].url,
            logo: data[index].company_logo,
            companyName: data[index].company_name,
            description: data[index].description,
            title: data[index].title,
            location: data[index].candidate_required_location,
            id: data[index].id,
            jobPublicationDate: data[index].publication_date,
            jobType: data[index].job_type,
            show: true
        }

        setJobDescritions(jobDescription)
    }

    const handleDescriptionToggling = () => {
        setDescriptionState(true)
    }

    const handleHtmlToText = (html) => {
        let strippedHtml = html.replace(/<[^>]+>/g, '')

        return strippedHtml

    }



  return (
      <div className="home">



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
                {/* <div className='jobs-wrapper'>
                    <Link>
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
                    </Link>
                </div> */}
                {/* {isLoading && <div className='loader'>Loading...</div>} */}
                {isLoading && <div className='loader'>
                    {/* <h1>ghlkhjl;kj</h1> */}
                        <div className='loader-wrapper'>
                            <span className="loader"></span>
                        </div>
                    </div>}
                {!isLoading && errorFetching && data.length === 0 && <div className='error-fetching-job'>
                    <h2 style={{color: 'white', textAlign: 'center'}}>Could not get the job you are searching. Please try again</h2>
                </div>}
                {!isLoading && <div className="jobs-wrapper">
                {data?.slice(0, jobNo).map((job, index) => { return <div key={job.id} onClick={() => {
                    // console.log(job.id, index)
                    handleJobDescription(index, job.id)
                    handleDescriptionToggling()
                }} className='job'>
                            <div className='company-logo'>
                                <img src={job.company_logo} />
                            </div>
                            <div className='job-posting-time'>
                                <p>Posted on {convertJobPublicationTime(job.publication_date)}</p>
                                <span></span>
                                <p>{handleUnderscoreReplacement(job.job_type)}</p>
                            </div>
                            <p className='job-title'>{job.title}</p>
                            <p className='company-name'>{job.company_name}</p>
                            <p className='country'>{job.candidate_required_location}</p>
                        </div>


                })}





            </div>}
                {!isLoading && data.length > 0 && jobNo < data.length && <div className='load-more-btn-wrapper'>
                    <button onClick={handleSetJobNo} >{jobLoading ? 'Loading...' : 'Load More'}</button>
                </div>}

               

                {/* <JobDescription /> */}
                {/* { descriptionState && <JobDescription data={descData} descriptionState={descriptionState} />} */}



                        {/* <Route exact path='/' element={<JobsSection />}  /> */}
                        {/* <Route path='/jobdescription' element={<JobDescriptions />}  /> */}

                    {/* <Route path='/jobdescription'>
                        <JobDescriptions data={data} />
                    </Route> */}
        </div>



        {/* {data.length > 0 && description && <JobDescription data={data} />} */}


        </div>

        {jobDescriptions && <div className={`job-description-section ${descriptionState ? '' : 'hide-description'}`}>
            <span className={`material-symbols-outlined`} onClick={() => setDescriptionState(false)}>close</span>
            <div className='job-section-container'>
                    <div className='company-details'>
                        <div className='logo'>
                            <img src={jobDescriptions.logo} />
                        </div>
                        <div className='details'>
                            <div className='name'>
                                {/* <p>Scoot</p> */}
                                <p>{jobDescriptions.companyName}</p>
                                {/* <p>scoot.com</p> */}
                            </div>
                            {/* <div className='website-link'>
                                <a href='#'>Company Site</a>
                            </div> */}
                        </div>
                    </div>
                    <div className='job-details'>
                        <div className="job-title-container">
                            <div className='job-title'>
                                <p>{convertJobPublicationTime(jobDescriptions.jobPublicationDate)} <span>.</span> {handleUnderscoreReplacement(jobDescriptions.jobType)}</p>
                                {/* <p>{convertJobPublicationTime(jobDescriptions.jobPublicationDate)} <span>.</span> {jobDescriptions.jobType}</p> */}
                                <h1>{jobDescriptions.title}</h1>
                                <p>{jobDescriptions.location}</p>
                            </div>
                            <div className='apply-btn-wrapper'>
                                <a href={jobDescriptions.url} target='_blank'>Apply Now</a>
                            </div>
                        </div>
                        <div className='job-text-details'>
                            {/* {handleHtmlToText(jobDescriptions.description)} */}
                            <h2>Job description</h2>
                            <p>{handleHtmlToText(jobDescriptions.description)}</p>
                            {/* <p>{jobDescriptions.description}</p> */}
                            {/* {jobDescriptions.description} */}
                        </div>
                        {/* <div className='job-text-details'>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            
                            <div className='job-requirement-section'>
                                <h3>Requirements</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                </p>

                                <ul className='requirement-list-wrapper'>
                                    <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                                    <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
                                    <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                                </ul>

                                <h3>What you will do</h3>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                </p>

                                <ol className='requirement-list-wrapper'>
                                    <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                                    <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
                                    <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                                </ol>

                            </div>
                        </div> */}
                    </div>
            </div>
        </div>}


        {/* <JobDescription /> */}


        </div>
  )
}

export default JobsSection;