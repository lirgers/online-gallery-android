import Constants from './Constants'

const {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    OPEN_PHOTO
} = Constants;

const INITIAL_STATE = {
    photos: [],
    isFetching: false,
    error: false,
    photo: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCHING_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCHING_DATA_SUCCESS:
            return Object.assign({}, state, {
                photos: action.photos || [],
                isFetching: false
            });
        case FETCHING_DATA_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: true
            });
        case OPEN_PHOTO:
            action.navigate('PhotoView');
            return Object.assign({}, state, {
                photo: action.item.urls.original
            })
        default:
            return state;
    }
}

