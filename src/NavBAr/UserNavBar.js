import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import not from "../Images/not.png"
function UserNavBar() {
    const[islogin,setIsLogin]=useState(false)
    const name = JSON.parse(localStorage.getItem('name'));
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate('/login');
    }
    // if(name!==null){
    //     setIsLogin(!islogin)
    // }

    const isLoggedIn = name !== null;

    return (
        <>
            <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
                {/* Brand/logo */}
                <a className='navbar-brand' href='#'>
                    <img src='favicon.ico' alt='logo' />
                </a>

                {/* Links */}
                <ul className='navbar-nav justify-content-end'>
                    {isLoggedIn ? (
                        <div className='d-flex flex-row'>

                            <li className='nav-item active'>
                                <Link className='nav-link' to='/home'>
                                    <h5>HOME</h5>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/profile'>
                                    <h5>PROFILE</h5>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/yourbooking'>
                                    <h5>YOUR BOOKING</h5>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/videocall'>
                                    <h5>Video Call</h5>
                                </Link>
                            </li>
                            <div className='d-flex flex-row' style={{ marginLeft: '1000px' }}>
                          
                                <li className='nav-item'>
                                    <Link className='nav-link bg-white text-dark mr-5 ml-5' onClick={logout} to='/login'>
                                        <h5>Logout</h5>
                                    </Link>
                                </li>
                                <h4 className='text-white mt-2 ml-4'>{name}</h4>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex' style={{ marginLeft: '100px' }}>
                            <li className='nav-item '>
                                <Link className='nav-link  text-right' to='/signup'>
                                    <h5>SignUp</h5>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/login'>
                                    <h5>Login</h5>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/about'>
                                    <h5>About Us</h5>
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>

           


        </>
    );
}

export default UserNavBar;
