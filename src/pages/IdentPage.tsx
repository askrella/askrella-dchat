import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useStore } from "../store/AppStore";
import InputField from "../components/InputField";

const IdentPage = (props: any) => {
	const navigate = useNavigate();

	// Store
	const setStoreUsername = useStore((state: any) => state.setUsername);

	// State
	const [roomName, setRoomName] = React.useState("");
	const [username, setUsername] = React.useState("");

	// Handle events
	const handleRoomNameChange = (event: any) => {
		setRoomName(event.target.value);
	};

	const handleUsernameChange = (event: any) => {
		setUsername(event.target.value);
		setStoreUsername(event.target.value);
	};

	const handleCreateRoomClick = () => {
		const randomEncryptionKey = v4();

		navigate(`/${roomName}#${randomEncryptionKey}`);
	};

	return (
		<div className="mx-auto w-full">
			<div className="p-6">
				<div className="mb-4">
					<label className="mb-2 block font-bold text-gray-700" htmlFor="roomName">
						Room
					</label>
					<input
						className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
						id="roomName"
						type="text"
						placeholder="Enter the room name"
						value={roomName}
						onChange={handleRoomNameChange}
					/>
				</div>
				<div className="mb-4">
					<label className="mb-2 block font-bold text-gray-700" htmlFor="username">
						Username
					</label>
					<input
						className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
						id="username"
						type="text"
						placeholder="Enter your username"
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<button
					className="focus:shadow-outline w-full rounded bg-purple-800 py-2 px-4 font-bold text-white focus:outline-none"
					type="button"
					onClick={handleCreateRoomClick}
				>
					Create Room
				</button>
			</div>
		</div>
	);
};

export default IdentPage;
