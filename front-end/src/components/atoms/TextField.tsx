import React from "react";
import styled from "styled-components";

export interface TextFieldProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    disabled?: boolean;
    labelText?: string;
    name?: string;
    inputRef: string | ((instance: HTMLTextAreaElement | null) => void) | React.RefObject<HTMLTextAreaElement> | null | undefined;
    id?: string;
}

export default (
    {
        labelText,
        name,
        id = name,
        inputRef,
        ...props
    }: TextFieldProps
) => (
    <Host>
        <label
            htmlFor={id}
        >
            <span>
                {labelText}
            </span>
        </label>
        <textarea
            id={id}
            name={name}
            ref={inputRef}
            {...props}
        />
    </Host>
);

const Host = styled.div``;
