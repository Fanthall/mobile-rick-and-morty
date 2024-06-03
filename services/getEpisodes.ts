import { SearchResponse } from "../constants/search";
import { makeRequest } from "./makeRequest";

export const getEpisodes = (searchParam: string, episode?: string) => {
	return makeRequest<SearchResponse>({
		url: "https://rickandmortyapi.com/api/episode",
		params: {
			episode: episode,
			name: searchParam,
		},
	});
};
