import React, { ReactElement } from 'react';
import {FlashingInput} from '../all';

interface Props {
    onInput: (event: React.FormEvent<HTMLSpanElement>) => void;
}
export default function TagNUser({onInput}: Props): ReactElement {
    return (
        <div>
            Tag <FlashingInput onInput={onInput}/> Users
        </div>
    )
}
