import { createContext, useEffect, useState } from 'react'
import { Board, BoardContext as BoardContextType, Props } from "./types"
import { toast } from "@/components/ui/use-toast"
import { getBoardsFromServer } from "./utils"

const initialContext: BoardContextType = {
    boards: [],
    getBoards: () => new Promise(() => null),
    setBoards: () => new Promise(() => null)
}

export const BoardContext = createContext(initialContext)

function BoardProvider({ children }: Props) {

    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        getBoards()
            .then((res) => setBoards(res))
    }, [])

    const getBoards = async () => {

        try {
            const boards = await getBoardsFromServer()
            setBoards(boards)
            return boards
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

    const writeBoards = async (boards: Board[]) => {

    }

    return (
        <BoardContext.Provider value={{
            boards: boards,
            getBoards: getBoards,
            setBoards: writeBoards
        }}>
            { children }
        </BoardContext.Provider>
  )
}

export default BoardProvider