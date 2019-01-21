import React from "react";
import MessageBox from "src/components/atoms/MessageBox";
import MessageText from "src/components/atoms/MessageText";
import UserContext from "src/contexts/UserContext";
import { Chat } from "src/types/model";
import styled from "styled-components";

export interface MessageLogProps extends React.Props<{}> {
    chatList: Chat[];
}

export default class extends React.Component<MessageLogProps, {}> {

    hostRef: React.RefObject<HTMLDivElement>;
    constructor(props: MessageLogProps) {
        super(props);
        this.hostRef = React.createRef();
    }

    componentDidMount() {
        if (this.hostRef.current) {
            this.hostRef.current.scrollTop = this.hostRef.current.scrollHeight;
        }
    }

    componentDidUpdate() {
        if (this.hostRef.current) {
            this.hostRef.current.scrollTop = this.hostRef.current.scrollHeight;
        }
    }

    render() {
        const {
            chatList,
            ...props
        } = this.props;

        return (
            <Host
                {...props}
                ref={this.hostRef}
            >
                <UserContext.Consumer>
                    {user => (
                        chatList.map(chat => (
                            <MessageBox
                                date={chat.createdAt}
                                position={user.userId === chat.sender.id ? "right" : "left"}
                            >
                                <MessageText>
                                    {chat.message}
                                </MessageText>
                            </MessageBox>
                        ))
                    )}
                </UserContext.Consumer>
            </Host>
        );
    }
}

const Host = styled.div`
    display       : flex;
    flex-direction: column;
    height        : 100%;
    overflow      : scroll;
    padding       : 1rem 0;
`;
