import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    getValue: (value: string) => void;
    html: string;
}

const StyledInput = styled.input`
    width: 2.5em;
`

export default function TagNUser({getValue, html}: Props): ReactElement {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.currentTarget.value;
        getValue(text);
    }

    return (
        <div>
            Tag <StyledInput onChange={onChange} value={html} type="number"/> Users
        </div>
    )
}
