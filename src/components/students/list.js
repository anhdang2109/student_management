function ListStudent({
                         students,
                         sortName,
                         sortBirth,
                         sortEmail,
                         sortPhone,
                         openEdit,
                         openRemove,
                         sortByName,
                         sortByBirth,
                         sortByEmail,
                         sortByPhone,
                         _DATA
                     }) {

    // Sort icon
    let sortNameIcon;
    let sortBirthIcon;
    let sortEmailIcon;
    let sortPhoneIcon;

    // Student list view
    let studentLists = _DATA.currentData().map(student => <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.birth}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>
            <button type="button"
                    onClick={(event) => openEdit(event, student.id)}
                    className="btn btn-primary btn-sm">Chỉnh sửa
            </button>
            <button type="button"
                    onClick={(event) => openRemove(event, student.id)}
                    className="btn btn-danger btn-sm">Xoá
            </button>
        </td>
    </tr>)

    if (sortName === 'no-order') {
        sortNameIcon = <span>&#160;&#160;<span className="icon">&#8593;&#8595;</span></span>
    }
    if (sortName === 'increase') {
        sortNameIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8593;&#160;</span></span>
    }
    if (sortName === 'decrease') {
        sortNameIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8595;&#160;</span></span>
    }

    if (sortBirth === 'no-order') {
        sortBirthIcon = <span>&#160;&#160;<span className="icon">&#8593;&#8595;</span></span>
    }
    if (sortBirth === 'increase') {
        sortBirthIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8593;&#160;</span></span>
    }
    if (sortBirth === 'decrease') {
        sortBirthIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8595;&#160;</span></span>
    }

    if (sortEmail === 'no-order') {
        sortEmailIcon = <span>&#160;&#160;<span className="icon">&#8593;&#8595;</span></span>
    }
    if (sortEmail === 'increase') {
        sortEmailIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8593;&#160;</span></span>
    }
    if (sortEmail === 'decrease') {
        sortEmailIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8595;&#160;</span></span>
    }

    if (sortPhone === 'no-order') {
        sortPhoneIcon = <span>&#160;&#160;<span className="icon">&#8593;&#8595;</span></span>
    }
    if (sortPhone === 'increase') {
        sortPhoneIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8593;&#160;</span></span>
    }
    if (sortPhone === 'decrease') {
        sortPhoneIcon = <span>&#160;&#160;<span className="icon--selected">&#160;&#8595;&#160;</span></span>
    }


    return (
        <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th>
                    Họ tên
                    <button className="arrow"
                            onClick={() => sortByName()}>
                        {sortNameIcon}
                    </button>
                </th>
                <th>
                    Ngày sinh
                    <button className="arrow"
                            onClick={() => sortByBirth()}>
                        {sortBirthIcon}
                    </button>
                </th>
                <th>
                    Email
                    <button className="arrow"
                            onClick={() => sortByEmail()}>
                        {sortEmailIcon}
                    </button>
                </th>
                <th>
                    Số điện thoại
                    <button className="arrow"
                            onClick={() => sortByPhone()}>
                        {sortPhoneIcon}
                    </button>
                </th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {studentLists}
            </tbody>
        </table>
    );
}

export default ListStudent
