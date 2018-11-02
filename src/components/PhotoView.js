import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageProgress from 'react-native-image-progress'

class PhotoView extends Component {
    render() {
        const { isFetching } = this.props;
        const source = {
            uri: this.props.photo
        };

        return (
            <ImageProgress
                style = {{ flex: 1 }}
                source = {source}
                indicatorProps = {{
                    size: 'large',
                    color: '#87CEFA'
                }}
            />
        );
    }
}

function mapStateToProps(state) {
    const photo = state.photo;
    return { photo }
}

export default connect(mapStateToProps)(PhotoView)