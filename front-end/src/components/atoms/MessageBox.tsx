import React from "react";
import TransmissionTime from "src/components/atoms/TransmissionTime";
import styled from "styled-components";

export interface MessageBoxProps extends React.Props<{}> {
    position: "left" | "right";
    date: number;
}

export default (
    {
        position = "left",
        children,
        date,
        ...props
    }: MessageBoxProps
) => (
    <Host
        position={position}
    >
        <ArrowBox
            {...props}
            ref={props.ref as any}
        >
            {children}
        </ArrowBox>
        <TransmissionTime
            date={date}
        />
    </Host>
);

const Host = styled.div<{ position: "left" | "right" }>`
    display: flex;
    flex-direction: ${props => props.position === "left"  ? "row"        : "row-reverse"};
    align-self    : ${props => props.position === "left"  ? "flex-start" : "flex-end"};
    margin-left   : ${props => props.position === "left"  ? "1rem"       : "0"};
    margin-right  : ${props => props.position === "right" ? "1rem"       : "0"};

    > :nth-child(1):before,
    > :nth-child(1):after {
        border-right-color: ${props => props.position === "left"  ? "inherit" : "none"};
        right             : ${props => props.position === "left"  ? "100%"    : "initial"};
        top               : ${props => props.position === "left"  ? "1rem"    : "initial"};
        border-left-color : ${props => props.position === "right" ? "inherit" : "none"};
        left              : ${props => props.position === "right" ? "100%"    : "initial"};
        top               : ${props => props.position === "right" ? "1rem"    : "initial"};
    }

    > :nth-child(2) {
        align-self: flex-end;
    }
`;

const ArrowBox = styled.div`
    position      : relative;
    background    : rgb(255, 145, 0);
    border        : 1px solid #bfbfbf;
    border-radius : 8px;
    height        : min-content;
    :hover {
        background: #F06D08;
    }
    :after,
    :before {
        border         : solid transparent;
        content        : " ";
        height         : 0;
        width          : 0;
        position       : absolute;
        pointer-events : none;
    }
    :after {
        border-color : rgba(136, 183, 213, 0);
        border-width : .35rem;
        margin-top   : -4px;
    }

    :before {
        border-color : rgba(194, 225, 245, 0);
        border-width : .4rem;
        margin-top   : -5px;
    }
`;
