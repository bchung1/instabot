import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface Props {
    title: string;
    options: string[];
    className?: string;
}

const DropdownItem = styled.div`
    font-size: 0.9em;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.gray2};
    }
`

const DropdownList = styled.div<{showMenu: boolean}>`
    background-color: white;
    border: 1px solid ${props => props.theme.gray2};
    border-radius: 6px;
    display: ${props => (props.showMenu) ? "block" : "none"};
`

const DropdownSelect = styled.div`
    background-color: white;
    border: 1px solid ${props => props.theme.gray2};
    border-radius: 6px;
    padding: 8px;
    cursor: pointer;
    font-size: 1.1em;

    &:hover {
        border: 1px solid ${props => props.theme.gray5};
    }
`

const StyledDropdown = styled.div`
    width: 100%;
`

export default function Dropdown({title, options, className}: Props): ReactElement {

    const [showMenu, setShowMenu] = useState(false);

    const onDropdownSelectHandler = () => {
        setShowMenu(!showMenu);
    }

    const onDropdownItemHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowMenu(!showMenu);

        console.log(`Clicked option ${e.currentTarget.innerText}`)
    }

    return (
        <StyledDropdown className={className}>
            <DropdownSelect onClick={onDropdownSelectHandler}>
                <span>{title}</span>
            </DropdownSelect>
            <DropdownList showMenu={showMenu}>
                {options.map((option: string) => <DropdownItem onClick={onDropdownItemHandler}>{option}</DropdownItem> )}
            </DropdownList>
        </StyledDropdown>
    )
}
