import { Toaster } from "./components/ui/toaster"
import MainLayout from "./layout/main"
import BoardProvider from "./context/boards"

function App() {

    return (
        <div id="App" className="font-poppins h-svh">
            <BoardProvider>
                <MainLayout />
                <Toaster />
            </BoardProvider>
        </div>
    )
}

export default App
