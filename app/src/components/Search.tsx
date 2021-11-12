import React from 'react'

interface Props {
    value: string
    className?: string
    placeholder?: string
    onChange: (value: string) => void
    onSubmit?: (value: string) => void
}

export const SearchInput: React.FC<Props> = props => {
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === "Enter" && props.onSubmit) {
            props.onSubmit(props.value)
        }
    }

    return (
        <input
            type="text"
            value={props.value}
            autoComplete="none"
            onKeyDown={onKeyDown}
            className={props.className}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder}
        />
    )
}

SearchInput.defaultProps = {
    className: "",
    placeholder: ""
}