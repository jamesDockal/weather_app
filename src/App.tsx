import { ToastContainer } from "react-toastify";
import { HomePage } from "./pages/Home/home.page";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="App">
      <ToastContainer />

      <HomePage />
    </div>
  );
}
