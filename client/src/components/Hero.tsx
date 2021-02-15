import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.primaryColor};
    min-height: 500px;
`

const Content = styled.div`
    text-align: center;
    max-width: 800px;
    margin: 20px;
    padding: 40px;
`

const Title = styled.h1`
    font-size: 2em;
`

const Subtitle = styled.p`
    font-size: 1em;
`

interface Props {
    title: string;
    subtitle: string;
}

export default function Hero({title, subtitle}: Props) {
    return (
        <Container>
            <Content>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Content>
        </Container>
    );
}
