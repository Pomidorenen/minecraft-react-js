import React from 'react';
import {useBox} from "@react-three/cannon";

const Box = ({texture,position}) => {
    const [ref] = useBox(()=>{return {
        position,
        mass:1
    }});
    return (
        <mesh ref={ref}>
            <boxGeometry/>
            <meshStandardMaterial map={texture}/>
        </mesh>
    );
};

export default Box;