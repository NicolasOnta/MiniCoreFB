import {React, useEffect, useState } from "react";
import {  differenceInCalendarDays, addMonths, isAfter } from 'date-fns';
import { db } from "../firebase-conf";
import {
    collection,
    getDocs
  } from "firebase/firestore";
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
    const usersCollectionRef = collection(db, "users");
    const passTypesCollectionRef = collection(db, "passTypes");
    const userPassesCollectionRef = collection(db, "userPasses");

    useEffect(() => {
        document.title = "Nicolas Ontaneda - MiniCore Front End Credits:Diego Hiriart"
        getAllUsers();
        getAllPassTypes();
        getAllUserPasses();
    }, [])


    const getAllUsers = async () => {
        const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const getAllPassTypes = async () => {
        const data = await getDocs(passTypesCollectionRef);
        setPassTypes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const getAllUserPasses = async () => {
        const data = await getDocs(userPassesCollectionRef);
        setuserPasses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
        console.log(filterForm.startDate);
        const PassCollection=[]
        const activePasses=userPasses.filter(pass => isAfter(addMonths(new Date(pass.purchase.seconds*1000),(passTypes.find(passType => passType.passtypeId == pass.passTypeId)).monthsDuration),new Date(filterForm.startDate)));
        activePasses.forEach((item,index) => { PassCollection[index] = {
            user:{
                mail:(users.find(user => user.userId == item.userId).email)
            },
            passTypes:{
                name:(passTypes.find(passType => passType.passtypeId == item.passTypeId).name)
            },
            userPass:{
                purchase:item.purchase
            },
            estimatedRemainingPasses:((passTypes.find(passType => passType.passtypeId == item.passTypeId)).passesAmount-differenceInCalendarDays(new Date(filterForm.startDate),new Date(item.purchase.seconds*1000))-1),
            estimatedEndDate:(addMonths(new Date(item.purchase.seconds*1000),(passTypes.find(passType => passType.passtypeId == item.passTypeId)).monthsDuration))
        }} );
setCalcResponses(PassCollection);
    }

    let content = 
    <div class="container">
        <div class="title">
            <h1>Pases de parking - MiniCore</h1>
        </div>
        <div class="info">
            <h2>Informacion general</h2>
            <div class="data-list">
                <div class="data-element">
                    <h3>Usuarios</h3>
                    <table>
                        <thead>
                            <th>Nombre</th>
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
                            <th>Descripcion</th>
                            <th>Duracion en meses</th>
                            <th>Pases</th>
                            <th>Costo</th>
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
            <h2>Filtro de pases</h2>
            <p>Seleccione una fecha de inicio para filtrar la compra de pases de estacionamiento que deberían agotarse después de esta fecha. Los pases que ya se agotaron no se muestran.</p>
            <form class="filter-form" onSubmit={submitFilter}>
                <label>Fecha inicial </label>
                <input type="date" name="startDate" required onChange={handleFormChange}></input>
                <button type="submit" onChange={handleFormChange}>Search</button>
            </form>
            <div class="filter-results">
                <table>
                    <thead>
                        <th>Usuario</th>
                        <th>Tipo de pase</th>
                        <th>Fecha de compra</th>
                        <th>Fecha de caducidad estimada</th>
                        <th>Pases resultantes estimados a la fecha </th>
                    </thead>
                    <tbody>
                    {calcResponses!== null &&
                        calcResponses.map((calcResponse, index) => (
                                <ReadRowResults key={index} calcResponse = {calcResponse}/>//If there were multiple components to render in this tbody, they should be inside a Fragment
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </main>
        <div class="all-passes">
            <h2>Pases</h2>
            <p>Para que se puedan comparar con el filtro, aquí se muestran todos los pases comprados.</p>
            <table>
                <thead>
                    <th>id</th>
                    <th>Usuario</th>
                    <th>Tipo de Pase</th>
                    <th>Fecha de compra</th>
                </thead>
                <tbody>
                {userPasses && users && passTypes &&
                    userPasses.map((userPass,index) => (
                            <ReadRowUserPass key={index} userPass = {userPass} users = {users} passTypes = {passTypes}/>
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>

    return(
        <div class="page">
            {content}
        </div>
    )
}

export default Home;