import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface Props {
    title: string;
    options: {
        key: string,
        value: string,
        max: number
    }[],
    className?: string;
    itemSelectHandler?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => void)
}

const DropdownItem = styled.div`
    font-size: 0.9em;
    padding: 10px;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: ${props => props.theme.gray2};
    }
`

const DropdownList = styled.div<{showMenu: boolean}>`
    position: absolute;
    background-color: white;
    border: 1px solid ${props => props.theme.gray2};
    border-radius: 6px;
    display: ${props => (props.showMenu) ? "block" : "none"};
    width: 100%;
    z-index: 1;
`

const DropdownSelect = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    position: relative;
    width: 100%;
    min-width: 400px;
`

type Count = {
    [key: string]: number
}

export default function Dropdown({title, options, className, itemSelectHandler}: Props): ReactElement {

    const [counters, setCounters] = useState<Count>({});

    const [showMenu, setShowMenu] = useState(false);

    const _itemSelectHandler = (key: string) => {
        let count = counters[key] || 0;
        setCounters({
            ...counters,
            [key]: count + 1
        })
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const dropdownItems = options
        .filter(({key, max}) => counters[key] ? counters[key] < max : true)
        .map(({key, value, max}) => {
            return (
                <DropdownItem
                    key={key}
                    onClick={(e) => {
                        toggleMenu();
                        _itemSelectHandler(key);
                        itemSelectHandler && itemSelectHandler(e, key);
                    }}
                    >
                        {value}
                    <div className="ml-auto">Max: {max}</div>
                </DropdownItem>
            )
        })

    return (
        <StyledDropdown className={className}>
            <DropdownSelect onClick={toggleMenu}>
                <span>{title}</span>
                <i className="lni lni-chevron-down"></i>
            </DropdownSelect>
            <DropdownList showMenu={showMenu}>
                {dropdownItems}
            </DropdownList>
        </StyledDropdown>
    )
}
 