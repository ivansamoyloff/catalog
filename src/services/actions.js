import {auth, storageRef} from "./firebase";
import {setToken, getAllGoods, createGood, updateGood, deleteGood} from "./api";
import firebase from "firebase";

export const Login = (email, password) => dispatch => {
    dispatch({type:'LOGIN_PENDING'});
    auth.signInWithEmailAndPassword(email, password)
        .then(function (){
            dispatch({type:'DATA_INPUT', email, password});
            auth.currentUser.getIdToken(true)
                .then((token)=>{
                    setToken(token);
                    dispatch({type:'LOGIN_DONE', token});
                });
        })
        .catch(function (error) {
            dispatch({type:'LOGIN_ERROR', error});
    });
};

export const GetAllGoods = () => dispatch => {
   dispatch({type:'GET_ALL_GOODS_PENDING'});
   getAllGoods()
        .then(function (goods) {
            goods = Object.entries(goods).map( ([id, data]) => ({...data, id}));
            dispatch({type:'GET_ALL_GOODS_DONE', goods});
        })
        .catch(function (error) {
            dispatch({type:'GET_ALL_GOODS_ERROR', error});
        });
};

export const CreateGood = (item) => dispatch => {
    const image = item.file[0];
    dispatch({type:'SET_NEW_GOOD_PENDING'});
    let uploadTask = storageRef.child('images/'+image.name).put(image);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) =>{
        uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
                item.src = downloadURL;
                createGood(item)
                    .then(function ({name}) {
                        item.id = name;
                        dispatch({type:'SET_NEW_GOOD_DONE', item});
                    })
                    .catch(function (error) {
                        dispatch({type:'SET_NEW_GOOD_ERROR', error});
                    })
            });
    });
};

export const UpdateGood = (item) => dispatch => {
    dispatch({type:'SET_OLD_GOOD_PENDING'});
    const image = item.file[0];
    let uploadTask = storageRef.child('images/'+image.name).put(image);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) =>{
        uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
                item.src = downloadURL;
                updateGood(item)
                    .then(function (updItem) {
                        dispatch({type:'SET_OLD_GOOD_DONE', updItem});
                    })
                    .catch(function (error) {
                        dispatch({type:'SET_OLD_GOOD_ERROR', error});
                    })
            });
    });

};

export const DeleteGood = (item) => dispatch => {
    dispatch({type:'DELETE_GOOD_PENDING'});
    deleteGood(item.id)
        .then(function () {
            dispatch({type:'DELETE_GOOD_DONE', item});
        })
        .catch(function (error) {
            dispatch({type:'DELETE_GOOD_ERROR', error});
        })
};

export const GetOneGood = (id) => dispatch => {
    dispatch({type:'GET_ONE_GOOD', id});
};
