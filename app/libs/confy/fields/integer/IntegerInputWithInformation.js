import React from "react"
import styles from "./styles"
import {Button, Form, Icon, Input, Item, Text} from "native-base"
import {TouchableOpacity, View, Slider, Alert, Switch} from "react-native"
import FieldLabel from "../../components/ui/FieldLabel"
import R from "ramda"
import {withLink} from "../../libs/withState"
import {Containers} from "../../styles/containers"
import {Modal, onConfirm} from "../../../../components/modal/Modal";
import * as constants from "../../../../../android/app/src/main/res/constantStrings";

const IntegerSlider = ({verbose, value, onChange, min, max, units, info, isFocused, isFocusedChange}) => {

    const showInfo = () => {
        Modal.info(info)
    };

    return <View style={Containers.formField}>
        <View style={Containers.inline}>
            <FieldLabel text={verbose}/>
            <Button transparent
                    onPress={showInfo}>
                <Icon name="information-circle" style={{color: "#3F51B5"}}/>
            </Button>
        </View>
        <Text>{value}{units ? ` ${units}` : ""}</Text>
        <Slider minimumValue={min} maximumValue={max} onValueChange={onChange} value={value} step={1} />
    </View>
}
export const IntegerInputWithInformation = withLink("isFocused", false)(IntegerSlider)
//export const IntegerInput = withLink("isFocused", false)(withLog(SimpleIntegerInput))