import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'

import ListHeader from './Header'
import Actions from '../Actions'
import Constants from '../Constants'

const { openPhoto } = Actions;
const { NUMBER_COLUMNS } = Constants;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 10,
        margin: 5
    },
    touchable: {
        flex: 1,
        height: Dimensions.get('window').width / NUMBER_COLUMNS - 5
    },
    itemInvisible: {
        backgroundColor: 'transparent'
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    authorText: {
        flex: 3,
        textAlign: 'center'
    }
});

class PhotosList extends Component {
    static navigationOptions = {
        headerTitle: <ListHeader />
    };

    render() {
        const { navigate } = this.props.navigation;
        const { openPhoto, photos, isFetching } = this.props;
        return (
            <View style={styles.container}>
                {isFetching && this.getLoadingSpinner()}
                <FlatList
                    style={styles.flatListContainer}
                    data={this.formatData(photos, NUMBER_COLUMNS)}
                    numColumns={NUMBER_COLUMNS}
                    renderItem={this.renderItem.bind(this, navigate, openPhoto)}
                />
            </View>
        );
    }

    renderItem(navigate, onPress, { item }) {
        if (item.empty === true) {
            return (
                <TouchableHighlight style = {styles.touchable}>
                    <Image style = {[styles.item, styles.itemInvisible]} />
                </TouchableHighlight>
            );
        }
    
        var key = item.key,
            author = item.author,
            source = {
                uri: item.urls.preview
            };

        return (
            <TouchableHighlight
                style = {styles.touchable}
                onPress = {onPress.bind(this, item, navigate)}
            >
                <View style = {styles.container}>
                    <Image
                        style = {styles.item}
                        key = {key}
                        source = {source}
                    />
                    <Text
                        style={styles.authorText}
                        ellipsizeMode = {'clip'}
                        numberOfLines = {2}
                    >
                        {author}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    getLoadingSpinner() {
        return (
            <ActivityIndicator
                size = 'large'
                color = '#87CEFA'
                style = {styles.spinner}
            />
        );
    }

    formatData(data, numColumns) {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
    
        return data;
    }
}

function mapStateToProps(state) {
    return { photos, isFetching, error } = state;
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openPhoto
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList)