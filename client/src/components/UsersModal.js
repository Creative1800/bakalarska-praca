import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../styles/App.css';
import { FaUser } from "react-icons/fa";

function UsersModal(props) {
  const {activeStudents, ...restProps} = props;

  const activeStudent = activeStudents.map(item => {
    return (
      <h4 key={item}>
        <FaUser className='active--user--icon' /> 
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </h4>
    )
  })

  return (
    <Modal
      {...restProps}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="users--modal"
      centered
    >
      <Modal.Header className="users--modal--header" closeButton closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">
          Zoznam všetkých aktívnych študentov
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="users--modal--body">
        {activeStudent}
      </Modal.Body>
      <Modal.Footer>
        <Button className="closeButton" onClick={props.onHide}>Zavrieť</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UsersModal