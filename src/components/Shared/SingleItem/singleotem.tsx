import Link from "next/link";
import { SingleItemProps } from "./SingleItem.type";

export function SingleItem ( props : SingleItemProps ) {
    const {href , label , icon: Icon , onclick} = props
    return (
        <Link 
            href={href}
            className="flex gap-2 items-center p-2 hover:bg-blue-100/20  duration-300 transition-all rounded-md"
            onClick={onclick}
        >
            <div className="bg-blue-100/20 p-2 rounded-md">
                <Icon size={20} /> 
            </div>
            {label}
        </Link>
    )
}