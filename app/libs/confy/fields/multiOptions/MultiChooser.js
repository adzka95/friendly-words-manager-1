// @flow
import React from "react"
import {Button, Icon, Text, View} from "native-base"
import {FieldProps} from "../fields";
import {StyleSheet} from "react-native";
import {MultiOptions, SimpleOption} from "../../components/ui/MultiOptions";
import {Containers} from "../../styles/containers";
import {Modal} from "../../../../components/modal/Modal";

type MultiChooserProps = {
    options: Array<string>
} & FieldProps<Array<string>>

export const MultiChooser = ({value, onChange, options, verbose, info}: MultiChooserProps) => {

    const showInfo = () => {
        Modal.info(info)
    };

    return <View>
        <View style={Containers.inline}>
            <Text style={{marginBottom: 10}}>{verbose}</Text>
            <Button transparent
                    onPress={showInfo}>
                <Icon name="information-circle" style={{ fontSize: 40}}/>
            </Button>
        </View>
        <MultiOptions style={styles.container} value={value} onChange={onChange}>
            {options.map(option => <SimpleOption key={option} value={option} label={option}/>)}
        </MultiOptions>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    }
});