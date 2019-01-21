import React, { Component } from "react";
import Button from "src/components/atoms/Button";
import Widget from "src/components/atoms/Widget";
import RouterHistoryContext from "src/contexts/RouterHistoryContext";
import UserContext, { UserValue } from "src/contexts/UserContext";
import styled from "styled-components";

export default (props: React.Props<{}>) => (
    <RouterHistoryContext.Consumer>
        {routerHistory => (
            <UserContext.Consumer>
                {user => {
                    if (user.name) {
                        routerHistory.history.push("/");
                        return;
                    }
                    return (
                        <SignInPage
                            user={user}
                            {...props}
                            ref={props.ref as any}
                        />
                    );
                }}
            </UserContext.Consumer>
        )}
    </RouterHistoryContext.Consumer>
);

export interface SignInPageProps extends React.Props<{}> {
    user: UserValue;
}

interface SignInPageState {
}

class SignInPage extends Component<SignInPageProps, SignInPageState> {
    render() {
        const {
            user: {
                setName
            }
        } = this.props;

        return (
            <Host>
                <Widget>
                    <SectionTitle>Sign In</SectionTitle>
                    <div>名前を入力</div>
                    <SignInForm
                        onSubmit={e => {
                            e.preventDefault();
                            setName((e.target as any).elements["user-name"].value);
                            return false;
                        }}
                    >
                        <input id="user-name" required/>
                        <Button type="submit">決定</Button>
                    </SignInForm>
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

const SectionTitle = styled.div`
    font-size: 1.5rem;
    letter-spacing: .1rem;
    text-align: center;
`;

const SignInForm = styled.form`
    display: flex;
`;
