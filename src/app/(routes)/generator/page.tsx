import { FormGenerator } from "./components/formgenerator";
import { HeaderGenerator } from "./components/headergenerator";

export default function Generator () {
    return (
        <div>
            <HeaderGenerator/>
            <FormGenerator/>
        </div>
    )
}