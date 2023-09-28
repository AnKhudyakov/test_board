import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function Button(props: ButtonProps) {
  const { value, children, ...restProps } = props;
  return (
    <button className={styles.primary} {...restProps}>
      {value}
      {children}
    </button>
  );
}

export default Button;
