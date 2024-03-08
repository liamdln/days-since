import { GetAllBoards } from "../../../wailsjs/go/main/App";
import { Board } from "./types";

export async function getBoardsFromServer() {
    const boards = await GetAllBoards()
    if (!boards) throw Error("No boards returned.")

    const parsedBoards = JSON.parse(boards) as Board[]
    return parsedBoards;
}