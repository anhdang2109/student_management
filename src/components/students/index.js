import {Button, Modal} from "react-bootstrap";
import ListStudent from "./list";
import {Pagination} from "@material-ui/lab";
import FormModal from "./form";
import ConfirmModal from "./confirm";
import React, {useEffect, useState} from "react";
import usePagination from "./pagination";
import {Link, Redirect, useHistory} from "react-router-dom";
import { withRouter } from "react-router";
import {deleteStudent, getStudent, getStudents, saveStudent} from "../../api/api";
import _ from 'lodash'

function Students(props) {
    const history = useHistory();
    const id = localStorage.getItem('id')
    const [user,setUser] = useState({})


    // Student variable
    const [initialStudents, setInitialStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null)

    // Sort variable
    const [sortName, setSortName] = useState('no-order');
    const [sortBirth, setSortBirth] = useState('no-order');
    const [sortEmail, setSortEmail] = useState('no-order');
    const [sortPhone, setSortPhone] = useState('no-order');

    // Modal variable
    const [show, setShow] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);

    // Form
    const [isValid, setIsValid] = useState(true)
    const [errors, setErrors] = useState([])

    let [page, setPage] = useState(1);
    const PER_PAGE = 5;

    const count = Math.ceil(students.length / PER_PAGE);
    const _DATA = usePagination(students, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    // Component's life-cycle
    useEffect(() => {
        (async function () {
            try {
                const res = await getStudents();
                if (res.status === 200) {
                    setInitialStudents(res.data)
                    setStudents(res.data)
                }
                console.log(res)
            } catch (err) {
                if (err.response.status === 401) props.history.push("/login")
                alert("token het han")
            }
        })();
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
    }, [props.history, id])

    function logout() {
        localStorage.removeItem("token");
        history.push("/login")
    }

    // Student CRUD function
    function findById(id) {
        let result;
        for (let i = 0; i < students.length; i++) {
            if (id === students[i].id) result = students[i]
        }
        return result;
    }

    function updateData(field, value) {
        let newStudent = _.cloneDeep(selectedStudent)
        newStudent[field] = value
        setSelectedStudent(newStudent)
    }

    function createStudent() {
        let newStudentLists = [...students]
        if (validate(selectedStudent.name, selectedStudent.email)) {
            setIsValid(true);
            (async function () {
                try {
                    const res = await saveStudent('post', selectedStudent);
                    if (res.status === 201) {
                        console.log("Request complete! response:");
                        newStudentLists.push(selectedStudent)
                        setStudents(newStudentLists);
                        handleClose()
                    }
                } catch (err) {
                    if (err.response.status === 401) props.history.push("/login")
                    alert("token het han")
                }
            })();
        } else {
            setIsValid(false)
        }
    }

    function updateStudent(event, id) {
        setIsValid(true)
        let index = students.indexOf(findById(id));
        if (index > -1) {
            let newStudentLists = [...students]
            if (validate(selectedStudent.name, selectedStudent.email)) {
                setIsValid(true);
                (async function () {
                    try {
                        const res = await saveStudent('put', selectedStudent);
                        if (res.status === 200) {
                            console.log("Request complete! response:");
                            newStudentLists[index].name = selectedStudent.name;
                            newStudentLists[index].email = selectedStudent.email;
                            newStudentLists[index].birth = selectedStudent.birth;
                            newStudentLists[index].phone = selectedStudent.phone;
                            setStudents(newStudentLists);
                            handleClose()
                        }
                    } catch (err) {
                        if (err.response.status === 401) props.history.push("/login")
                        alert("token het han")
                    }
                })();
            } else {
                setIsValid(false)
            }
        }
    }

    function removeStudent(event, id) {
        event.preventDefault()
        let selectedStudent = findById(id);
        let index = students.indexOf(selectedStudent);
        if (index > -1) {
            (async function () {
                try {
                    const res = await deleteStudent(selectedStudent);
                    if (res.status === 200) {
                        console.log("Request complete! response:");
                        setStudents(students => students.filter(student => student.id !== selectedStudent.id))
                    }
                } catch (err) {
                    if (err.response.status === 401) props.history.push("/login")
                    alert("token het han")
                }
            })();
        }
        handleClose()
    }

    // Sorting function
    function sortByName() {
        if (sortName === 'no-order') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortName('increase')
            setSortBirth('no-order')
            setSortEmail('no-order')
            setSortPhone('no-order')
        }
        if (sortName === 'increase') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortName('decrease')
        }
        if (sortName === 'decrease') {
            setStudents(initialStudents)
            setSortName('no-order')
        }
    }

    function sortByBirth() {
        if (sortBirth === 'no-order') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.birth.toUpperCase();
                let nameB = b.birth.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortBirth('increase')
            setSortName('no-order')
            setSortEmail('no-order')
            setSortPhone('no-order')
            return sortStudents
        }
        if (sortBirth === 'increase') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.birth.toUpperCase();
                let nameB = b.birth.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortBirth('decrease')
            return sortStudents
        }
        if (sortBirth === 'decrease') {
            setStudents(initialStudents)
            setSortBirth('no-order')
        }
    }

    function sortByEmail() {
        if (sortEmail === 'no-order') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.email.toUpperCase();
                let nameB = b.email.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortEmail('increase')
            setSortBirth('no-order')
            setSortName('no-order')
            setSortPhone('no-order')
            return sortStudents
        }
        if (sortEmail === 'increase') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.email.toUpperCase();
                let nameB = b.email.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortEmail('decrease')
            return sortStudents
        }
        if (sortEmail === 'decrease') {
            setStudents(initialStudents)
            setSortEmail('no-order')
        }
    }

    function sortByPhone() {
        if (sortPhone === 'no-order') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.phone.toUpperCase();
                let nameB = b.phone.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortPhone('increase')
            setSortBirth('no-order')
            setSortEmail('no-order')
            setSortName('no-order')
        }
        if (sortPhone === 'increase') {
            let sortStudents = [...students]
            sortStudents = sortStudents.sort(function (a, b) {
                let nameA = a.phone.toUpperCase();
                let nameB = b.phone.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });
            setStudents(sortStudents)
            setSortPhone('decrease')
        }
        if (sortPhone === 'decrease') {
            setStudents(initialStudents)
            setSortPhone('no-order')
        }
    }

    // Modal function
    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
        setCreate(false)
        setEdit(false)
        setRemove(false)
        setIsValid(true)
    }

    function openCreate(event) {
        event.preventDefault()
        handleShow()
        setSelectedStudent({
            id: 0,
            name: '',
            email: '',
            birth: '',
            phone: ''
        })
        setCreate(true)
    }

    function openEdit(event, id) {
        event.preventDefault()
        handleShow()
        setSelectedStudent(findById(id))
        setEdit(true)
    }

    function openRemove(event, id) {
        event.preventDefault()
        handleShow()
        setSelectedStudent(findById(id))
        setRemove(true)
    }

    function closeModal(event) {
        event.preventDefault()
        handleClose()
        setCreate(false)
        setEdit(false)
        setRemove(false)
    }

    // Validation
    function validate(name, email) {
        let newErrors = [];
        let noError = true;
        if (name === '') {
            newErrors.push('Tên không được bỏ trống')
            setErrors(newErrors)
            noError = false
        }
        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
            newErrors.push('Email không hợp lệ')
            setErrors(newErrors)
            noError = false
        }
        return noError;
    }

    return (
        <div>
            { !localStorage.getItem('token') && <Redirect to='/login'/>}
            <div className="container">
                <h1>Hello {user.name}</h1>
                <Link to="/profile">
                    <button className="btn btn-primary">Profile</button>
                </Link>
                <button
                    onClick={()=>logout()}
                    className="btn btn-dark">Logout
                </button>
                <hr/>
                <section id="header">
                    <h2>Danh sách học viên</h2>
                    <Button variant="success"
                            onClick={(event) => openCreate(event)}>
                        <i className="fa fa-plus-circle" aria-hidden="true"/>
                        Thêm học viên
                    </Button>
                    <br/>
                    <br/>
                </section>
                <section id="table">
                    <ListStudent
                        students={students}
                        _DATA={_DATA}
                        sortName={sortName}
                        sortBirth={sortBirth}
                        sortEmail={sortEmail}
                        sortPhone={sortPhone}
                        openEdit={openEdit}
                        openRemove={openRemove}
                        sortByName={sortByName}
                        sortByBirth={sortByBirth}
                        sortByEmail={sortByEmail}
                        sortByPhone={sortByPhone}/>
                    <br/>
                    <Pagination

                        count={count}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                    <Modal
                        show={show}
                        onHide={handleClose}>
                        {create && <FormModal
                            errors={errors}
                            isValid={isValid}
                            title={'Thêm sinh viên'}
                            buttonClass={'success'}
                            buttonContext={'Lưu thông tin'}
                            selectedStudent={selectedStudent}
                            updateData={updateData}
                            submitModal={createStudent}
                            closeModal={closeModal}/>}
                        {edit && <FormModal
                            errors={errors}
                            isValid={isValid}
                            title={'Sửa sinh viên'}
                            buttonClass={'primary'}
                            buttonContext={'Cập nhật'}
                            selectedStudent={selectedStudent}
                            updateData={updateData}
                            submitModal={updateStudent}
                            closeModal={closeModal}/>}
                        {remove && <ConfirmModal
                            selectedStudent={selectedStudent}
                            removeStudent={removeStudent}
                            closeModal={closeModal}/>}
                    </Modal>
                </section>
            </div>
        </div>);
}

export default withRouter(Students)
