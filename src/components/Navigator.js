import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PhotosList from './PhotosList';
import PhotoView from './PhotoView';

export default AppNavigator = createStackNavigator({
    PhotosList: { screen: PhotosList },
    PhotoView: { screen: PhotoView }
}, {
    initialRouteName: 'PhotosList'
});
