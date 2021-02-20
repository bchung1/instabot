import React, { ReactElement } from 'react';
import {FlashingInput} from '../all';

interface Props {
    
}

export default function FollowUser({}: Props): ReactElement {
    return (
        <div>
            Follow @<FlashingInput/>
        </div>
    )
}
