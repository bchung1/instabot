import React, { ReactElement } from 'react';
import styled from 'styled-components';

type TableRow = {
    [key: string]: string | number
}

interface Props {
    headers: string[]
    rows: TableRow[]
}

const Cell = styled.div`
    border: solid 1px ${props => props.theme.gray1};
`

const Container = styled.div`
    table, th, td {
        border: 1px solid black;
    }
`

export default function Table({headers, rows}: Props): ReactElement {

    const renderHeadingRow = (header: string, key: number) => {
        return (
            <th key={key}>{header}</th>
        )
    }

    const renderCols = (row: TableRow) => {
        return (
            headers.map((header, index) => 
                <td key={index}>{row[header]}</td>
            )
        )
    }

    const renderRow = (row: TableRow, key: number) => {
        return (
            <tr key={key}>
                {renderCols(row)}
            </tr>
        )
    }

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => renderHeadingRow(header, index))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => renderRow(row, index))}
                </tbody>
            </table>
        </Container>
    )
}
