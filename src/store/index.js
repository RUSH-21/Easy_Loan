import { createStore } from 'redux';

const authReducer = (state = {token: ''}, action) => {

  
    if(action.type === 'login'){
        console.log('In reducer');
        console.log(action.token)

        return {
          token: action.token
        };
    }

    if(action.type === 'logout'){
        return {
            token: ''
        };
    }

    return state;
};


const store  = createStore(authReducer);

export default store;