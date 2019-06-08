import {Field} from "../fields"
import {IntegerInput} from "./IntegerInput"
import {IntegerInputWithInformation} from "./IntegerInputWithInformation";

export const IntegerFieldWithInformation = Field(IntegerInputWithInformation, {def: 0, units: "", min: 0, max: 32000, info: ""})