'use client'

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../../context/page'
import { useRouter } from 'next/navigation.js';

const Header = () => {
    const [state, setState] = useContext(userContext);
    const [currentTab, setTab] = useState("");
    const router = useRouter();

    const logoutController = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    }


    useEffect(() => {
        typeof window !== 'undefined' && setTab(window.location.pathname)
    }, [])



    // onClick={stylesetter}



    useEffect(() => {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(innerLink => innerLink.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }, [])












    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="/">SM App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-1">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link legacyBehavior href="/About">
                                <a className='nav-link'>About</a>

                            </Link>
                        </li>
                        {state != null ? (
                            <>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        {state && state.user && state.user.name}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li className="nav-item">
                                            <Link legacyBehavior href="/Dashboard">
                                                <a className="dropdown-item" >Dashboard</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link legacyBehavior href="/Profile">
                                                <a className="dropdown-item" >Profile</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <li className="nav-item">

                                    <a className="nav-link" onClick={logoutController}>Logout</a>

                                </li>
                            </>
                        ) : (<>   <li className="nav-item">
                            <Link legacyBehavior href="/Register">
                                <a className="nav-link" >Register</a>
                            </Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/login">Login</Link>
                            </li>
                        </>)}



                    </ul>

                </div>
            </div>
        </nav>

    )
}

export default Header