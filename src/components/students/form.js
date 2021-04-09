import {Alert} from "react-bootstrap";

function FormModal({
                       errors,
                       isValid,
                       closeModal,
                       submitModal,
                       title,
                       buttonClass,
                       buttonContext,
                       selectedStudent,
                       updateData
                   }) {
    let errorMessage = errors.map(error => <li>{error}</li>)
    return (
        <div>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <button type="button"
                            className="close"
                            onClick={(event) => closeModal(event)}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {!isValid &&
                    <Alert variant={'danger'}>
                        <ul>
                            {errorMessage}
                        </ul>
                    </Alert>}
                    <form>
                        <div className="form-group">
                            <label htmlFor="student-name" className="col-form-label">Họ tên (*):</label>
                            <input id={'student-name-' + selectedStudent.id}
                                   type="text" className="form-control"
                                   onChange={(event) => updateData('name',event.target.value)}
                                   defaultValue={selectedStudent.name || ''}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="student-birth" className="col-form-label">Ngày sinh:</label>
                            <input id={'student-birth-' + selectedStudent.id}
                                   type="text" className="form-control"
                                   onChange={(event) => updateData('birth',event.target.value)}
                                   defaultValue={selectedStudent.birth || ''}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="student-email" className="col-form-label">Email (*):</label>
                            <input id={'student-email-' + selectedStudent.id}
                                   type="text" className="form-control"
                                   onChange={(event) => updateData('email',event.target.value)}
                                   defaultValue={selectedStudent.email || ''}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="student-phone" className="col-form-label">Số điện thoại:</label>
                            <input id={'student-phone-' + selectedStudent.id}
                                   type="text" className="form-control"
                                   onChange={(event) => updateData('phone',event.target.value)}
                                   defaultValue={selectedStudent.phone || ''}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={(event) => closeModal(event)}>Đóng
                    </button>
                    <button type="button"
                            onClick={(event) => submitModal(event, selectedStudent.id)}
                            className={`btn btn-${buttonClass}`}>{buttonContext}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormModal
