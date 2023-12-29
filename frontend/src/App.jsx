import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/styles/global.styles";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/loginPage";
import SignUp from "./pages/auth/signupPage";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OptionsPage from "./pages/game/optionsPage";
import GameBoard from "./pages/game/gameBoard";
import GameLobby from "./pages/game/gameLobby";

function App() {
  const [theme, setTheme] = useState({
    color: {
      body: "#302E2B",
      color: "#484848",
    },
  });

  // const handleThemeToggle = () => {
  //   setTheme((prev) => {
  //     return {
  //       ...prev,
  //       color: {
  //         ...prev.color,
  //         body: prev.color.body === "#302E2B" ? "#fff" : "#302E2B",
  //       },
  //     };
  //   });
  // };

  // useEffect(() => {
  //   console.log(theme);
  // }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/game" element={<GameLobby />}>
            <Route index element={<OptionsPage />} />
            <Route path=":id" element={<GameBoard />} />
            <Route path="vscomp" element={<GameBoard vsComp />} />
            <Route path="playonline" element={<GameBoard randomOnline />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
