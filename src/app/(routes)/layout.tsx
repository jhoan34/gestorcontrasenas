import { Sidebar } from "@/components/Shared/Sidebar"
import { Logo } from "@/components/Shared/logo"
import { SidebarMobile } from "@/components/Shared/SidebarMobile"

export default function layoutRoutes ({
    children
} : Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="h-full">
            <div className="flex justify-between lg:hidden px-6 py-3 items-center bg-blue-800">
                <div className="py-1 text-white">
                    <Logo />
                </div>
                <SidebarMobile />
            </div>
            <div className="flex h-full">
                <div className="max-w-lg hidden lg:flex h-full w-72 flex-col bg-blue-800 px-4 text-white fixed">
                    <Sidebar />
                </div>

                <div className="w-full lg:pl-72">
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>

        </main>
    )
}