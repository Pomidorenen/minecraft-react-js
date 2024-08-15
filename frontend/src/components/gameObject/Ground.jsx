import React from 'react';
import {usePlane} from "@react-three/cannon";
import {addCube} from "../../store/world/worldSlice";
import {useDispatch} from "react-redux";

const Ground = ({texture,position,size=[100,100]}) => {
    const [ref] = usePlane(()=>{
        return{
            rotation:[-Math.PI/2,0,0],
            position
        }
    })
    const dispatch = useDispatch();
    return (
        <mesh
            onClick={(e)=>{
                e.stopPropagation();
                const [x,y,z] = Object.values(e.point).map((e)=>
                    Math.ceil(e)
                );
                if(e.button ===0) {
                    dispatch(addCube({x, y, z}));
                }
            }}
            ref={ref}>
            <planeGeometry args={size}/>
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

export default Ground;