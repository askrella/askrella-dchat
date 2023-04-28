import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import IdentPage from "./pages/IdentPage";
import Navbar from "./components/Navbar";
import ImprintPage from "./pages/ImprintPage";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<IdentPage />} />
				<Route path="/:room" element={<ChatPage />} />
				<Route path="/imprint" element={<ImprintPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
