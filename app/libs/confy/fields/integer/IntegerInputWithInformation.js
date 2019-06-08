import React from "react"
import styles from "./styles"
import {Button, Form, Icon, Input, Item, Text} from "native-base"
import {TouchableOpacity, View, Slider, Alert, Switch} from "react-native"
import FieldLabel from "../../components/ui/FieldLabel"
import R from "ramda"
import {withLink} from "../../libs/withState"
import {Containers} from "../../styles/containers"

const IntegerSlider = ({verbose, value, onChange, min, max, units, info, isFocused, isFocusedChange}) => {

    const clear = () => {
        Alert.alert(
            info,
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    };

    return <View style={Containers.formField}>
        <View style={Containers.inline}>
            <FieldLabel text={verbose}/>
            <Button transparent
                    onPress={clear}>
                <Icon name="information-circle" style={{color: "#4286f4"}}/>
            </Button>
        </View>
        <Text>{value}{units ? ` ${units}` : ""}</Text>
        <Slider minimumValue={min} maximumValue={max} onValueChange={onChange} value={value} step={1} />
    </View>
}
export const IntegerInputWithInformation = withLink("isFocused", false)(IntegerSlider)
//export const IntegerInput = withLink("isFocused", false)(withLog(SimpleIntegerInput))