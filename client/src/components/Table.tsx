import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    children?: React.ReactNode
}

const StyledTable = styled.table`
    thead {

    }

    tbody {

    }

    th {

    }

    tr {

    }

    td {

    }
`


export default function Table({children}: Props): ReactElement {
    return (
        <StyledTable>{children}</StyledTable>
    )
}
