import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
    Dropdown,
    Container,
    FollowUser,
    TagNUser,
    CommentPost,
    LikePost,
    List,
    ListItem,
    Button,
    TextInput
} from '../components/all';
import { v4 as uuidv4 } from 'uuid';

const StyledContainer = styled(Container)`
    border-radius: 10px;
    padding: 30px;
    background-color: white;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Title = styled.div`
    font-size: 2em;
`

const MinusIcon = styled.i`
    color: red;
`;

type CriteriaComponent = (
    typeof FollowUser |
    typeof TagNUser |
    typeof CommentPost |
    typeof LikePost
)

type Criteria = {
    id: string;
    templateID: string;
    dropdownText: string;
    value: string;
    max: number;
    comp: CriteriaComponent;
}

export default function Instagram(): ReactElement {

    const [url, setURL] = useState("");

    const [criteria, setCriteria] = useState<Criteria[]>([]);

    const [counters, setCounters] = useState<{[key: string]: number}>({});

    const addCriteria = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
        const selectedCriteria = criteriaOptions.find(criteria => criteria.templateID === key);
        if (selectedCriteria){
            setCriteria([
                ...criteria,
                {
                    ...selectedCriteria,
                    id: uuidv4()
                }
            ])
            
            let templateID = selectedCriteria.templateID;
            let count = counters[templateID] || 0;
            setCounters({
                ...counters,
                [templateID]: count + 1
            })
        }
    }

    const onCriteriaChange = (newValue: string, id: string) => {
        let copy = [...criteria];
        let index = copy.findIndex(obj => obj.id === id);
        copy[index].value = newValue;
        setCriteria(copy);
    }

    const criteriaDeleteHandler = (key: string) => {
        // remove criteria
        let _criteria = [...criteria];
        const idx = _criteria.findIndex(c => c.id === key);
        let removedCriteria = _criteria.splice(idx, 1);
        setCriteria(_criteria);

        // decrement criteria count
        let templateID = removedCriteria[0].templateID;
        let currentCount = counters[templateID];
        setCounters({
            ...counters,
            [templateID]: currentCount - 1
        })
    }

    const onURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setURL(event.currentTarget.value);
    }

    const sendCriteria = async () => {
        console.log(url);
        console.log(criteria);
        let data = {
            criteria: criteria,
            url: url
        }
        axios.post("/api/criteria", data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    const criteriaOptions: Criteria[] = [
        {
            id: "",
            value: "",
            templateID: "follow",
            dropdownText: "Follow User",
            max: Infinity,
            comp: FollowUser
        },
        {
            id: "",
            value: "",
            templateID: "tag",
            dropdownText: "Tag N number of people in post",
            max: 1,
            comp: TagNUser
        },
        {
            id: "",
            value: "",
            templateID: "comment",
            dropdownText: "Leave Comment",
            max: 1,
            comp: CommentPost
        },{
            id: "",
            value: "",
            templateID: "like",
            dropdownText: "Like Post",
            max: 1,
            comp: LikePost
        }
    ]
    
    return (
        <div className="d-flex justify-content-center">
            <StyledContainer className="mt-5">
                <Title className="m-5 text-center">Enter Filter Criteria</Title>
                <div className="d-flex justify-content-center align-items-center">
                    Instagram Post: <TextInput className="ml-1" onChange={onURLChange} value={url}/>
                </div>
                <div>
                    <Dropdown
                        className="mt-5"
                        title="Add Criteria"
                        itemSelectHandler={addCriteria}
                        options={criteriaOptions
                            .filter(({max, templateID}) => counters[templateID] ? counters[templateID] < max : true)
                            .map(criteria => {
                            return {
                                key: criteria.templateID,
                                value: criteria.dropdownText,
                                max: criteria.max
                            }
                        })}
                        />
                    <List className="mt-5">
                        {
                            criteria.map((criteria, index) => {
                                return (
                                    <ListItem className="d-flex align-items-center" key={criteria.id}>
                                        <span className="mr-3">{index + 1}.</span>
                                        {<criteria.comp html={criteria.value} getValue={value => onCriteriaChange(value, criteria.id)} />}
                                        <MinusIcon
                                            className="lni lni-circle-minus ml-auto"
                                            onClick={() => {
                                                criteriaDeleteHandler(criteria.id);
                                            }}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                {/* <Button className="mt-5" onClick={() => console.log(criteria)}>Log State</Button> */}
                <div className="d-flex justify-content-center">
                    <Button onClick={sendCriteria} className="mt-5">Filter Post</Button>
                </div>
            </StyledContainer>
        </div>
    )
}

