import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSudokuContext } from "./../context/SudokuContext";

export function SudokuModal() {
  const { handleClose, getShowState, handleClick } = useSudokuContext();
  return (
    <Modal show={getShowState()} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Winner!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Congrats! You win!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          New Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
