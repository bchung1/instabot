import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface Props {
}

const StyledFlashingInput = styled.span`
    color: black;
    border: 1px solid ${props => props.theme.gray4};
    padding: 1px 8px 1px 8px;
`;

export default function FlashingInput({}: Props): ReactElement {

    return (
        <StyledFlashingInput contentEditable role="textbox">
        </StyledFlashingInput>
    )
}
