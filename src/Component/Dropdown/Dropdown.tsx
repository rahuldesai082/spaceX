import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import './Dropdown.scss';

import { IconType } from 'react-icons/lib';
import { dropdownOption } from '../../Utils/Interface';

interface DropdownProps {
    customClass?:string,
    options:dropdownOption[],
    placeholder?:string|JSX.Element,
    icons: {
        prefix?: IconType,
        postfix?: IconType,
    }
    defaultValue?:dropdownOption,
    queryKey?:string
    onSelect: (option: dropdownOption, key?:string) =>  void,
}
 
const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const [optionSelected, setOptionSelected] = useState<dropdownOption|null>(props.defaultValue || null);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    
    const dropdownRef:React.RefObject<any> = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const handleSelectEffect = useCallback((option:dropdownOption) => {
        !!optionSelected && props.onSelect(optionSelected || props.options[0], props.queryKey);
    },[optionSelected]);

    useEffect(() => {
        handleSelectEffect(optionSelected || props.options[0]);
    }, [handleSelectEffect]);

    const handleDropDownState = () => {
        setDropdownIsOpen(!dropdownIsOpen)
    };
    const handleOptionChange = (option:dropdownOption) => {
        setOptionSelected(()=>option);
        handleDropDownState();
    };
    
    return <Row className={`${props.customClass ? props.customClass : ''} dropdown`} ref={dropdownRef}>
        <Col className={'dropdownLabel'} onClick={()=>handleDropDownState()}>
            <>
                {
                    !!props.icons.prefix && <props.icons.prefix size={'16px'}/>
                }
                { 
                    !!(props.placeholder && !!!optionSelected) ? props.placeholder : (!!optionSelected && optionSelected.optionLabel) 
                }
                {
                    !!props.icons.postfix && <props.icons.postfix size={'16px'}/>
                }
            </>
        </Col>
        {!!dropdownIsOpen && <Col className='dropdownOptions'>
            {
                props.options?.map((option:dropdownOption, index:number) => {
                    return <Row key={option.optionValue} onClick={()=>handleOptionChange(option)}
                    className={`${optionSelected?.optionValue === option?.optionValue ? 'selectedOption' : ''} dropdownOption`}>
                        {option.optionLabel}
                    </Row>
                })
            }
        </Col>}
    </Row>;
}
 
export default Dropdown;
