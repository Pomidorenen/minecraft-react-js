import React from 'react';
import {useSelector} from "react-redux";
import Cube from "./Cube";

const Cubes = () => {
    const cubes= useSelector((state) => state.world.cubes);
    return cubes.map(({id,position,texture})=>{
        return(
            <Cube key={id} position={position} texture={texture}/>
        )
    })
};

export default Cubes;