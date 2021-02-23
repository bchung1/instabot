import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const StyledContainer = styled.div`
    @media (min-width: ${props  => props.theme.breakpoints.sm}){
        max-width: ${props => props.theme.breakpoints.sm}
    }

    @media (min-width: ${props => props.theme.breakpoints.md}){
        max-width: ${props => props.theme.breakpoints.md}   
    }

    @media (min-width: ${props => props.theme.breakpoints.lg}){
        max-width: ${props => props.theme.breakpoints.lg}   
    }

    @media (min-width: ${props => props.theme.breakpoints.xl}){
        max-width: ${props => props.theme.breakpoints.xl}   
    }
`

export default function Container({children, className}: Props): ReactElement {
    return (
        <StyledContainer className={className}>
            {children}
        </StyledContainer>
    )
}
