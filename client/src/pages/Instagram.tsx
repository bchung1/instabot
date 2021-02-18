import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Table from '../components/Table';
import Dropdown from '../components/Dropdown';

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
    const [comments, setComments] = useState([]);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setURL(e.currentTarget.value);
    }

    const onClickHandler = async () => {

        let comments = await axios.get("/api/comments/test", {
            params: {
                url: url
            }
        });
        setComments(comments.data);
    }

    const headers = [
        "username",
        "comment"
    ]

    const options = [
        "Follow User",
        "Tag N number of people in post"
    ]

    return (
        <Container className="d-flex justify-content-center">
            <Container className="mt-5 d-flex justify-content-center">
                <div>
                    <Label>Enter URL:</Label>
                    <Input placeholder="Enter a public instagram url." onChange={onChange}/>
                    <StyledButton onClick={onClickHandler}>Parse Comments</StyledButton>
                </div>
            </Container>
            <Dropdown className="mt-3" title="Select Criteria" options={options} />
            {/* <Container className="mt-5 d-flex justify-content-center">
                <Table headers={headers} rows={comments}/>
            </Container> */}
        </Container>
    )
}

