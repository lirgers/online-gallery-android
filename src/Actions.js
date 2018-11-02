import Config from 'react-native-config'

import Constants from './Constants'

const { CLIENT_ID } = Config;

const {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    OPEN_PHOTO,
    UNSPLASH_URL
} = Constants;

function fetchData() {
    return (dispatch) => {
        dispatch(requestForData());
        const url = UNSPLASH_URL + `?client_id=${CLIENT_ID}`;
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                dispatch(fetchSuccess(parsePhotos(data)))
            })
            .catch((error) => fetchFail(error));
    }
}

function requestForData() {
    return {
        type: FETCHING_DATA
    }
}

function fetchSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        photos: data
    }
}
  
function fetchFail(error) {
    return {
        type: FETCHING_DATA_FAILURE,
        error: String(error)
    }
}

function openPhoto(item, navigate) {
    return {
        type: OPEN_PHOTO,
        item,
        navigate
    };
}

function parsePhotos(data) {
    let photos = [],
        key = 0;
    
    if (!(data instanceof Array)) {
        return photos;
    }
    
    data.forEach((photo) => {
        photos.push({
            urls: {
                preview: photo.urls.small,
                original: photo.urls.raw
            },
            author: photo.user.name,
            key: key++
        });
    });

    return photos;
}

export default {
    fetchData,
    requestForData,
    fetchSuccess,
    fetchFail,
    openPhoto
}