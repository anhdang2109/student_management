import {Link} from "react-router-dom";
import React from "react";

function Profile() {
    return <div>
        <Link to="/login"><button className="btn btn-primary">Login</button></Link>
        <Link to="/"><button className="btn btn-primary">Students</button></Link>
        <hr />
        <h1>Profile page</h1>
    </div>
}

export default Profile
