import React, {useState} from 'react'

import './JobDescription.scss'

function JobDescription({data, show, descriptionState}) {

    const [isShow, setIsShow] = useState(false)

    const {url, title} = data

    if(data) {
        console.log('yoooooo')
        // setIsShow(true)
        // console.log(isShow)
    }

    // console.log(data.url, data.title)
    console.log(show)
   



  return (
    // <div className='job-description-section hidden'>
    <div className={`job-description-section ${descriptionState ? '' : 'hidden'}`}>
        {descriptionState && <span className="material-symbols-outlined">arrow_back_ios</span>}
        {/* <div className='loader-wrapper'>
            <span className="loader"></span>
        </div> */}
        <div className='job-section-container'>
                <div className='company-details'>
                    <div className='logo'></div>
                    <div className='details'>
                        <div className='name'>
                            <p>Scoot</p>
                            <p>scoot.com</p>
                        </div>
                        <div className='website-link'>
                            <a href='#'>Company Site</a>
                        </div>
                    </div>
                </div>
                <div className='job-details'>
                    <div className="job-title-container">
                        <div className='job-title'>
                            <p>1w ago <span>.</span> Part Time</p>
                            <h1>Senior Product Manager</h1>
                            <p>South Africa</p>
                        </div>
                        <div className='apply-btn-wrapper'>
                            <a href='#'>Apply Now</a>
                        </div>
                    </div>
                    <div className='job-text-details'>
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
                    </div>
                </div>
        </div>
    </div>
  )
}

export default JobDescription