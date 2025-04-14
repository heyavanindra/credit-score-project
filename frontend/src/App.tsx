import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserInput from "./pages/UserInput"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/info" element={<UserInput></UserInput>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App