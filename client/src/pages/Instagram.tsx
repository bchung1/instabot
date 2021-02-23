import React, { ReactElement, useState, useRef } from 'react';
import styled from 'styled-components';
import {
    Dropdown,
    Container,
    FollowUser,
    TagNUser,
    List,
    ListItem,
    Button
} from '../components/all';
import { v4 as uuidv4 } from 'uuid';

const Title = styled.div`
    font-size: 2em;
`

type CriteriaComponent = (
    typeof FollowUser |
    typeof TagNUser
)

type Criteria = {
    id: string;
    templateID: string;
    dropdownText: string;
    value?: string;
    comp: CriteriaComponent;
}

export default function Instagram(): ReactElement {

    const values: string[] = [];

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

    const onCriteriaChange = (event: React.FormEvent<HTMLSpanElement>, id: string) => {
        // let copy = [...criteria];
        // let index = copy.findIndex(obj => obj.id === id);
        const text = event.currentTarget.innerText;
        // copy[index].value = text;
        // setCriteria(copy);
    }

    const criteriaDeleteHandler = (key: string) => {
        const newCriteria = criteria.filter(c => c.id !== key);
        setCriteria(newCriteria);
    }

    const criteriaOptions: Criteria[] = [
        {
            id: "",
            templateID: "follow-id",
            dropdownText: "Follow User",
            comp: FollowUser
        },
        {
            id: "",
            templateID: "tag-id",
            dropdownText: "Tag N number of people in post",
            comp: TagNUser
        }
    ]

    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Title className="m-5 text-center">Fill out automation criteria.</Title>
                <div>
                    <Dropdown
                        className="mt-5"
                        title="Add Criteria"
                        itemSelectHandler={addCriteria}
                        options={criteriaOptions.map(criteria => {
                            return {
                                key: criteria.templateID,
                                value: criteria.dropdownText
                            }
                        })}
                        />
                    <List className="mt-5">
                        {
                            criteria.map((criteria, index) => {
                                return (
                                    <ListItem className="d-flex align-items-center" key={criteria.id}>
                                        <span className="mr-3">{index + 1}.</span>
                                        {<criteria.comp onInput={e => onCriteriaChange(e, criteria.id)} />}
                                        <i className="lni lni-circle-minus ml-auto" onClick={() => {criteriaDeleteHandler(criteria.id)}}></i>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <Button onClick={() => console.log(criteria)}>Log State</Button>
            </Container>
        </div>
    )
}

