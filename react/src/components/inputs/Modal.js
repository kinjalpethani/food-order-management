import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/slices/cartSlice";

export const Modal = ({children, open}) => {
    const dialog = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const dialogElement = dialog.current;

        if (open) {
            dialogElement.showModal();
        }
        const handleClose = () => {
            dispatch(cartActions.hideModal());
        }
        dialogElement.addEventListener('close', handleClose);

        return () => dialogElement.removeEventListener('close', handleClose);
    }, [open, dispatch]);

    return createPortal(
        <dialog ref={dialog} className="custom-dialog">{children}</dialog>,
        document.getElementById('modal')
    );
}