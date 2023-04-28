import { useState, useEffect } from "react";
import Gun from "gun/gun";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import { useLocation, useParams } from "react-router-dom";
import * as _ from "lodash";
import { AES, enc } from "crypto-js";
import { v4 } from "uuid";
import { useStore } from "../store/AppStore";
import dayjs from "dayjs";

type Message = {
	messageId: string;
	author: string;
	content: string;
	timestamp: number;
};

// This is only used for building up the connection
// Not for message communication
const relay = "https://gundb.askrella.de/gun";
const gun = Gun(relay);

const ChatPage = (props: any) => {
	const params = useParams();
	const location = useLocation();

	// Store
	const storeUsername = useStore((state: any) => state.username);
	const setStoreUsername = useStore((state: any) => state.setUsername);

	const setStoreRoom = useStore((state: any) => state.setRoom);

	// Encryption key
	const [encryptionKey] = useState(location.hash);

	// State
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		if (params.room) {
			setStoreRoom(params.room);
		}

		if (storeUsername == null) {
			const enteredUsername = window.prompt("Enter your name:") || "Anonymous";
			setStoreUsername(enteredUsername);
		}

		getGunRoom()
			.map()
			.once((data: any) => {
				// Check data type
				if (!isMessage(data)) {
					console.log("Malformed message", data);
					return;
				}

				// This is our incoming message
				let incomingMessage: Message = data;

				// Check if message already exists
				const alreadyExists = messages.some(msg => msg.messageId === incomingMessage.messageId);
				if (alreadyExists) {
					console.log("Message already exists", data);
					return;
				}

				// Add to messages
				console.log("Received", incomingMessage);
				setMessages(prev => [...prev, incomingMessage]);
			});
	}, []);

	const getGunRoom = () => {
		return gun.get(params.room!);
	};

	const sendMessage = () => {
		const message: Message = {
			messageId: v4(),
			author: storeUsername,
			content: encryptString(input, encryptionKey),
			timestamp: Date.now()
		};

		console.log("Send", message);
		getGunRoom().set(message);
		setInput("");
	};

	const encryptString = (content: string, key: string) => {
		return AES.encrypt(content, key).toString();
	};

	const decryptString = (content: string, key: string) => {
		try {
			const decrypted = AES.decrypt(content, key).toString(enc.Utf8);

			if (decrypted.length == 0) {
				return null;
			}

			return decrypted;
		} catch (error) {
			return null;
		}
	};

	const isMessage = (data: any) => {
		return (
			typeof data.messageId === "string" &&
			typeof data.author === "string" &&
			typeof data.content === "string" &&
			typeof data.timestamp === "number"
		);
	};

	const getMessages = () => {
		return _.chain(messages)
			.sort((a, b) => a.timestamp - b.timestamp)
			.filter(msg => msg.content.length != 0)
			.map(msg => {
				const decryptedContent = decryptString(msg.content, encryptionKey);

				if (decryptedContent) {
					return {
						...msg,
						content: decryptedContent
					};
				}
			})
			.uniqBy("messageId")
			.value();
	};

	return (
		<div className="flex flex-col">
			<div className="">
				<ul className="p-4">
					{getMessages().map(msg => {
						if (msg) {
							return (
								<li key={msg.messageId} className="mb-2 text-white">
									<strong className="font-semibold">
										[{dayjs(msg.timestamp).format("DD.MM.YYYY HH:MM:ss")}] {msg.author}:
									</strong>{" "}
									{msg.content}
								</li>
							);
						}
					})}
				</ul>
			</div>
			<form className="flex p-4" onSubmit={e => e.preventDefault()}>
				<label className="mr-4 flex-1 rounded-md border border-slate-700">
					<input
						className="w-full resize-none appearance-none border-none bg-transparent py-2 px-2 leading-tight text-white focus:outline-none"
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
				</label>
				<button className="rounded-md bg-purple-800 py-2 px-8 font-bold text-white" onClick={sendMessage}>
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatPage;
