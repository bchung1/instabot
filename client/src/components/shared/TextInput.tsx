import styled from 'styled-components';

export default styled.input.attrs(props => ({
    type: "text"
}))`
    width: 300px;
    border: solid 1px ${props => props.theme.gray4}
    padding: 1px 8px 1px 8px;
`