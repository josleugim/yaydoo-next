import styles from './InputLabel.module.scss';

export default function InputLabel(props) {
    return <label className={styles.label}>{props.text}</label>
}
