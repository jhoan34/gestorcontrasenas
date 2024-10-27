import {LucideIcon} from "lucide-react"

export type SingleItemProps = {
    label: string
    icon: LucideIcon,
    href: string
    onclick?: () => void 
}