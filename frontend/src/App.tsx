import moment from "moment"
import Board from "./components/board"

function App() {
    

    return (
        <div id="App" className="font-poppins h-svh">
            <Board
            date={moment([2024, 2, 6])} 
            description="requirements were changed." 
            backgroundUrl="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHRnamV6dzNvY3lzdHhvN24zYndqdWFqMDFvejc0YXZ2aXdtaThlNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FcuiZUneg1YRAu1lH2/giphy.gif" />
        </div>
    )
}

export default App
