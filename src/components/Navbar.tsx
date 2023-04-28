import React from "react";

import { useLocation, useNavigate } from "react-router";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useStore } from "../store/AppStore";

interface MenuItem {
	label: string;
	onClick: () => void;
}

function Navbar(props: any) {
	const navigate = useNavigate();

	// Store
	const storeRoom = useStore((state: any) => state.room);
	const clearStore = useStore((state: any) => state.clearStore);

	// State
	const [open, setOpen] = React.useState(false);
	const items: MenuItem[] = constructMenuItems();

	function constructMenuItems() {
		const items: MenuItem[] = [];

		items.push({
			label: "Home",
			onClick: () => {
				clearStore();
				setOpen(false);
				navigate("/");
			}
		});

		items.push({
			label: "Imprint & Privacy Policy",
			onClick: () => {
				setOpen(false);
				navigate("/imprint");
			}
		});

		return items;
	}

	return (
		<nav className="bg-purple-800 shadow-lg">
			<div className="px-8">
				<div className="flex h-16 justify-between">
					<div className="flex">
						<div className="flex flex-shrink-0 items-center">
							<h1 className="text-lg font-medium text-white">dchat.askrella.de</h1>
							{storeRoom && (
								<>
									<span className="mx-2 text-white">|</span>
									<h2 className="text-lg font-medium text-white">Room: {storeRoom}</h2>
								</>
							)}
						</div>
					</div>
					{items.length > 0 && (
						<div className="flex items-center">
							<div className="relative ml-3">
								<div>
									<button
										className="focus:shadow-solid flex max-w-xs items-center rounded-full text-sm text-white focus:outline-none"
										id="user-menu"
										aria-label="User menu"
										aria-haspopup="true"
										onClick={() => {
											setOpen(previous => !previous);
										}}
									>
										<Bars3Icon className="h-5 w-5" />
									</button>
								</div>
								<div
									className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg"
									style={{ display: open ? "" : "none" }}
								>
									<div className="shadow-xs rounded-md bg-askrella-800 py-1">
										{items.map((item: MenuItem) => (
											<span
												key={item.label}
												className="block cursor-pointer px-4 py-2 text-sm text-white hover:bg-askrella-700"
												role="menuitem"
												onClick={item.onClick}
											>
												{item.label}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
