import React from "react";
import UserContext from "src/contexts/UserContext";
import styled from "styled-components";

interface MainLayoutProps extends React.Props<{}> {
}

interface State {
    name?: string;
}

export default class extends React.Component<MainLayoutProps, State> {
    userId: string = Math.random().toString();
    state: State = {
        name: undefined
    };

    render() {
        const {
            children,
            ...props
        } = this.props;

        return (
            <Host
                {...props}
                ref={props.ref as any}
            >
                <Header>
                    <Title>Chat</Title>
                    <div>{name}</div>
                </Header>
                <Main>
                    <UserContext.Provider
                        value={{
                            userId: this.userId,
                            name: this.state.name,
                            setName: name => this.setState({ name })
                        }}
                    >
                        {children}
                    </UserContext.Provider>
                </Main>
            </Host>
        );
    }
}

const Host = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FAFBFD;
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, .3);
    background-color: #1565C0;
    width: 100%;
    height: 4rem;
    color: white;
    position: fixed;
    :first-child {
        flex-grow: 1;
    }
    z-index: 1000;
`;

const Title = styled.div`
    font-size: 1.5rem;
    letter-spacing: 2px;
`;

const Main = styled.main`
    min-height: calc(100vh - 4rem);
    position: relative;
    box-sizing: border-box;
    top: 4rem;
`;
