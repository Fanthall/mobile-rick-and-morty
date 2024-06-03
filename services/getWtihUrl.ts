import { SearchResponse } from "../constants/search";
import { makeRequest } from "./makeRequest";

export const getWithURL = (url: string) => {
	return makeRequest<SearchResponse>({
		url: url,
	});
};
