import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../components/assets/css/ViewUser.css'

const ViewUSer = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const result = await axios.get(`http://localhost:3307/api/user/${id}`)
            setUser(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            <h1 className="mainheading">User Management</h1>
            {user ?
                <div className="card">
                    <div className="card-border-top">
                    </div>
                    <div className="card-details">
                    <div className="img">
                        <img src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png" alt="user" />
                    </div>
                    <span>{user.name}</span>
                    <p className="job">{user.email}</p>
                    <Link to={'/users'}><button> Back
                    </button></Link>
                    </div>
                </div>
                :
                <h2>Please select valid user</h2>
            }

        </>
    )
}

export default ViewUSer;