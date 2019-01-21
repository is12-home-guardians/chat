import styled from "styled-components";

export default styled.button<{ color?: string }>`
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    background: #f7f7f7;
    border-left: solid 6px #ff7c5c;
    color: ${props => props.color ? props.color : "#ff7c5c"};
    font-weight: bold;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    :active {
        box-shadow: inset 0 0 2px rgba(128, 128, 128, 0.1);
        transform: translateY(2px);
    }
`;
