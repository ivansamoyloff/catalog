const initialState = {
    token:'',
    isLoading:false,
    error:false,
    email: '',
    password:'',
    goods:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_DONE':
            return {...state, isLoading: false, token: action.token};
        case 'LOGIN_ERROR':
            return {...state, isLoading: false, error: action.error};
        case 'LOGIN_PENDING':
            return {...state, isLoading: true};
        case 'DATA_INPUT':
            return {...state, email:action.email, password: action.password};
        case 'GET_ALL_GOODS_DONE':
            return {...state, isLoading: false, goods: action.goods};
        case 'GET_ALL_GOODS_ERROR':
            return {...state, isLoading: false, error: action.error};
        case 'GET_ALL_GOODS_PENDING':
            return {...state, isLoading: true};
        case 'SET_NEW_GOOD_DONE'://-NEW
            return {...state, isLoading: false, goods: [...state.goods, action.item]};
        case 'SET_NEW_GOOD_ERROR':
            return {...state, isLoading: false, error: action.error};
        case 'SET_NEW_GOOD_PENDING':
            return {...state, isLoading: true};
        case 'SET_OLD_GOOD_DONE':
            return {...state, isLoading: false, goods: state.goods.map((item)=>action.updItem.id === item.id ? action.updItem : item)};
        case 'SET_OLD_GOOD_ERROR':
            return {...state, isLoading: false, error: action.error};
        case 'SET_OLD_GOOD_PENDING':
            return {...state, isLoading: true};
        case 'DELETE_GOOD_DONE':
            return {...state, isLoading: false, goods: state.goods.find((item) => item.id === action.item.id)};
        case 'DELETE_GOOD_ERROR':
            return {...state, isLoading: false, error: action.error};
        case 'DELETE_GOOD_PENDING':
            return {...state, isLoading: true};
        default:
            return {...state};
    }
};
export default reducer;