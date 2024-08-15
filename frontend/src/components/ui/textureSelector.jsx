import React, {useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {setTexture} from "../../store/world/worldSlice";
import useKeyboard from "../../hooks/useKeybord";

const TextureSelector = ({images}) => {
    const activeTexture = useSelector(state => state.world.texture);
    const {wood,glass,ground,grass,dirt} = useKeyboard();
    const dispatch = useDispatch();
    useEffect(() => {
        const textures = {
            wood,glass,ground,grass,dirt
        }
        const pressed = Object.entries(textures).find(([key,value])=>{
            return value;
        });

        if(pressed){
            dispatch(setTexture({texture:pressed[0]}));
        }
    }, [dispatch,wood,glass,ground,grass,dirt]);
    return (
        <div className={"absolute bottom"}>
            {
                Object.entries(images).map(([key,value],i)=>{
                    return<img className={`icon ${(activeTexture===key)&&("active")}`} key={i} src={value} alt={""}/>
                })
            }
        </div>
    );
};

export default TextureSelector;