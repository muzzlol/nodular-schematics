import { Settings, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GithubIcon from "@/assets/github.svg";
import type { SchematicConfig } from "@/types";

interface SettingsDropdownProps {
	config: SchematicConfig;
	onConfigChange: (config: SchematicConfig) => void;
}

export function SettingsDropdown({
	config,
	onConfigChange,
}: SettingsDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleChange = (key: keyof SchematicConfig, value: number) => {
		const newConfig = { ...config, [key]: value };

		if (newConfig.minNodes > newConfig.maxNodes) {
			if (key === "minNodes") {
				newConfig.maxNodes = newConfig.minNodes;
			} else if (key === "maxNodes") {
				newConfig.minNodes = newConfig.maxNodes;
			}
		}

		onConfigChange(newConfig);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={`flex h-5 w-5 items-center justify-center rounded-full p-0 transition-all duration-300 ${
					isOpen
						? "rotate-90 bg-primary text-primary-foreground"
						: "border border-white/10 bg-background/30 text-foreground backdrop-blur-md hover:bg-white/10"
				}`}
				aria-label="Settings"
			>
				<Settings className="h-6 w-6" />
			</button>

			{isOpen && (
				<div className="-translate-x-1/2 fade-in zoom-in-95 absolute top-full left-1/2 z-50 mt-4 w-72 animate-in rounded-2xl border border-white/10 bg-background/90 p-5 shadow-2xl backdrop-blur-xl duration-200">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
							Configuration
						</h3>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="rounded-full p-1 transition-colors hover:bg-white/10"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<div className="space-y-4">
						{/* Min Nodes */}
						<div className="space-y-2">
							<div className="flex justify-between text-xs">
								<span>Min Nodes</span>
								<span className="font-mono">{config.minNodes}</span>
							</div>
							<input
								type="range"
								min="5"
								max="50"
								value={config.minNodes}
								onChange={(e) =>
									handleChange("minNodes", Number.parseInt(e.target.value))
								}
								className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
							/>
						</div>

						{/* Max Nodes */}
						<div className="space-y-2">
							<div className="flex justify-between text-xs">
								<span>Max Nodes</span>
								<span className="font-mono">{config.maxNodes}</span>
							</div>
							<input
								type="range"
								min="10"
								max="100"
								value={config.maxNodes}
								onChange={(e) =>
									handleChange("maxNodes", Number.parseInt(e.target.value))
								}
								className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
							/>
						</div>

						{/* Connection Density */}
						<div className="space-y-2">
							<div className="flex justify-between text-xs">
								<span>Connection Density</span>
								<span className="font-mono">
									{(config.connectionDensity * 100).toFixed(0)}%
								</span>
							</div>
							<input
								type="range"
								min="0"
								max="1"
								step="0.1"
								value={config.connectionDensity}
								onChange={(e) =>
									handleChange(
										"connectionDensity",
										Number.parseFloat(e.target.value),
									)
								}
								className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
							/>
						</div>
					</div>

					<div className="my-4 h-px w-full bg-white/10" />

					<a
						href="https://github.com/muzzlol/nodular-schematics"
						target="_blank"
						rel="noopener noreferrer"
						className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 p-2 font-medium text-sm transition-colors hover:bg-white/10"
					>
						<img src={GithubIcon} alt="GitHub" className="h-4 w-4" />
						<span>View on GitHub</span>
					</a>
				</div>
			)}
		</div>
	);
}
