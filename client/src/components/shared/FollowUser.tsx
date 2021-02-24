import React, { ReactElement } from 'react';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import styled from 'styled-components';

interface Props {
    getValue: (value: string) => void;
    html: string;
}

const StyledContentEditable = styled(ContentEditable)`
    padding: 1px 8px 1px 8px;
    border: 1px solid ${props => props.theme.gray4};
`

export default function FollowUser({getValue, html}: Props): ReactElement {

    const onChange = (event: ContentEditableEvent) => {
        const value = event.currentTarget.innerText;
        getValue(value);
    }

    return (
        <div>
            Follow @<StyledContentEditable onChange={onChange} html={html} tagName="span" />
        </div>
    ) 
}
