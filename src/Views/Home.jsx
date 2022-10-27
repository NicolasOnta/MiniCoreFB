import {React, useEffect, useState, useContext, Fragment } from "react";
import {API_URL_Context} from '../API_Context.jsx'//Immport from original context file
import ReadRowResults from "./Components/ReadRowResults.jsx";
import ReadRowUserPass from "./Components/ReadRowUserPass.jsx";
import '../css/Home.css'

function Home(){
    const [users, setUsers] = useState(null);
    const [passTypes, setPassTypes] = useState(null);
    const [userPasses, setuserPasses] = useState(null);
    const [calcResponses, setCalcResponses] = useState(null);
    const [filterForm, setFilterForm] = useState({
        startDate : ''
    });
    const urlGetUsers = `${useContext(API_URL_Context)}/api/users`;
    const urlGetTypes = `${useContext(API_URL_Context)}/api/pass-types`;
    const urlGetPasses = `${useContext(API_URL_Context)}/api/user-passes`;
    const urlCore = `${useContext(API_URL_Context)}/api/calc`;

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

    const getAllUserPasses = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(urlGetPasses, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setuserPasses(json));
            }else {
                console.log("GET user passes failed");
            }
        })
    }

    const handleFormChange = (event) => {
        var fieldValue = event.target.value;//Get the value of the field
        event.preventDefault();

        console.log(fieldValue);
        
        const fieldName = event.target.getAttribute("name");//Get the name field

        const newFormData = {...filterForm}//Get the current state of filterForm
        newFormData[fieldName] = fieldValue//Update the value of a field

        setFilterForm(newFormData);
    }

    const submitFilter = (event) => {
        event.preventDefault();

        const filterRequest = async (filter) =>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filter)
            };
            console.log(JSON.stringify(filter))
            await fetch(urlCore, requestOptions)
                .then(res => {
                    if(res.ok){
                        res.json()
                        .then(json => setCalcResponses(json))
                    }else if(res.status == 400 || res.status == 500){
                        console.log("Filter error");
                    }
                });
        }

        const filter = {
            startDate : filterForm.startDate
        }

        filterRequest(filter)
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
            <p>Select a starting date to filter purchased parking passes that should run out after this date. Passes that already ran out are not shown.</p>
            <form class="filter-form" onSubmit={submitFilter}>
                <label>Start Date </label>
                <input type="date" name="startDate" required onChange={handleFormChange}></input>
                <button type="submit" onChange={handleFormChange}>Search</button>
            </form>
            <div class="filter-results">
                <table>
                    <thead>
                        <th>User</th>
                        <th>Pass type</th>
                        <th>Purchase date</th>
                        <th>Estimated date passes run out</th>
                        <th>Estimated remaining passes (to today)</th>
                    </thead>
                    <tbody>
                    {calcResponses &&
                        calcResponses.map((calcResponse) => (
                                <ReadRowResults calcResponse = {calcResponse}/>//If there were multiple components to render in this tbody, they should be inside a Fragment
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </main>
        <div class="all-passes">
            <h2>All purchased passes</h2>
            <p>So that they can be compared with the filter, all purchased passes are shown here.</p>
            <table>
                <thead>
                    <th>Purchased pass Id</th>
                    <th>User</th>
                    <th>Pass type</th>
                    <th>Purchase date</th>
                </thead>
                <tbody>
                {userPasses && users && passTypes &&
                    userPasses.map((userPass) => (
                            <ReadRowUserPass userPass = {userPass} users = {users} passTypes = {passTypes}/>
                    ))
                }
                </tbody>
            </table>
        </div>
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