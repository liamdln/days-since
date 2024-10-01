export type Board = {
    uuid: string;
    description: string;
    backgroundUrl?: string;
    date: string;
}

export type BoardContext = {
    boards: Board[];
    deleteBoard: (id: string) => void;
    fetchBoards: () => Promise<Board[]>;
    setBoards: (boards: Board[]) => Promise<void>;
    editBoard: (editedBoard: Board) => void;
}

export type Props = {
    children: React.ReactNode
}