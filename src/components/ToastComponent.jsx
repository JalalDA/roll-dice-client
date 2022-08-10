import Toast from 'react-bootstrap/Toast';

function ToastComponent({header, title, message, showToast, setShowToast}) {
  return (
    <Toast show={showToast} onClose={()=>{
      setShowToast(false)
    }}>
      <Toast.Header>
        <strong className="me-auto">{header}</strong>
        <small>{title}</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastComponent