import { createContext } from "react";

export type UserValue = {
    userId: string;
    name?: string;
    setName: (name: string) => void;
};

// It is declared by React Component
// To make the compilation successful, temporary values ​​are included
export default createContext<UserValue>({
    userId: "",
    name: undefined,
    setName: () => undefined
});
