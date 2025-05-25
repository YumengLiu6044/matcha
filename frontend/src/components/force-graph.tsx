"use client";

// ForceGraph.jsx
import ReactDOM from "react-dom/client";
import ForceGraph from "react-force-graph-3d";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/Addons.js";
import { useEffect, useRef, useState } from "react";
import { Profile, Node } from "@/util/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const profiles: Profile[] = [
	{
		id: 0,
		name: "Adrienn Brown",
		profileURL: "/images/pexels-adrienn-638530-1542085.jpg",
		interests: ["nature", "travel", "photography"],
	},
	{
		id: 1,
		name: "Andrew Malek",
		profileURL: "/images/pexels-andrewperformance1-697509.jpg",
		interests: ["music", "performance", "sports"],
	},
	{
		id: 2,
		name: "Bri Schneiter",
		profileURL: "/images/pexels-bri-schneiter-28802-346529.jpg",
		interests: ["mountains", "hiking", "landscapes"],
	},
	{
		id: 3,
		name: "Jibaro Foto",
		profileURL: "/images/pexels-jibarofoto-1759530.jpg",
		interests: ["street photography", "culture", "black and white"],
	},
	{
		id: 4,
		name: "Moh Adbelghaffar",
		profileURL: "/images/pexels-moh-adbelghaffar-771742.jpg",
		interests: ["portraits", "expressions", "city life"],
	},
	{
		id: 5,
		name: "Olly Whiteman",
		profileURL: "/images/pexels-olly-774909.jpg",
		interests: ["fashion", "urban", "lifestyle"],
	},
	{
		id: 6,
		name: "Polly Shelby",
		profileURL: "/images/pexels-olly-943084.jpg",
		interests: ["beauty", "studio photography", "color"],
	},
	{
		id: 7,
		name: "RB Vellanabi",
		profileURL: "/images/pexels-rb-audiovisual-1819483.jpg",
		interests: ["cinematography", "videography", "gear"],
	},
	{
		id: 8,
		name: "Stefan Stefancik",
		profileURL: "/images/pexels-stefanstefancik-91227.jpg",
		interests: ["portraits", "lighting", "mood"],
	},
	{
		id: 9,
		name: "Suleiman Sallehi",
		profileURL: "/images/pexels-sulimansallehi-1704488.jpg",
		interests: ["culture", "travel", "storytelling"],
	},
	{
		id: 10,
		name: "Vinicius Wiesehofer",
		profileURL: "/images/pexels-vinicius-wiesehofer-289347-1130626.jpg",
		interests: ["editorial", "fashion", "creative expression"],
	},
];

// Random connected graph
const gData = {
	nodes: profiles,
	links: profiles
		.filter((p) => p.id !== null)
		.map((p) => ({
			source: p.id,
			target: p.id > 1 ? Math.round(Math.random() * (p.id - 1)) : 1,
		})),
};

console.log(gData.links);

function CardDiv(props: Profile) {
	const divRef = useRef<HTMLDivElement | null>(null);

	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const node = divRef.current;
		if (!node) return;

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		node.addEventListener("mouseenter", handleMouseEnter);
		node.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			node.removeEventListener("mouseenter", handleMouseEnter);
			node.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<div
			className="node-label transition-all rounded-xl p-2 flex flex-col items-center gap-2 pointer-events-auto bg-white border-1 hover:scale-110  border border-green-700"
			style={{ borderColor: "#78977c" }}
			ref={divRef}
		>
			<img
				className="w-20 aspect-square rounded-full border-1 border-gray-300"
				src={props.profileURL}
			></img>
			<span className="text-center">{props.name}</span>

			{isHovered && (
				<div className="flex flex-wrap gap-2">
					{props.interests.map((item, index) => (
						<div
							className="rounded-lg bg-neutral-100 px-1 text-xs text-gray-600"
							key={index}
						>
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

const extraRenderers = [new CSS2DRenderer()];

export default function NetworkComponent() {
	const graphRef = useRef<any>(null);
	const graphContainerRef = useRef<HTMLDivElement | null>(null);
	const [graphSize, setGraphSize] = useState<number[]>([0, 0]);
	const [query, setQuery] = useState("");
	const [renderedData, setRenderedData] = useState<Node>(gData);

	useEffect(() => {
		if (query === "") {
			setRenderedData(gData);
			console.log(gData);
			return;
		}

		const renderedNodes = gData.nodes.filter((n) =>
			n.name.toLowerCase().includes(query.toLowerCase())
		);
		const renderedLinks = gData.links.filter(
			(l) =>
				renderedNodes.map((n) => n.id).includes(l.source) &&
				renderedNodes.map((n) => n.id).includes(l.target)
		);

		setRenderedData({
			nodes: renderedNodes,
			links: renderedLinks,
		});
		graphRef.current?.refresh();
	}, [query]);

	useEffect(() => {
		if (!graphContainerRef.current) return;

		setGraphSize([
			graphContainerRef.current.clientWidth,
			graphContainerRef.current.clientHeight,
		]);
	}, [graphContainerRef]);

	return (
		<div className="container py-8 flex flex-col gap-5">
			<div className="mb-8">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Connection Graph</h1>
				<p className="text-gray-600 mt-2">
					See your growing connections with UC Irvine students
				</p>
			</div>
			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
				<Input
					type="text"
					placeholder="Search friends by name..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="pl-10 bg-white shadow-sm"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				<div
					className="lg:col-span-2 h-100 rounded-xl overflow-clip border"
					ref={graphContainerRef}
				>
					<ForceGraph
						width={graphSize[0]}
						graphData={renderedData}
						linkOpacity={1}
						ref={graphRef}
						backgroundColor="#e3fced"
						linkColor={() => "#78977c"}
						linkWidth={0.5}
						extraRenderers={extraRenderers}
						nodeThreeObject={(node: Profile) => {
							const container = document.createElement("div");
							const root = ReactDOM.createRoot(container);
							root.render(<CardDiv {...node} />);
							const label = new CSS2DObject(container);

							return label;
						}}
						nodeThreeObjectExtend={false}
					/>
				</div>
				<div className="mt-6 grid grid-cols-1 gap-4">
					<div className="p-4">
						<div className="text-6xl font-bold text-green-600">
							{10}
						</div>
						<div className="text-xl text-gray-600">
							Total People
						</div>
					</div>
					<div className="p-4">
						<div className="text-6xl font-bold text-green-600">
							{12}
						</div>
						<div className="text-xl text-gray-600">Connections</div>
					</div>
					<div className="p-4">
						<div className="text-6xl font-bold text-green-600">
							{3.2}
						</div>
						<div className="text-xl text-gray-600">
							Avg Connections
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
