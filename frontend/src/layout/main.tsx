import EditBoards from "@/components/dialogs/edit-boards"
import { Button } from "@/components/ui/button"
import { BoardContext } from "@/context/boards"
import { Edit } from "lucide-react"
import { useContext, useState } from 'react'
import NoBoards from "@/components/no-boards"
import Board from "@/components/board"
import moment from "moment"
import { cn } from "@/lib/utils"

function MainLayout() {

    const boardContext = useContext(BoardContext)
    const [editBoardsOpen, setEditBoardsOpen] = useState(false)

    return (
        <>
            <div className={cn("grid h-full p-3 relative bg-card", boardContext.boards.length <= 1 ? "grid-cols-1" : "grid-cols-2 gap-3")}>
                {
                    boardContext.boards.length < 1
                        ?
                        <NoBoards />
                        :
                        boardContext.boards.map((board, index) => (
                            <div className={cn(index === 2 && boardContext.boards.length % 2 === 1 ? "col-span-2" : "")}>
                                <Board
                                    key={index}
                                    description={board.description}
                                    backgroundUrl={board.backgroundUrl}
                                    date={moment(board.date)}
                                />
                            </div>
                        ))
                }
                <div className="absolute bottom-3 right-3">
                    <Button className="opacity-30 hover:opacity-100" onClick={() => setEditBoardsOpen(true)}><Edit /></Button>
                </div>
            </div>
            <EditBoards open={editBoardsOpen} setOpen={setEditBoardsOpen} />
        </>
    )
}

export default MainLayout