import React from "react";

interface InputFieldProps {
	placeholder: string;
	buttonText: string;
	disabled: boolean;
	onSend: (text: string) => void;
}

function InputField(props: InputFieldProps) {
	const [text, setText] = React.useState("");

	const handleClickEvent = () => {
		props.onSend(text);
		setText("");
	};

	return (
		<div className="flex items-center rounded-md border border-slate-700 p-2">
			<input
				type="text"
				value={text}
				placeholder={props.placeholder}
				className="mr-3 w-full flex-1 resize-none appearance-none border-none bg-transparent px-2 leading-tight text-white focus:outline-none"
				onChange={event => setText(event.target.value)}
			/>
			<button
				disabled={props.disabled}
				className="rounded bg-purple-800 py-2 px-6 font-bold text-white hover:bg-purple-900"
				onClick={handleClickEvent}
			>
				{props.buttonText}
			</button>
		</div>
	);
}

export default InputField;
