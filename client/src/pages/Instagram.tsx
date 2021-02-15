import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Table from '../components/Table';

const Label = styled.label`
    margin-right: 5px;
    height:30px;
`

const Input = styled.input`
    width: 300px;
    height: 30px;
    font-size: 20px;
`

const StyledButton = styled(Button)`
    display: inline-block;
`;

export default function Instagram(): ReactElement {

    const [url, setURL] = useState("");

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setURL(e.currentTarget.value);
    }

    const onClickHandler = async () => {

        const comments = await axios.get("/api/comments/test", {
            params: {
                url: url
            }
        });
        console.log(comments.data);
    }

    return (
        <Container className="d-flex justify-content-center">
            <Container className="mt-5">
                <div>
                    <Label>Enter URL:</Label>
                    <Input placeholder="Enter a public instagram url." onChange={onChange}/>
                    <StyledButton onClick={onClickHandler}>Parse Comments</StyledButton>
                </div>
            </Container>
            <Container className="mt-5">
                <Table>
                    <thead>
                        <tr>
                        <th>Month</th>
                        <th>Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>January</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>February</td>
                            <td>$80</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
    )
}
