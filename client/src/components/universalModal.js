import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../styles/App.css';
import { FaUser } from "react-icons/fa";

function UsersModal(props) {
  const {activeStudents, ...restProps} = props;

  return (
    <Modal
      {...restProps}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="users--modal"
      centered
    >
      <Modal.Header className="users--modal--header" closeButton closeVariant="white">
      </Modal.Header>
      <Modal.Body className={`modal--body ${props.color}`}>
        {props.message}
      </Modal.Body>
    </Modal>
  );
}

export default UsersModal