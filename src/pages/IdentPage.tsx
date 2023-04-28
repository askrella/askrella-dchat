import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useStore } from "../store/AppStore";

const IdentPage = (props: any) => {
	const navigate = useNavigate();

	// Store
	const setStoreUsername = useStore((state: any) => state.setUsername);
	const setStoreRoom = useStore((state: any) => state.setRoom);

	// State
	const [roomName, setRoomName] = React.useState("");
	const [username, setUsername] = React.useState("");

	// Handle events
	const handleRoomNameChange = (event: any) => {
		setRoomName(event.target.value);
		setStoreRoom(event.target.value);
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
				<div className="mb-4 ">
					<label className="mb-2 block font-bold text-white" htmlFor="roomName">
						Room
					</label>
					<div className="rounded-md border border-slate-700">
						<input
							className="w-full resize-none appearance-none border-none bg-transparent py-2 px-2 leading-tight text-white focus:outline-none"
							id="roomName"
							type="text"
							placeholder="Enter the room name"
							value={roomName}
							onChange={handleRoomNameChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="mb-2 block font-bold text-white" htmlFor="username">
						Username
					</label>
					<div className="rounded-md border border-slate-700">
						<input
							className="w-full resize-none appearance-none border-none bg-transparent py-2 px-2 leading-tight text-white focus:outline-none"
							id="username"
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
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
