import React from "react";
import styled from "styled-components";

export interface ListProps extends React.Props<{}> {
    orientation: "vertical" | "horizontal";
}

export default (
    {
        orientation = "vertical",
        ...props
    }: ListProps
) => (
    <Host
        orientation={orientation}
        {...props}
        ref={props.ref as any}
    />
);

const Host = styled.ul<{ orientation: "vertical" | "horizontal" }>`
    display: flex;
    flex-direction: ${props => props.orientation === "vertical" ? "column" : "row"};
`;
