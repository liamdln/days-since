import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BoardContext } from "@/context/boards";
import { Edit, RefreshCcw, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import BoardInfo from "./board-info";
import { Board } from "@/context/boards/types";
import moment from "moment/min/moment-with-locales";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditBoards({ open, setOpen }: Props) {

    const boardContext = useContext(BoardContext)
    const [boardInfoOpen, setBoardInfoOpen] = useState(false)
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
    const [boards, setBoards] = useState<Board[]>(boardContext.boards)

    useEffect(() => {
        setBoards(boardContext.boards)
    }, [boardContext.boards])
    
    const openBoardInfo = (board?: Board) => {
        setSelectedBoard(board?.uuid ? board : null)
        setBoardInfoOpen(true)
    }

    const deleteBoard = (id: string) => {
        boardContext.deleteBoard(id)
    }

    const resetBoardDate = (boardToReset: Board) => {
        boardToReset.date = moment().toISOString()
        boardContext.editBoard(boardToReset)
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-screen-xl">
                    <DialogHeader>
                        <DialogTitle>Edit Boards</DialogTitle>
                        <DialogDescription>
                            Add, remove, or edit a board.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Board ID</TableHead>
                                    <TableHead className="max-w-[230px]">Description</TableHead>
                                    <TableHead className="max-w-[230px]">Background Image URL</TableHead>
                                    <TableHead className="max-w-[230px]">Date</TableHead>
                                    <TableHead className="max-w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {boards.map(board => (
                                    <TableRow key={board.uuid}>
                                        <TableCell className="max-w-[100px]">{board.uuid}</TableCell>
                                        <TableCell className="max-w-[300px] overflow-x-scroll">{board.description}</TableCell>
                                        <TableCell className="max-w-[300px] overflow-x-scroll">{board.backgroundUrl}</TableCell>
                                        <TableCell>{moment(board.date).locale("en-gb").format("LL")}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-3">
                                                <Button onClick={() => resetBoardDate(board)}><RefreshCcw className="h-4" /></Button>
                                                <Button onClick={() => openBoardInfo(board)}><Edit className="h-4" /></Button>
                                                <Button onClick={() => deleteBoard(board.uuid)} variant={"destructive"}><Trash className="h-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-3">
                            <Button disabled={boardContext.boards.length >= 4} onClick={() => openBoardInfo()}>Add a Board</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <BoardInfo board={selectedBoard} open={boardInfoOpen} setOpen={setBoardInfoOpen} />
        </div >
    )
}

export default EditBoards