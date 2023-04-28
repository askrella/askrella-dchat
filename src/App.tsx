import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import IdentPage from "./pages/IdentPage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IdentPage />} />
				<Route path="/:room" element={<ChatPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
