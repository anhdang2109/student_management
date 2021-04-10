import axios from "axios";

const DOMAIN = "https://api-students-2109.herokuapp.com";
const api = axios.create({
    baseURL: DOMAIN,
    headers: {Authorization: "token"},
});


// Get student list
export function getStudents() {
    console.log(localStorage.getItem("token"))
    const url = '/students'
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    }
    return api.get(url, config)
}

// create & update student
export function saveStudent(method, student) {
    const url = '/students'
    const data = student
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    }
    if (method === 'post') return api.post(url, data, config);
    if (method === 'put') return api.put(url + `/${student.id}`, data, config);
}

// delete student
export function deleteStudent(student) {
    console.log(localStorage.getItem("token"))
    const url = '/students'
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    }
    return api.delete(url + `/${student.id}`, config)
}

// login
export function checkLogin(loginEmail, loginPassword) {
    const url = '/login'
    const data = {
        email: loginEmail,
        password: loginPassword,
    }
    return api.post(url, data)
}
