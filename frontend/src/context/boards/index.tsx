import { createContext, useEffect, useState } from 'react'
import { Board, BoardContext as BoardContextType, Props } from "./types"
import { toast } from "@/components/ui/use-toast"
import { getBoardsFromServer, writeBoardsToServer } from "./utils"

const initialContext: BoardContextType = {
    boards: [],
    deleteBoard: () => null,
    fetchBoards: () => new Promise(() => null),
    setBoards: () => new Promise(() => null),
    editBoard: () => null
}

export const BoardContext = createContext(initialContext)

function BoardProvider({ children }: Props) {

    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        fetchBoards()
            .then((res) => setBoards(res))
    }, [])

    const fetchBoards = async () => {

        try {
            const boardsFromServer = await getBoardsFromServer()
            setBoards(boardsFromServer)
            return boardsFromServer
        } catch (e) {
            console.error(e)
            toast({
                title: "Error",
                description: "Could not fetch boards.",
                variant: "destructive"
            })
            return []
        }
    }

    const deleteBoard = (boardId: string) => {
        setBoards(old => old.filter(board => board.uuid !== boardId))
    }

    const writeBoards = async (boards: Board[]) => {
        setBoards(boards)
        writeBoardsToServer(boards)
    }

    const editBoard = (editedBoard: Board) => {
        const boardIndex = boards.findIndex(board => board.uuid === editedBoard.uuid)
        setBoards(old => {
            const front = old.slice(0, boardIndex)
            const back = old.slice(boardIndex + 1, old.length)
            const newArr = front.concat([editedBoard] ,back)
            writeBoards(newArr)
            return newArr;
        })
    }

    return (
        <BoardContext.Provider value={{
            boards: boards,
            deleteBoard: deleteBoard,
            fetchBoards: fetchBoards,
            setBoards: writeBoards,
            editBoard: editBoard
        }}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardProvider