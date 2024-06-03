import { SearchResponse } from "../constants/search";
import { makeRequest } from "./makeRequest";

export const getCharacters = (
	searchParam: string,
	status?: string,
	gender?: string,
	characterType?: string,
	species?: string
) => {
	return makeRequest<SearchResponse>({
		url: "https://rickandmortyapi.com/api/character",
		params: {
			name: searchParam,
			status: status,
			gender: gender,
			type: characterType,
			species: species,
		},
	});
};
