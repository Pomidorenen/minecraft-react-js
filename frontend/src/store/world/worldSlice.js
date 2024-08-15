import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {nanoid} from "nanoid";
import {TextureLoader,NearestFilter,RepeatWrapping} from "three";

export const fetchTexture = createAsyncThunk(
    "world/fetchTexture",
    async function() {
        const response = await fetch("/images");
        return await response.json();
    }
)

const worldSlice = createSlice({
    name: 'world',
    initialState: {
        texture:"dirt",
        images:{},
        textures: {},
        loading:false,
        error:false,
        cubes:[]
    },
    reducers:{
        addCube(state, action){
            const {x,y,z} = action.payload;
            state.cubes.push({
                id:nanoid(),
                position:[x,y,z],
                texture:state.textures[state.texture],
            });
        },
        removeCube(state, action){
            const {x,y,z} = action.payload;
            state.cubes =state.cubes.filter(({position})=>{
                const [X,Y,Z] = position;
                return  X !== x || Y!==y || Z !== z;
            })
        },
        setTexture(state,action){
            state.texture = action.payload.texture;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTexture.pending, (state, action)=>{
            state.loading = true;
        })
        builder.addCase(fetchTexture.fulfilled,(state, action)=>{
            state.images = action.payload;
            state.textures =Object.fromEntries(Object.entries(action.payload).map(([key,value])=>{
                const texture = new TextureLoader().load(value)
                texture.magFilter =NearestFilter;
                return[key, texture];
            }));
            state.textures.plane = new TextureLoader().load(action.payload.grass);
            state.textures.plane.magFilter = NearestFilter;
            state.textures.plane.wrapS = RepeatWrapping;
            state.textures.plane.wrapT = RepeatWrapping;
            state.textures.plane.repeat.set(100,100);
            state.loading = false;
        })
        builder.addCase(fetchTexture.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {addCube,removeCube,setTexture} = worldSlice.actions;

export default worldSlice.reducer;