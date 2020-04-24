import React from 'react'
import './Radiobutton.scss'

interface IRadiobuttonProps {
    label: string,
    value?: any,
    onChange: (e: any) => void,
    defaultChecked? : boolean,
    checked: boolean,
}

const Radiobutton: React.FC<IRadiobuttonProps> = ({
    label,
    value,
    onChange,
    defaultChecked,
    checked,
})=> {

    const [id] = React.useState('bs-radio' + Math.floor(Math.random() * (1000 + 1)));

    const handleChange = (value: any) => () => {
        onChange(value)
    }

    return (
        <label className="bs bs-radio" htmlFor={id}>
            <input
                id={id}
                name="name"
                type="radio"
                value={value}
                onChange={handleChange(value)}
                defaultChecked={defaultChecked}
                checked={checked}
            />
            {label}
        </label>
    )
}

export default Radiobutton;