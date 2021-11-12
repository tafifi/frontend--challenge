import './Button.scss'
import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export const Button: React.FC<Props> = ({ loading, children, className, ...rest }) => {
    return (
        <button {...rest} className={`button ${loading ? 'loading' : 'default'} ${className}`}>
            <i className="button-spinner" />
            <span>{children}</span>
        </button>
    )
}