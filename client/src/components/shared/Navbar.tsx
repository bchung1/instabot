import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from './Button';

const StyledLink  = styled(Link)`
    text-decoration: none;

    &:hover {
        color: inherit;
        text-decoration: none;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    padding: 16px 18px 16px 18px;
    border-bottom: 2px solid ${props => props.theme.gray2};
`;

const NavArea = styled.div`
    display: grid;
    grid-template-columns: 40% 40% 20%;
    grid-template-areas:
        "brand navitems login";
    max-width: ${props => props.theme.contentMaxWidth};
    width: 100%;
`

const NavBrand = styled(StyledLink)`
    display: grid;
    grid-area: brand;
    font-weight: 600;
    font-size: 2em;
    color: 	#000000;
`

const NavItems = styled.div`
    grid-area: navitems;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 50px;
`;

const NavItem = styled(StyledLink)`
    position: relative;
    font-weight: 300;
    letter-spacing: 2px;
    color: 	#000000;

    &:after {
        position: absolute;
        content: '';
        left: 0;
        bottom: -5px;
        width: 0;
        height: 4px;
        background-color: ${props => props.theme.primaryColor};
        transition: width 0.3s;
    }

    &:hover:after {
        width: 100%;
    }
`;

const LoginArea = styled.div`
    grid-area: login;
    display: flex;
    justify-content: flex-end;
`

export default function Navbar(): ReactElement {
    return (
        <Container>
            <NavArea>

                <NavBrand to="/">Instabot</NavBrand>
                <NavItems>
                    <NavItem to="/instagram">Demo</NavItem>
                    <NavItem to="/">Features</NavItem>
                    <NavItem to="/">About</NavItem>
                    <NavItem to="/">Pricing</NavItem>
                </NavItems>
                <LoginArea>
                    <Button>Log In</Button>
                    <Button>Sign Up</Button>
                </LoginArea>
            </NavArea>
        </Container>
    );
}