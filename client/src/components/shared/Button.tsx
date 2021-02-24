import React, { ReactElement } from 'react'
import styled from 'styled-components';

interface Props {
    color?: string,
    onClick?: () => void;
    className?: string;
}
const Container = styled.button`
    position: relative;
    background-color: ${props => props.color || props.theme.primaryColor};
    padding: 10px;
    text-align: center;
    color: white;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    outline: none;

    &:hover {
        filter: brightness(95%);
    }
`

interface Props {
    children: React.ReactNode;
}

export default function Button({children, color, onClick, className}: Props): ReactElement {
    return (
        <Container className={className} color={color} onClick={onClick}>
            {children}
        </Container> 
    )
}
