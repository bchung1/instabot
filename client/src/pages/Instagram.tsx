import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import {
    Dropdown,
    Container,
    FollowUser,
    TagNUser,
    CommentPost,
    List,
    ListItem,
    Button
} from '../components/all';
import { v4 as uuidv4 } from 'uuid';

const Title = styled.div`
    font-size: 2em;
`

const MinusIcon = styled.i`
    color: red;
`;

type CriteriaComponent = (
    typeof FollowUser |
    typeof TagNUser |
    typeof CommentPost
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

    const [criteria, setCriteria] = useState<Criteria[]>([]);

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
        }
    }

    const onCriteriaChange = (newValue: string, id: string) => {
        let copy = [...criteria];
        let index = copy.findIndex(obj => obj.id === id);
        copy[index].value = newValue;
        setCriteria(copy);
    }

    const criteriaDeleteHandler = (key: string) => {
        const newCriteria = criteria.filter(c => c.id !== key);
        setCriteria(newCriteria);
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
        }
    ]

    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Title className="m-5 text-center">Enter Filter Criteria</Title>
                <div>
                    <Dropdown
                        className="mt-5"
                        title="Add Criteria"
                        itemSelectHandler={addCriteria}
                        options={criteriaOptions.map(criteria => {
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
                                        <MinusIcon className="lni lni-circle-minus ml-auto" onClick={() => {criteriaDeleteHandler(criteria.id)}}></MinusIcon>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <Button className="mt-5" onClick={() => console.log(criteria)}>Log State</Button>
            </Container>
        </div>
    )
}

