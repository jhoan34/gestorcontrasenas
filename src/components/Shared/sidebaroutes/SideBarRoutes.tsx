"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {BarChart, DoorClosed, House, RectangleEllipsis } from "lucide-react"
import Link from "next/link"
import { SingleItem } from "../SingleItem"
import { dataSideBarElements, dataSidebarConfiguration } from "./SidebarRoutes.data"
import { Logout } from "../logout/logout"
export function SideBarRoutes () {

    return (

        <div> 
            <SingleItem label="Home" icon={House} href="/"/>
            {dataSideBarElements.map(({title , icon: Icon , children}) => (
                <Accordion key={title} type="single" collapsible className="w-full px-2"> 
                    <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100/20 p-2 rounded-md">
                                    <Icon size={20} />
                                </div>
                                {title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {
                                children.map(({item , href , icon: Icon}) => (
                                    <div key={item}>
                                        <Link 
                                            href={href} 
                                            className="px-6 py-2 flex gap-2 items-center hover:bg-blue-100/20 duration-200 transition-all rounded-md"
                                        >
                                            <Icon size={20} />
                                            {item}
                                        </Link>
                                    </div>
                                ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))
            
            }
            <SingleItem label="Genenrator" icon={RectangleEllipsis} href="/generator"/>
            {
                dataSidebarConfiguration.map(({title , icon: Icon , children}) => (
                    <Accordion key={title} type="single" collapsible className="w-full px-2"> 
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100/20 p-2 rounded-md">
                                        <Icon size={20} />
                                    </div>
                                    {title}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {
                                    children.map(({item , href , icon: Icon , premium}) => (
                                        <div 
                                            key={item} 
                                            className="flex items-center justify-between mt-2 hover:bg-blue-100/20 duration-300 transition-all rounded-md pr-1"
                                        >
                                            <Link href={href} className="px-6 py-2 flex gap-2 items-center">
                                                <Icon size={20} />
                                                {item}
                                                {
                                                    premium && (
                                                        <span className="flex gap-2 text-xs px-2 py-1 bg-blue-400 rounded-md" >
                                                            Premium
                                                        </span>
                                                    )
                                                }
                                            </Link>
                                        </div>
                                    ))
                                }
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))

            }
            <SingleItem label="Analytics" icon={BarChart} href="/analytics"/>
            <SingleItem onclick={() => Logout()} label="Logout" icon={DoorClosed} href="#"/>

        </div>
    )
}