import DropZone from "@/components/DropZone"
import { auth } from "@clerk/nextjs"

function DashBoard() {
    const { userId } = auth()
    return (
        <div>
            <DropZone/>
        </div>
    )
}

export default DashBoard
