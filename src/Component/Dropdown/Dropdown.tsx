import React, { FunctionComponent, useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import './Dropdown.scss';

import { IconType } from 'react-icons/lib';
import { JsxElement } from 'typescript';

interface DropdownProps {
    customClass?:string,
    options?:string[],
    placeholder?:string|JSX.Element,
    icons: {
        prefix?: IconType,
        postfix?: IconType,
    }
    defaultValue?:string
    onSelect: (option:string) =>  void,
}
 
const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const [optionSelected, setOptionSelected] = useState(!!props.defaultValue ? props.defaultValue : '');
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    useEffect(()=>{
        !!optionSelected && props.onSelect(optionSelected)
    }, [ optionSelected ]);

    const handleDropDownState = () => {
        setDropdownIsOpen(!dropdownIsOpen)
    };
    const handleOptionChange = (option:string) => {
        setOptionSelected(option);
        handleDropDownState();
    };
    
    return <Row className={`${props.customClass ? props.customClass : ''} dropdown`}>
        <Col className={'dropdownLabel'} onClick={()=>handleDropDownState()}>
            <>
                {
                    !!props.icons.prefix && <props.icons.prefix size={'16px'}/>
                }
                { 
                    !!(props.placeholder && !!!optionSelected) ? props.placeholder : (!!optionSelected && optionSelected) 
                }
                {
                    !!props.icons.postfix && <props.icons.postfix size={'16px'}/>
                }
            </>
        </Col>
        {!!dropdownIsOpen && <Col className='dropdownOptions'>
            {
                props.options?.map((option, index) => {
                    return <Row key={index} onClick={()=>handleOptionChange(option)}
                    className={`${optionSelected === option ? 'selectedOption' : ''} dropdownOption`}>
                        {option}
                    </Row>
                })
            }
        </Col>}
    </Row>;
}
 
export default Dropdown;
