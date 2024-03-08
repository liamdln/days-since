import Board from "@/components/board"
import NoSignal from "@/components/no-signal"
import { BoardContext } from "@/context/boards"
import moment from "moment"
import { useContext } from 'react'

function MainLayout() {

    const boardContext = useContext(BoardContext)

    return (
        <div className="grid grid-cols-2 gap-3 h-full p-3">
            <div className="flex justify-center items-center bg-card rounded-lg overflow-hidden col-span-2">{

                boardContext.boards.length < 1
                ?
                <NoSignal />
                :
                <Board
                    description={boardContext.boards[0].description}
                    backgroundUrl={boardContext.boards[0].backgroundUrl}
                    date={moment(boardContext.boards[0].date)}
                />

            }</div>
            {/* <div className="flex justify-center items-center bg-card rounded-lg overflow-hidden"><NoSignal /></div>
            <div className="flex justify-center items-center bg-card rounded-lg overflow-hidden"><NoSignal /></div>
            <div className="flex justify-center items-center bg-card rounded-lg overflow-hidden"><NoSignal /></div> */}
        </div>
    )
}

export default MainLayout