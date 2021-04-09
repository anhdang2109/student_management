import {Link} from "react-router-dom";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {Alert} from "react-bootstrap";
import {checkLogin} from "../../api/api";

function Login() {
    localStorage.clear();


    // Login variable
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();


    async function login(event) {
        event.preventDefault()
        try {
            const res = await checkLogin(loginEmail, loginPassword);
            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem("token", token);
                history.push("/");
            }
        } catch (err) {
            setIsError(true);
            console.log("Login fail")
            console.log(err)
        }
    }

    return (<div>
            <h1 className="text-center">Log in</h1>


            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-10">
                        {isError &&
                        <Alert variant={'danger'}>
                            <ul>
                                Email or Password incorrect
                            </ul>
                        </Alert>}
                        <div className="form-group row">
                            <label className="col-2 col-form-label">Email:</label>
                            <div className="col-10">
                                <input className="form-control shaw rounded"
                                       onChange={(event) => setLoginEmail(event.target.value)}
                                       placeholder="Enter your email address"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-2 col-form-label">Password:</label>
                            <div className="col-10">
                                <input className="form-control shaw rounded"
                                       onChange={(event) => setLoginPassword(event.target.value)}
                                       placeholder="Enter your password"/>
                            </div>
                        </div>

                        <div className="form-group row justify-content-center">
                            <Link to="/">
                                <button type="submit"
                                        onClick={(event) => login(event)}
                                        className="btn btn-primary">Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
