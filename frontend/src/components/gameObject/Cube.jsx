import React, {useState} from 'react';
import {useBox} from "@react-three/cannon";
import {addCube,removeCube} from "../../store/world/worldSlice";
import {useDispatch} from "react-redux";



const Cube = ({position,texture}) => {
    const [shiny, setShiny] = useState(false);
    const [ref] = useBox(()=>{
        return{
            position,
            type:"Static",
        }
    })
    const dispatch = useDispatch();
    return (
        <mesh
            onPointerMove={(e) =>{
                e.stopPropagation();
                setShiny(true)
            }}
            onPointerOut={(e) =>{
                e.stopPropagation();
                setShiny(false)
            }}
            onClick={(e)=>{
            e.stopPropagation();
            const clickedFaced = Math.floor(e.faceIndex/2);
            const {x,y,z} = ref.current.position;
            if(e.button === 2){
                dispatch(removeCube({x,y,z}));
                return;
            }
            const add=(x,y,z)=>{
                if(e.button ===0)
                {
                    dispatch(addCube({x,y,z}));
                }
            }
            switch(clickedFaced){
                case 0:
                    add(x+1,y,z);
                    break;
                case 1:
                    add(x-1,y,z);
                    break;
                case 2:
                    add(x,y+1,z);
                    break;
                case 3:
                    add(x,y-1,z);
                    break;
                case 4:
                    add(x,y,z+1);
                    break;
                case 5:
                    add(x,y,z-1);
                    break;
                default:break;
            }
        }}
              ref={ref}>
            <boxGeometry attach="geometry"/>
            <meshStandardMaterial  transparent={true}  toneMapped={(shiny)?false:true} map={texture} attach="material"/>
        </mesh>
    );
};

export default Cube;