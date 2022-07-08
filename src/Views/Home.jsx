import {React, useEffect, useState } from "react";
import '../css/Home.css'

function Home(){
    const [users, setUsers] = useState(null);
    const [passTypes, setPassTypes] = useState(null);
    const [userPasses, setUserPasses] = useState(null);
    const [calcRequest, setCalcRequest] = useState({
        startDate : ''
    });
    const urlGetUsers = "https://localhost:7221/api/users";
    const urlGetTypes = "https://localhost:7221/api/pass-types";
    const urlGetPasses = "https://localhost:7221/api/user-passes";
    const urlCore = "https://localhost:7221/api/calc";

    useEffect(() => {
        document.title = "Diego Hiriart - MiniCore"
        getAllUsers();
        getAllPassTypes();
        getAllUserPasses();
    }, [])

    const getAllUsers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(urlGetUsers, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setUsers(json));
            }else {
                console.log("GET users failed");
            }
        })
    }

    const getAllPassTypes = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(urlGetTypes, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setPassTypes(json));
            }else {
                console.log("GET pass types failed");
            }
        })
    }

    const handleFormChange = (event) => {

    }

    const getAllUserPasses = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(urlGetPasses, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setUserPasses(json));
            }else {
                console.log("Get user passes failed");
            }
        })
    }

    const submitFilter = async () => {

    }

    let content = 
    <div class="container">
        <div class="header">
            <h4>Diego Hiriart León</h4>
            <h4>Web Engineering</h4>
            <h4>UDLA</h4>
        </div>
        <div class="title">
            <h1>Parking passes - MiniCore</h1>
        </div>
        <div class="info">
            <h2>General Info</h2>
            <div class="data-list">
                <div class="data-element">
                    <h3>Users</h3>
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Email</th>
                        </thead>
                        {users &&
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </table>
                </div>
                <div class="data-element">
                    <h3>Pass Types</h3>
                    <table>
                        <thead>
                            <th>Description</th>
                            <th>Duration (months)</th>
                            <th>Passes</th>
                            <th>Cost</th>
                        </thead>
                        {passTypes &&
                        <tbody>
                            {passTypes.map((passType) => (
                                <tr key={passType.passtypeId}>
                                    <td>{passType.name}</td>
                                    <td>{passType.monthsDuration}</td>
                                    <td>{passType.passesAmount}</td>
                                    <td>{passType.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
        <main class="filtering">
            <h2>Passes filtering</h2>
            <form class="filter-form" onSubmit={submitFilter}>
                <label>Start Date </label>
                <input type="date" required onChange={handleFormChange}></input>
                <button type="submit" onChange={handleFormChange}>Search</button>
            </form>
            <div class="filter-results">
                <table>
                    <thead>
                        <th>User</th>
                        <th>Pass type</th>
                        <th>Purchase date</th>
                        <th>Estimated end date</th>
                        <th>Estimated remaining passes</th>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </main>
        <div class="footer">
            <div>
                <p>Code</p>
                <ul>
                    <li><a href="https://github.com/Diego-Hiriart/Minicore-Frontend">Front-end source code</a></li>
                    <li><a href="https://github.com/Diego-Hiriart/Minicore-Backend">Back-end source code</a></li>
                </ul>
            </div>
            <div>
                <p>Contact</p>
                <ul>
                    <li><a href="mailto:hiriart.leon.d@gmail.com">hiriart.leon.d@gmail.com</a></li>
                    <li><a href="https://github.com/Diego-Hiriart">GitHub</a></li>
                </ul>
            </div>
        </div>
    </div>

    return(
        <div class="page">
            {content}
        </div>
    )
}

export default Home;