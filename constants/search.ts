import { Character } from "./charecters";

export interface SearchResponse {
	info: SearchInfo;
	results: Character[];
}
export interface SearchInfo {
	count: number;
	pages: number;
	next: string;
	prev: string;
}
