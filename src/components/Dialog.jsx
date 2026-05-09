import css from './Dialog.module.css';
import IconButton from './subcomponents/Button';

const Dialog = () => {
    return (
        <dialog id="dialog" className={css.dialog}>
            <div id={css.dialogContainer}>
                <div id={css.newCustomerContainer} className={css.imageContainer}/>
                <div id={css.addJobContainer} className={css.imageContainer}/>
                <div id={css.estimateDetailsContainer} className={css.imageContainer}/>
            </div>

            <div id={css.closeButtonContainer}>
                <IconButton
                    id={css.closeButton}
                    commandfor="dialog"
                    command="close"
                >
                    Close
                </IconButton>
            </div>
        </dialog>
    );
};

export default Dialog;