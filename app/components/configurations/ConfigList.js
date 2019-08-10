import React from "react"
import {Body, CheckBox, Left, List, ListItem, Right, Text} from 'native-base'
import {TouchableOpacity, View,} from "react-native"
import SearchBar from "../lists/SearchBar"
import {ListLabel, ListLabelsContainer} from "../../libs/confy/components/ui/ListLabels";
import * as constants from "../../../android/app/src/main/res/constantStrings";
import {fontStyles} from "../../../android/app/src/main/res/fontStyle";

const activeStyle = ({
    //backgroundColor: '#b3c7f9'
    backgroundColor: '#E5E6F2'
})

export const ConfigElem = ({item, active, children, onOpen, onCheckboxPress}) => (
    <ListItem style={[{flex: 1}, active ? activeStyle : {}]}>
        <Body>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                <CheckBox checked={active ? true : false} color="#3F51B5" style={{marginRight: 10}}
                          onPress={onCheckboxPress}/>

                <TouchableOpacity onPress={() => onOpen(item.id)}>
                    <View style={{flex: 1}}>
                        <Text style={fontStyles.listElement}>{item.name}</Text>
                        {active && <Text style={fontStyles.listElementFootnote}> ({active})</Text>}
                    </View>
                </TouchableOpacity>
            </View>
        </Body>
        <Right>
            {children}
        </Right>
    </ListItem>
);

export default ConfigList = ({children, onSearchChange, searchQuery}) => (
    <View>
        <SearchBar onSearchChange={onSearchChange} searchQuery={searchQuery}/>
        <List>
            <ListLabelsContainer>
                <Left><ListLabel text={constants.ConfigurationName}/></Left>
                <Right><ListLabel text={constants.Actions}/></Right>
            </ListLabelsContainer>
            {children}
        </List>
    </View>
)
