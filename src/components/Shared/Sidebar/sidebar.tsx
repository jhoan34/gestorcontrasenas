import { Logo } from "../logo"
import { SideBarRoutes } from "../sidebaroutes"
export function Sidebar() {
    return (
        <>
            <div className="py-6">
                <Logo />
            </div>
            <SideBarRoutes />
        </>
    )
}