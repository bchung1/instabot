import React, { ReactElement } from 'react';
import {FlashingInput} from '../all';

interface Props {
    onInput: (event: React.FormEvent<HTMLSpanElement>) => void;
}

export default function FollowUser({onInput}: Props): ReactElement {
    return (
        <div>
            Follow @<FlashingInput onInput={onInput} />
        </div>
    )
}
