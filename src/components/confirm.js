function ConfirmModal({
                          removeStudent,
                          closeModal,
                          selectedStudent
                      }) {
    return (
        <div>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Xoá sinh viên</h5>
                    <button type="button"
                            className="close"
                            onClick={(e) => closeModal(e)}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Bạn có chắc muốn xoá không?</p>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={(e) => closeModal(e)}>Đóng
                    </button>
                    <button type="button"
                            onClick={(e) => removeStudent(e, selectedStudent.id)}
                            className="btn btn-danger">Xoá
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
