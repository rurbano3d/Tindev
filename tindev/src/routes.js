import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    createSwitchNavigator({
        Login, // a ordem importa se o main estivesse em primeiro seria carregado o main em primeiro
        Main,
    })
);

