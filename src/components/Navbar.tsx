import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation()
    return (
        <div>
            <div className="flex items-center justify-between m-4">
                <p className="font-semibold text-lg">Task</p>
                <div className="flex space-x-3 items-center justify-between">
                    <ModeToggle />
                    <Link to={(location.pathname == '/') ? '/submissions' : '/'}>
                        <Button>
                            {(location.pathname == '/') ? 'Go to Submissions' : 'Go to Submit Code'}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar