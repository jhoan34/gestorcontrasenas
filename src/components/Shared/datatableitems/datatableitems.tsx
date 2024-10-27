import { DataTableItemsProps } from "./data_table.type"
import { DataTable } from "./data.table"
import {columns} from "./columns"
export const DataTableItems = (props : DataTableItemsProps) =>{
    const {elements} = props
    return (
        <div className="py-10">
            <DataTable columns={columns} data={elements}/>
        </div>
    )
}