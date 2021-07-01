import styles from './InputError.module.scss';

export default function InputError(props) {
    return <p className={styles.error + ' has-text-danger'} role="alert">{props.text}</p>
}
