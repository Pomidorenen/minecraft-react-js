import ReactDOM from 'react-dom';
import styles from "./UI.module.scss";

const portal = document.getElementById('ui');

const UI = ({visible=true,children})=>{
    return ReactDOM.createPortal(
        (visible)?<div className={styles.container}>
            {children}
        </div>:<></>,
        portal
    )
};

export default UI;