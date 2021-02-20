import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
    Button,
    // Table,
    Dropdown,
    Container,
    FlashingInput
} from '../components/all';

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

const Title = styled.div`
    font-size: 2em;
`

const CriteriaList = styled.div`
    // width: 100%;
    // background-color white;
    // border-radius: 5px;
    // min-height: 500px;
    // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const Criteria = styled.div`
    padding: 10px;
    margin-bottom: 15px;
    font-size: 1.5em;
    background-color white;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

interface CriteriaInterface {
    text: string,
    comp: React.ReactElement
}

export default function Instagram(): ReactElement {

    const [url, setURL] = useState("");
    const [criteria, setCriteria] = useState([]);
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

    const itemSelectHandler = (e: React.MouseEvent<HTMLDivElement>) => {

    }

    const headers = [
        "username",
        "comment"
    ]

    const criteriaOptions = [
        "Follow User",
        "Tag N number of people in post"
    ]

    return (
        <div className="d-flex justify-content-center">
            <Container>
                    {/* <div className="mt-5 d-flex justify-content-center">
                    <div>
                        <Label>Enter URL:</Label>
                        <Input placeholder="Enter a public instagram url." onChange={onChange}/>
                        <StyledButton onClick={onClickHandler}>Parse Comments</StyledButton>
                    </div>
                </div> */}
                <Title className="m-5 text-center">Fill out automation criteria.</Title>
                <div>
                    <Dropdown
                        className="mt-5"
                        title="Add Criteria"
                        itemSelectHandler={itemSelectHandler}
                        options={criteriaOptions}
                        />
                    <CriteriaList className="mt-5">
                        {
                            criteriaOptions.map((criteria, key) => {
                                <Criteria key={key}>
                                    {criteria}
                                </Criteria>
                            })
                        }
                    </CriteriaList>
                </div>

                {/* <Container className="mt-5 d-flex justify-content-center">
                    <Table headers={headers} rows={comments}/>
                </Container> */}
            </Container>
        </div>
    )
}

