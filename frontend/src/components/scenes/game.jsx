import React from 'react';
import {Sky} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Physics} from "@react-three/cannon";
import Box from "../gameObject/Box";
import Ground from "../gameObject/Ground";
import Player from "../character/Player";
import FPV from "../character/FPV";
import Cubes from "../gameObject/Cubes";


const Game =  ({data}) => {
    return (
    <Canvas>
        <Sky sunPosition={[100,100,20]}/>
        <ambientLight intensity={2} />
        <pointLight position={[1,1,1]} />
        <FPV/>
        <Physics>
            <Player/>
            <Cubes/>
            <Box position={[0,0,0]} texture={data.wood}/>
            <Ground position={[0,-3.5,0]} texture={data.plane}/>
        </Physics>
    </Canvas>
    );
};

export default Game;