import { SearchResponse } from "../constants/search";
import { makeRequest } from "./makeRequest";

export const getLocations = (
	searchParam: string,
	type?: string,
	dimension?: string
) => {
	return makeRequest<SearchResponse>({
		url: "https://rickandmortyapi.com/api/location",
		params: {
			type: type,
			dimension: dimension,
			name: searchParam,
		},
	});
};
