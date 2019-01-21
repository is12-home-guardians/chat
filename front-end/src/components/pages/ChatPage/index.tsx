import React from "react";
import Button from "src/components/atoms/Button";
import TextField from "src/components/atoms/TextField";
import Widget from "src/components/atoms/Widget";
import MessageLog from "src/components/organisms/MessageLog";
import RouterHistoryContext from "src/contexts/RouterHistoryContext";
import UserContext, { UserValue } from "src/contexts/UserContext";
import { Chat } from "src/types/model";
import styled from "styled-components";

export default (props: React.Props<{}>) => (
    <UserContext.Consumer>
        {user => (
            <RouterHistoryContext.Consumer>
                {routerHistory => {
                    if (!user.name) {
                        routerHistory.history.push("/sign-in");
                        return;
                    }

                    return (
                        <ChatPage
                            user={user}
                            {...props}
                            ref={props.ref as any}
                        />
                    );
                }}
            </RouterHistoryContext.Consumer>
        )}
    </UserContext.Consumer>
);

interface ChatPageProps extends React.Props<{}> {
    user: UserValue;
}

interface ChatPageState {
    chatList: Chat[];
}

class ChatPage extends React.Component<ChatPageProps, ChatPageState> {

    chatTextAreaElemet: React.RefObject<HTMLTextAreaElement>;
    webSocketConnection: WebSocket;

    constructor(props: ChatPageProps) {
        super(props);
        this.chatTextAreaElemet = React.createRef();

        this.webSocketConnection = new WebSocket(`ws://${document.location.hostname}:8080/ws`);
        this.webSocketConnection.onclose = (_evt) => {
            this.setState({
                chatList: this.state.chatList.concat({
                    message: "webSocket Connectionection closed.",
                    createdAt: +new Date(),
                    sender: {
                        id: "1",
                        name: "system"
                    }
                })
            });
        };
        this.webSocketConnection.onmessage = (evt) => {
            const chat: Chat = JSON.parse(evt.data);
            this.setState({
                chatList: this.state.chatList.concat(chat)
            });
        };
    }

    state: ChatPageState = {
        chatList: []
    };

    submitMessage = (chat: Chat) => {
        this.webSocketConnection.send(JSON.stringify(chat));
        this.chatTextAreaElemet.current!.value = "";
    }

    render() {
        const {
            user
        } = this.props;

        return (
            <Host>
                <Widget>
                    <MessageLog
                        chatList={this.state.chatList}
                    />
                    <ChatForm
                        onSubmit={e => {
                            e.preventDefault();
                            this.submitMessage({
                                message: (e.target as any).elements["chat-message"].value,
                                createdAt: +new Date(),
                                sender: {
                                    id: user.userId,
                                    name: user.name!
                                }
                            });
                            return false;
                        }}
                    >
                        <TextField
                            id="chat-message"
                            placeholder="ChatMessage"
                            required
                            onKeyPress={e => {
                                const message = (e.target as HTMLTextAreaElement).value;
                                if (!message) return;
                                if (e.shiftKey && (e.which === 13 || e.keyCode === 13 || e.key === "Enter")) {
                                    e.preventDefault();
                                    this.submitMessage({
                                        message,
                                        createdAt: +new Date(),
                                        sender: {
                                            id: user.userId,
                                            name: user.name!
                                        }
                                    });
                                }
                            }}
                            inputRef={this.chatTextAreaElemet}
                        />
                        <Button type="submit">送信</Button>
                    </ChatForm>
                </Widget>
            </Host>
        );
    }
}

const Host = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: inherit;
`;

const ChatForm = styled.form`
    display: flex;
`;
