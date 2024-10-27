import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Menu} from "lucide-react"
import { SideBarRoutes } from "../sidebaroutes"
import { Button } from "@/components/ui/button"

export function SidebarMobile() {
    return (
        <Sheet>
            <SheetTrigger asChild >
                <Button>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-blue-800 text-white">
                <SheetHeader className="text-left mb-5">
                    <SheetTitle className="text-white">jhoanpassword</SheetTitle>
                    <SheetDescription className="text-slate-100">
                        Create and manage all of yoour passwords
                    </SheetDescription>
                </SheetHeader>
                <SideBarRoutes />
            </SheetContent>
        </Sheet>

    )
}