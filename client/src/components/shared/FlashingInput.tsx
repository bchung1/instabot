import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';

interface Props {
    onInput: (event: React.FormEvent<HTMLSpanElement>) => void;
    value?: string;
}

const StyledFlashingInput = styled.span`
    color: black;
    border: 1px solid ${props => props.theme.gray4};
    padding: 1px 8px 1px 8px;
`;

export default function FlashingInput({onInput}: Props): ReactElement {

    const ref: React.RefObject<HTMLSpanElement> = useRef(null);

    return (
        <StyledFlashingInput
            onInput={onInput}
            contentEditable
            role="textbox"
            suppressContentEditableWarning={true}
            ref={ref}
            >
            { ref && ref.current ? ref.current.innerText : ""}
        </StyledFlashingInput>
    )
}