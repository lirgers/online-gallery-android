import { View, Text } from 'react-native'
import { Header } from 'react-navigation'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import OptionsMenu from 'react-native-options-menu'

import Actions from '../Actions'

const { fetchData } = Actions;
const moreIcon = require("../../assets/more.png");

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: Header.HEIGHT / 2.5,
        color: 'black',
        fontWeight: '400',
        marginLeft: 20
    },
    optionsMenu: {
        width: Header.HEIGHT / 2,
        height: Header.HEIGHT / 2,
        marginRight: 10
    }
};

class ListHeader extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.text}>{'Gallery'}</Text>
                <OptionsMenu
                    button = {moreIcon}
                    buttonStyle = {styles.optionsMenu}
                    destructiveIndex = {1}
                    options = {["Refresh", "Cancel"]}
                    actions = {[this.props.fetchData, () => {}]}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(null, mapDispatchToProps)(ListHeader)