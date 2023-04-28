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

type Message = {
	messageId: string;
	author: string;
	content: string;
	timestamp: number;
};

// This is only used for building up the connection
// Not for message communication
const relay = "https://gundb.askrella.de";
const gun = Gun(relay);

const ChatPage = (props: any) => {
	const params = useParams();
	const location = useLocation();

	// Store
	const storeUsername = useStore((state: any) => state.username);
	const setStoreUsername = useStore((state: any) => state.setUsername);

	// Encryption key
	const [encryptionKey] = useState(location.hash);

	// State
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");

	useEffect(() => {
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
		return gun.get(getRoomName());
	};

	const getRoomName = () => {
		return params.room!;
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
		<div className="flex min-h-screen flex-col">
			<header className="bg-purple-900 py-4 text-center text-white">
				<h1 className="text-3xl font-bold">#{getRoomName()}</h1>
			</header>
			<div className="flex-1 overflow-y-auto">
				<ul className="p-4">
					{getMessages().map(msg => {
						if (msg) {
							return (
								<li key={msg.messageId} className="mb-2">
									<strong className="font-bold">{msg.author}:</strong> {msg.content}
								</li>
							);
						}
					})}
				</ul>
			</div>
			<form className="flex p-4" onSubmit={e => e.preventDefault()}>
				<label className="mr-4 flex-1">
					<span className="sr-only">Message:</span>
					<input
						className="w-full rounded-lg border border-gray-400 py-1 px-2 focus:outline-none"
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
				</label>
				<button className="rounded-md bg-purple-900 py-1 px-8 text-white" onClick={sendMessage}>
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatPage;
