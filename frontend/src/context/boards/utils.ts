import { main } from "../../../wailsjs/go/models";
import { GetAllBoards, WriteBoard } from "../../../wailsjs/go/main/App";
import { Board } from "./types";

export async function getBoardsFromServer(): Promise<Board[]> {
    const boardsFromServer = await GetAllBoards()
    if (!boardsFromServer) throw Error("No boards returned.")

    const parsedBoardsFromServer = JSON.parse(boardsFromServer) as main.Board[]

    const boards: Board[] = parsedBoardsFromServer.map(elem => {
        return {
        uuid: elem.uuid,
        description: elem.description,
        backgroundUrl: elem.background_url,
        date: elem.date
    }})

    return boards;
}

export async function writeBoardsToServer(boards: Board[]) {

    const newBoards: main.Board[] = boards.map((elem) => {
        return {
            uuid: elem.uuid,
            description: elem.description,
            date: elem.date,
            background_url: elem.backgroundUrl ?? ""
        }
    })

    const res = await WriteBoard(newBoards)
    return res;

}