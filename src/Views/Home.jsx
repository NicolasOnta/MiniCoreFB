import {React, useEffect, useState } from "react";

function Home(){
    const [users, setUsers] = useState(null);
    const urlGet = "https://localhost:7221/api/users";

    useEffect(() => {
        getAll();
    }, [])

    const getAll = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(urlGet, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setUsers(json));
            }else {
                console.log("Oopsie");
            }
        })
    }

    let content = 
    <div>
        <h2>Users: </h2>
            {users &&
                <ul>
                    {users.map((user) => (
                        <li>{user.email}</li>
                    ))}
                </ul>
            }
    </div>

    return(
        <div>
            {content}
        </div>
    )
}

export default Home;