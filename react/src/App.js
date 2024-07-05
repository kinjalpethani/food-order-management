import {RouterProvider} from "react-router-dom";
import Routing from "./routes";
import {Provider} from "react-redux";
import store from './store/index';

function App() {
    return <Provider store={store}>
        <RouterProvider router={Routing}/>
    </Provider>
}

export default App;
