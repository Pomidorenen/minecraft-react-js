import './App.scss';
import {Suspense, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTexture} from "./store/world/worldSlice";
import Game from "./components/scenes/game";
import Loading from "./components/scenes/loading";
import TextureSelector from "./components/ui/textureSelector";
import UI from "./components/scenes/UI.jsx";



function App() {
    const dispatch = useDispatch();
    const loading = useSelector(state =>state.world.loading);
    const textures = useSelector(state =>state.world.textures);
    const images = useSelector(state =>state.world.images);
    useLayoutEffect(() => {
        dispatch(fetchTexture());
    }, [dispatch]);
    return (
        (!loading)?
            (<div className="App">
                <UI>
                    {/*<button onClick={()=>dispatch(saveWorld())}>*/}
                    {/*    save*/}
                    {/*</button>*/}
                    {/*<button onClick={()=>dispatch(resetWorld())}>*/}
                    {/*    reset*/}
                    {/*</button>*/}
                    <TextureSelector images={images}/>

                    <div className="aim">
                        +
                    </div>
                </UI>
                    <Suspense fallback={<Loading/>}>
                        <Game data={textures}/>
                    </Suspense>
            </div>):(<Loading/>)
  );
}

export default App;
