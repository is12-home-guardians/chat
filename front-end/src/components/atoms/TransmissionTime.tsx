import React from "react";
import styled from "styled-components";

export interface TransmissionTimeProps extends React.Props<{}> {
    date: number;
}

export default (
    {
        date,
        ...props
    }: TransmissionTimeProps
) => {
    const _date = date ? new Date(date) : new Date();
    const today = new Date();

    const month = _date.getMonth() + 1;
    const day   = _date.getDate();
    const hour  = _date.getHours() < 10 ? `0${_date.getHours()}` : _date.getHours();
    const min   = _date.getMinutes() < 10 ? `0${_date.getMinutes()}` : _date.getMinutes();

    let result = `${month}/${day} ${hour}:${min}`;

    if (
        today.getFullYear() === _date.getFullYear()
     && today.getMonth() === _date.getMonth()
     && today.getDate() === _date.getDate()
    ) {
        result =  `${hour}:${min}`;
    }

    return (
        <Host
            {...props}
            ref={props.ref as any}
        >
            {result}
        </Host>
    );
};

const Host = styled.p`
    color     : #555;
    font-size : 10px;
    margin    : 0 4px;
`;
