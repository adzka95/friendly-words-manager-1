import React from "react"
import {CheckBox} from "native-base"

export const SimpleCheckbox = ({value, onChange}) => (
    <CheckBox checked={value} onPress={() => onChange(!value)}/>
);