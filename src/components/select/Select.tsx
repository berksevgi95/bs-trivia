import React, {
    useState
} from 'react';

import './Select.scss'

interface IOption<T> {
    value: T,
    label: string,
}

interface ISelectProps<T> {
    options: IOption<T>[],
    value: any,
    onClick: (value: any, e: any) => void,
    className?: string
}

const Select: React.FC<ISelectProps<any>> = ({
    options,
    value,
    onClick,
    className,
}) => {

    const ref = React.useRef<any>();
    const [expanded, setExpanded] = useState();

    const handleOnClick = () => {
        setExpanded(!expanded);
    }
    
    const handleClickOutside = (e: any) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setExpanded(false)
        }
    }

    const handleOnOptionClick = (option: any) => (e: any) => {
        onClick(option, e);
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <div ref={ref} className={`bs bs-select ${className || ''}`} onClick={handleOnClick}>
            {options && options.length > 0 && options.filter((option : any) => option.value === value)[0].label}
            {expanded && (
                <ul className="bs-options">
                    {options && options.length > 0 && options.map((option: any) => (
                        <li
                            value={option.value}
                            className="bs-option"
                            key={option.value}
                            onClick={handleOnOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Select;
