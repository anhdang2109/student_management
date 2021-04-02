import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import shortid from "shortid";
import ListStudent from "./components/list";
import FormModal from "./components/form";
import ConfirmModal from "./components/confirm";

function App() {

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


    // Component's life-cycle
    useEffect(() => {
        (async function () {
            try {
                const res = await fetch("https://api-students-2109.herokuapp.com/students")
                if (!res.ok) {
                    console.error(new Error("fail to fetch"))
                } else {
                    const data = await res.json()
                    setInitialStudents(data)
                    setStudents(data)
                }
            } catch (err) {
                console.error(err.message)
                setInitialStudents([])
                setStudents([])
            }
        })()
    }, [])


    // Student CRUD function
    function findById(id) {
        let result;
        for (let i = 0; i < students.length; i++) {
            if (id === students[i].id) result = students[i]
        }
        return result;
    }

    function createStudent(event, id) {
        let newStudentLists = [...students]
        let name = document.getElementById(`student-name-${id}`).value;
        let birth = document.getElementById(`student-birth-${id}`).value;
        let email = document.getElementById(`student-email-${id}`).value;
        let phone = document.getElementById(`student-phone-${id}`).value;
        if ( validate(name, email)) {
            setIsValid(true)
            newStudentLists.push(
                {
                    id: shortid.generate(),
                    name: name,
                    birth: birth,
                    email: email,
                    phone: phone
                }
            )
            setStudents(newStudentLists);
            handleClose()
        } else {
            setIsValid(false)
        }

    }

    function updateStudent(event, id) {
        setIsValid(true)
        let index = students.indexOf(findById(id));
        if (index > -1) {
            let newStudentLists = [...students]
            let name = document.getElementById(`student-name-${id}`).value;
            let birth = document.getElementById(`student-birth-${id}`).value;
            let email = document.getElementById(`student-email-${id}`).value;
            let phone = document.getElementById(`student-phone-${id}`).value;
            if(validate(name, email)) {
                newStudentLists[index].name = name;
                newStudentLists[index].email = email;
                newStudentLists[index].birth = birth;
                newStudentLists[index].phone = phone;
                setStudents(newStudentLists);
                handleClose()
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
            setStudents(students => students.filter(student => student.id !== selectedStudent.id))
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
    function validate(name,email) {
        return !(name === '' || email === '');
    }

    // Component's view
    return (
        <div className="container">
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
                <Modal
                    show={show}
                    onHide={handleClose}>
                    {create && <FormModal
                        isValid={isValid}
                        title={'Thêm sinh viên'}
                        buttonClass={'success'}
                        buttonContext={'Lưu thông tin'}
                        selectedStudent={selectedStudent}
                        submitModal={createStudent}
                        closeModal={closeModal}/>}
                    {edit && <FormModal
                        isValid={isValid}
                        title={'Sửa sinh viên'}
                        buttonClass={'primary'}
                        buttonContext={'Cập nhật'}
                        selectedStudent={selectedStudent}
                        submitModal={updateStudent}
                        closeModal={closeModal}/>}
                    {remove && <ConfirmModal
                        selectedStudent={selectedStudent}
                        removeStudent={removeStudent}
                        closeModal={closeModal}/>}
                </Modal>
            </section>
        </div>
    );
}

export default App;
