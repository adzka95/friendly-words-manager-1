import React from "react"
import {Button, Icon, Text} from "native-base"
import {Slider, View} from "react-native"
import FieldLabel from "../../components/ui/FieldLabel"
import {withLink} from "../../libs/withState"
import {Containers} from "../../styles/containers"
import {Modal} from "../../../../components/modal/Modal";

const IntegerSlider = ({verbose, value, onChange, min, max, units, info, isFocused, isFocusedChange}) => {

    const showInfo = () => {
        Modal.info(info)
    };

    return <View style={Containers.formField}>
        <View style={Containers.inline}>
            <FieldLabel text={verbose}/>
            <Button transparent
                    onPress={showInfo}>
                <Icon name="information-circle" style={{ fontSize: 40}}/>
            </Button>
        </View>
        <Text>{value}{units ? ` ${units}` : ""}</Text>
        <Slider minimumValue={min} maximumValue={max} onValueChange={onChange} value={value} step={1} />
    </View>
}
export const IntegerInputWithInformation = withLink("isFocused", false)(IntegerSlider)
//export const IntegerInput = withLink("isFocused", false)(withLog(SimpleIntegerInput))