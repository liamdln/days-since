export type Board = {
    uuid: string;
    description: string;
    backgroundUrl: string;
    date: string;
}

export type BoardContext = {
    boards: Board[];
    getBoards: () => Promise<Board[]>;
    setBoards: (boards: Board[]) => Promise<void>;
}

export type Props = {
    children: React.ReactNode
}