import {Link, Redirect, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getStudent} from "../../api/api";
import {withRouter} from "react-router";

function Profile(props) {
    const history = useHistory();
    const id = localStorage.getItem('id')
    function logout() {
        localStorage.removeItem("token");
        history.push("/login")
    }
    const [user,setUser] = useState({})

    // Component's life-cycle
    useEffect(() => {
        (async function () {
            try {
                const res = await getStudent(id);
                if (res.status === 200) {
                    setUser(res.data)
                }
                console.log(res)
            } catch (err) {
                if (err.response.status === 401) props.history.push("/login")
                alert("token het han")
            }
        })();
    }, [props.history,id])

    return <div>
        { !localStorage.getItem('token') && <Redirect to='/login'/>}
            <div>
                <h1>Hello {user.name}</h1>
                <Link to="/">
                    <button className="btn btn-primary">Students</button>
                </Link>
                <button
                    onClick={()=>logout()}
                    className="btn btn-dark">Logout
                </button>
                <hr/>
            </div>
    </div>
}

export default withRouter(Profile)
