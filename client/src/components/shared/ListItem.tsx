import styled from 'styled-components';

export default styled.div`
    padding: 10px;
    margin-bottom: 15px;
    font-size: 1.5em;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.gray2};

    i {
        cursor: pointer;
    }
`