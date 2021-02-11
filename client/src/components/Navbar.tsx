import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    padding: 16px 18px 16px 18px;
    border-bottom: 2px solid ${props => props.theme.gray2};
`;

const NavArea = styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    grid-template-areas:
        "brand navitems";
    max-width: ${props => props.theme.contentMaxWidth};
    width: 100%;
`

const NavBrand = styled.div`
    display: grid;
    grid-area: brand;
    font-weight: 600;
    font-size: 2em;
`

const NavItems = styled.div`
    grid-area: navitems;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 50px;
`;

const NavItem = styled(Link)`
    font-weight: 300;
    letter-spacing: 2px;
`;

const Navbar = () => {
    return (
        <Container>
            <NavArea>
                <NavBrand>Instabot</NavBrand>
                <NavItems>
                    <NavItem to="/">Features</NavItem>
                    <NavItem to="/">About</NavItem>
                    <NavItem to="/">Pricing</NavItem>
                </NavItems>
            </NavArea>
        </Container>
    );
}

export default Navbar;
