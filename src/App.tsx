import * as React from "react";
import Posts from "./pages/Posts";
import store from "./store/store";
import {Provider} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos";

declare module '@mui/material/styles' {
    interface ThemeOptions {
        status: {
            danger: string;
        };
    }
}

const theme = createTheme({
    status: {
        danger: '#000000',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Container>
                        <Routes>
                            <Route path="posts" element={<Posts/>}/>
                            <Route path="albums" element={<Albums/>}/>
                            <Route path="albums/:id" element={<Photos/>}/>
                            <Route path="*" element={<Navigate to="posts"/>}/>
                        </Routes>
                    </Container>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;