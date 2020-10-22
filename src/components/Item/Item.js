import React from "react";
import '../styles/Item.css'
import {DeleteGood, GetOneGood} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

const Item = (data) => {

    const {data:{src, name}} = data;

    return (
        <div className="col-md-4">
            <div className="card mb-3 shadow-sm" >
                <img src={src} alt={name} style={{width:'300px', height:'200px'}}/>
                <ItemDescription data={data}/>
            </div>
        </div>

    )
};
const ControlButtons = (item) => {

    const {item: {data}} = item;
    let token = useSelector(state => state.token);
    let goods = useSelector(state => state.goods);
    const history = useHistory();
    const dispatch = useDispatch();

    if(!!token){
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={()=>{
                        dispatch(GetOneGood(data.id));
                        history.push(`/edit/${data.id}`)
                    }}
                    >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={()=>dispatch(DeleteGood(data))}>
                    Delete
                </button>
            </div>)
    }else {
        return (
            <div className="btn-group">
            </div>
        )
    }
};

const Price = (object) => {

    const {data:{price, discount, date_end}} = object;

    if(!!discount && !!date_end){
        let today = new Date();
        let parseToday = Date.parse(today);
        if(Date.parse(date_end)>parseToday){
            return (
                <div>
                    <p className='line-through'>{`${price}$`}</p>
                    <p className='price'>{`${price-(price/100*discount)}$`}</p>
                     <p className='discount'>{`Days left:`}</p>
                     <p className='days'>{`${parseInt((Date.parse(date_end)-parseToday)/86400000)}`}</p>
                </div>
            )
        }
        else {
            return (
                <p className='price'>{`${price}$`}</p>
            )
        }
    }else {
        return (
            <p className='price'>{`${price}$`}</p>
        )
    }
};

const ItemDescription = (data) => {
    const {data:{data:{name, description, discount, date_end, price}}} = data;

    return(
      <div className="card-body">
          <p className="card-text">{name}</p>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
              <ControlButtons item={data.data}/>
              <Price data={{price, discount, date_end}}/>
          </div>
      </div>
  );
};



export default Item;