import React, {useEffect} from "react";
import Item from "../Item";
import {useDispatch, useSelector} from "react-redux";
import {GetAllGoods} from "../../services/actions";


const ItemList = () => {

    const goods = useSelector(state=>state.goods);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!goods||!goods.length){
            dispatch(GetAllGoods());
        }
    },[dispatch, goods]);

    const items = goods.map((item)=>{
        return <Item
            data={item}
             key={item.id}
        />;
    });

    return(
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row">
                    {items}
                </div>
            </div>
        </div>
    )
};

export default ItemList;