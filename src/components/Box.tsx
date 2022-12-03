import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

type BoxProps = {
  i: number;
  index: number;
  GAME_BOARD: number[][];
  NEW_BOARD: number[][];
  changeErrors: (params: number) => void;
  errors: number;
};

export function Box({
  i,
  index,
  GAME_BOARD,
  NEW_BOARD,
  changeErrors,
  errors,
}: BoxProps) {
  let colorLetter = "black";
  const [buttonValue, changeButtonValue] = useState(i);
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }
  const handleShow = () => setShow(true);
  function handleClick(i: number): void {}
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (Number(e.currentTarget.value) !== NEW_BOARD.flat()[index]) {
      // changeErrors((errors += 1));
    }
    changeButtonValue(Number(e.currentTarget.value));
  }
  return (
    <>
      <Button
        variant={i === 0 ? "outline-dark" : "dark"}
        style={{
          height: "48px",
          width: "48px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
        onClick={handleShow}
      >
        {buttonValue === 0 ? "" : buttonValue}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={buttonValue}
              placeholder="name input"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
