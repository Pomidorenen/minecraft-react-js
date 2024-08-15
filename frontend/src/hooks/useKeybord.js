import {useCallback, useEffect, useState} from "react";

function actionByKey(key){
    const keyActionMap = {
        KeyW:"moveForward",
        KeyS:"moveBackward",
        KeyD:"moveRight",
        KeyA:"moveLeft",
        Space:"jump",
        Digit1:"dirt",
        Digit2:"glass",
        Digit3:"grass",
        Digit4:"ground",
        Digit5:"wood",
        KeyE:"dynamic"
    }
    return keyActionMap[key];
}
export default function useKeyboard(){
    const [movement,setMovement] = useState({
        moveForward:false,
        moveBackward:false,
        moveLeft:false,
        moveRight:false,
        jump:false,
        dirt:false,
        glass:false,
        grass:false,
        ground:false,
        wood:false,
        dynamic:false,
    });
    const handleKeyDown = useCallback((e)=>{
        const action = actionByKey(e.code);
        if(action){
            setMovement(prev=>{
                return{
                    ...prev,
                    [action]:true
                }
            })
        }
    },[])
    const handleKeyUp = useCallback((e)=>{
        const action = actionByKey(e.code);
        if(action){
            setMovement(prev=>{
                return{
                    ...prev,
                    [action]:false
                }
            })
        }
    },[])
    useEffect(() => {
        document.addEventListener("keydown",handleKeyDown);
        document.addEventListener("keyup",handleKeyUp);
        return()=>{
            document.removeEventListener("keydown",handleKeyDown);
            document.removeEventListener("keyup",handleKeyUp);
        }
    }, [handleKeyUp,handleKeyDown]);

    return movement;
}