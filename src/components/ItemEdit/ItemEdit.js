import React, {useEffect, useState} from "react";
import {  useForm  } from "react-hook-form";
import {CreateGood, UpdateGood} from "../../services/actions";
import '../styles/ItemEdit.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

const ItemEdit = () => {

    const { register, handleSubmit, errors } = useForm();
    const [date, setDate] = useState('');
    const [heightErr, setHeightErr] = useState('');
    const [widthErr, setWidthErr] = useState('');
    const [imgAccept, setAccept] = useState('');
    const [dateAccept, setDateAccept] = useState('');
    const [added, setAdded] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const today = new Date();
    const good = useSelector(state=>state.good[0]);


    useEffect(()=>{
        if (id){

            setName(good.name);
            setDescription(good.description);
            setPrice(good.price)
        }
    }, []);

    const onSubmit = (data) => {
        if(id && !!imgAccept){
            data.id = id;
            dispatch(UpdateGood(data));
            setAdded(true);
            history.push('/')
        }else if(!!imgAccept ){
            dispatch(CreateGood(data));
            setAdded(true);
            history.push('/')
        }

    };

    const DateError = () => {
        if(dateAccept){
            return(<p>Date must be greater than current</p>);
        }else {
            return (<p> </p>)
        }
    };
    const HeightError = () => {
        if(heightErr){
            return(<p>Image height must be greater than 200px and less than 4000px</p>);
        }else {
            return (<p> </p>)
        }
    };
    const WidthError = () => {
        if(widthErr){
            return(<p>Image width must be greater than 200px and less than 4000px</p>);
        }else {
            return (<p> </p>)
        }
    };

    const checkImage = (width, height) => {
        setAccept(true);
        setHeightErr(false);
        setWidthErr(false);
        if(width<200 || width>4000){
            setHeightErr(true);
            setAccept(false);
        }
        if(height<200 || height>4000){
            setWidthErr(true);
            setAccept(false);
        }
    };
    const onChangeNameHandler = (event, callback) => {
        const {value} = event.currentTarget;
            callback(value);
    };

    const onChangeHandler = (event) => {
        const {value} = event.currentTarget;
        if (Date.parse(today)<Date.parse(value)) {
            setDateAccept(false);
        }else{
            setDateAccept(true);
            setDate(value);
        }
    };

    const onChangeFileHandler = (event) => {
        let img = document.createElement('img');
        const value = event.target.files[0];
        img.file = value;
        const reader = new FileReader();
        reader.onload = (function (aImg){
            return function(e){aImg.src = e.target.result;};
        })(img);
        const url = reader.readAsDataURL(value);
        img.onload = function(){
            checkImage(this.width, this.height);
        };
    };

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"form"}>
            <label>
                Name
                <input name="name"
                       placeholder="Name"
                       value={name}
                       ref={
                           register({
                               required: true,
                               minLength:20,
                               maxLength: 60
                           })}
                       onChange={(event => onChangeNameHandler(event, setName))}
                />
                <div>
                    {errors.name && "Name is required"}
                    <div>
                        {errors.name?.type === "minLength" && "should be greater than 20"}
                    </div>
                    <div>
                        {errors.name?.type === "maxLength" && "should be less than 60"}
                    </div>
                </div>

            </label>
            <label>
                Description
                <input
                    name="description"
                    type="text"
                    value={description}
                    placeholder="Description"
                    ref={register({ maxLength: 200 })}
                    onChange={(event => onChangeNameHandler(event, setDescription))}
                />

            </label>
            <label>
                Image
                <input
                    name="file"
                    type="file"
                    accept="image/*"
                    placeholder="Image"
                    onChange={(event) => onChangeFileHandler(event)}
                    ref={register({ required: true, })} />
                    <div className='filesErrors'>
                        <HeightError/>
                        <WidthError/>
                        {errors.file && "Image is required"}
                    </div>
            </label>
            <label>
                Discount
                <input
                    name="discount"
                    placeholder="Discount"
                    type="number"
                    step="1"
                    ref={
                        register({
                            required : !!date,
                            min:10,
                            max: 90
                        })} />
                <div>
                    {errors.discount && "Discount is required if date not empty"}
                    <div>{errors.discount?.type === "min" && "should be greater than 10"}</div>
                    <div>{errors.discount?.type === "max" && "should be less than 90"}</div>
                </div>
            </label>
            <label>
                Date
                <input
                    name="date_end"
                    type="date"
                    placeholder="Date"
                    ref={register}
                    onChange={(event) => onChangeHandler(event)}/>
                    <div>
                        <DateError/>
                    </div>
            </label>
            <label>
                Price
                <input name="price"
                       type="number"
                       value={price}
                       step="0.01"
                       placeholder="Price"
                       ref={
                           register({
                               required: true,
                               min:0,
                               max: 99999999.99
                           })}
                       onChange={(event => onChangeNameHandler(event, setPrice))}
                />
                           <div>
                               {errors.price && "Price is required"}
                               <div>{errors.price?.type === "min" && "should be more than 0"}</div>
                               <div>{errors.price?.type === "max" && "should be less than 99999999.99"}</div>
                           </div>
            </label>
            <input type="submit"/>
        </form>
    )
};

export default ItemEdit;