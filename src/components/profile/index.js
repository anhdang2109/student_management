import {Link, Redirect} from "react-router-dom";
import React from "react";

function Profile() {
    return <div>
        {localStorage.getItem("token") ?
            <div>
                <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
                <Link to="/">
                    <button className="btn btn-primary">Students</button>
                </Link>
                <hr/>
                <h1>Profile page</h1>
            </div>
            :
            <Redirect from='/' to='/login'/>}
    </div>
}

export default Profile
