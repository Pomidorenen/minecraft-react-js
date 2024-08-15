import React, {useEffect, useRef} from 'react';
import {useFrame, useThree} from "@react-three/fiber";
import {useSphere} from "@react-three/cannon";
import {Vector3} from "three";
import useKeyboard from "../../hooks/useKeybord";
import getAxis from "../../features/getAxis";
const JUMP_FORCE = 3;
const SPEED = 2;
const Player = () => {
    const {camera} = useThree();
    const {jump,moveRight,moveLeft,moveForward,moveBackward} = useKeyboard();
    const [ref,api] = useSphere(()=>{
        return{
            mass:1,
            type:"Dynamic",
            position:[0,1,0]
        }
    });
    const velocity = useRef([0,0,0])
    useEffect(() => {
        api.velocity.subscribe((vel)=>velocity.current = vel)
    }, [api.velocity]);
    const position = useRef([0,0,0])
    useEffect(() => {
        api.position.subscribe((pos)=>position.current = pos)
    }, [api.position]);
    useFrame(()=>{
        camera.position.copy(new Vector3(...position.current));
        const direction = new Vector3();
        const frontVector = new Vector3(
            getAxis(moveLeft,moveRight),
            0,
            0,
        );
        const sideVector = new Vector3(
            0,
            0,
            getAxis(moveBackward,moveForward)
        )
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x,(jump&&Math.abs(velocity.current[1])<0.01)?JUMP_FORCE:velocity.current[1],direction.z);
    })
    return (
        <mesh ref={ref}/>
    );
};

export default Player;