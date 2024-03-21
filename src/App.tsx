
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Submissions from "./pages/Submissions";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from './components/Navbar';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/submissions" element={<Submissions />} />
          {/* <Route path="*" element={<NoPage />} /> */}

        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App 