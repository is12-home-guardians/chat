export type Chat = {
    message: string,
    createdAt: number,
    sender: {
        id: string,
        name: string
    }
};
