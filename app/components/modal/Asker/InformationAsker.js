import React from "react"
import {Text, View} from "native-base"
import {InformationButton} from "../askFactory"
import {fontStyles} from "../../../../android/app/src/main/res/fontStyle";

export const InformationAsker = ({children, onCancel}) => (
    <View>
        <Text style={fontStyles.askerLabel}>{children}</Text>
        <InformationButton onCancel={onCancel} />
    </View>
)