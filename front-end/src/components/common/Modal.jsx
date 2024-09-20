import Portal from "../../Portal";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal-container bg-white space-y-8  rounded-lg p-8 relative">
          {children}
          <button
            className="absolute top-2 right-2 text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
      ,
    </Portal>
  );
};

export default Modal;
