import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TextInput } from "react-native";

import {
	Box,
	Flex,
	FormControl,
	IconButton,
	Radio,
	Spacer,
	Text,
	View,
} from "native-base";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Character } from "../constants/charecters";
import { Gender, Pages, Status } from "../constants/enums";
import { SearchInfo } from "../constants/search";
import { getCharacters } from "../services/getCharacters";
import { getEpisodes } from "../services/getEpisodes";
import { getLocations } from "../services/getLocations";
import { getWithURL } from "../services/getWtihUrl";

interface ListProps {
	page: string;
}

const List: FunctionComponent<ListProps> = (props) => {
	const [searchParam, setSearchParam] = useState<string>("");
	const [openFilters, setOpenFilter] = useState<boolean>(false);

	const [list, setList] = useState<Character[]>([]);
	const [searchInfo, setSearchInfo] = useState<SearchInfo | undefined>(
		undefined
	);

	//Character
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [gender, setGender] = useState<string | undefined>(undefined);
	const [species, setSpecies] = useState<string | undefined>(undefined);
	const [characterType, setCharacterType] = useState<string | undefined>(
		undefined
	);

	//Episodes
	const [episode, setEpisode] = useState<string | undefined>(undefined);

	//Locations
	const [dimension, setDimension] = useState<string | undefined>(undefined);
	const [locationType, setLocationType] = useState<string | undefined>(
		undefined
	);

	const radioStatus = [
		{ label: "All", value: Status.ALL },
		{ label: "Alive", value: Status.ALIVE },
		{ label: "Dead", value: Status.DEAD },
		{ label: "Unknown", value: Status.UNKNOWN },
	];
	const radioGender = [
		{ label: "All", value: Gender.ALL },
		{ label: "Female", value: Gender.FEMALE },
		{ label: "Male", value: Gender.MALE },
		{ label: "Unknown", value: Gender.UNKNOWN },
		{ label: "Genderless", value: Gender.GENDERLESS },
	];
	useEffect(() => {
		if (props.page === Pages.CHARACTER) {
			getCharacters(
				searchParam,
				status !== Status.ALL ? status : undefined,
				gender !== Gender.ALL ? gender : undefined,
				characterType,
				species
			)
				.then((res) => {
					setList(res.data.results);
					setSearchInfo(res.data.info);
				})
				.catch((err) => {
					setList([]);
				});
		} else if (props.page === Pages.LOCATIONS) {
			getLocations(searchParam, locationType, dimension)
				.then((res) => {
					setList(res.data.results);
					setSearchInfo(res.data.info);
				})
				.catch((err) => {
					setList([]);
				});
		} else if (props.page === Pages.EPISODES) {
			getEpisodes(searchParam, episode)
				.then((res) => {
					setList(res.data.results);
					setSearchInfo(res.data.info);
				})
				.catch((err) => {
					setList([]);
				});
		}
	}, [
		searchParam,
		status,
		gender,
		props.page,
		episode,
		locationType,
		dimension,
		characterType,
		species,
	]);

	useEffect(() => {
		// Clear state after change page type
		setOpenFilter(false);
		setSearchParam("");
		// character
		setStatus(undefined);
		setGender(undefined);
		setCharacterType(undefined);
		setSpecies(undefined);
		// episode
		setEpisode(undefined);
		// location
		setDimension(undefined);
		setLocationType(undefined);
	}, [props.page]);

	const characterListFilters = (
		<View>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Select Status
				</FormControl.Label>
				<Radio.Group
					defaultValue={Status.ALL}
					name="statusFilter"
					value={status}
					accessibilityLabel="Select Status"
					onChange={(value) => {
						setStatus(value);
						console.log(value);
					}}
				>
					<Box
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Spacer
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-around",
								alignItems: "center",
								flexWrap: "wrap",
								maxWidth: "75%",
							}}
						>
							{radioStatus.map((status) => {
								return (
									<Radio value={status.value} my={1} size="sm">
										{status.label}
									</Radio>
								);
							})}
						</Spacer>
					</Box>
				</Radio.Group>
			</Box>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Select Gender
				</FormControl.Label>
				<Radio.Group
					defaultValue={Status.ALL}
					value={gender}
					name="genderFilter"
					accessibilityLabel="Select Gender"
					onChange={(value) => {
						setGender(value);
						console.log(value);
					}}
				>
					<Box
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Spacer
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-around",
								alignItems: "center",
								flexWrap: "wrap",
								maxWidth: "75%",
							}}
						>
							{radioGender.map((status) => {
								return (
									<Radio value={status.value} my={1} size="sm">
										{status.label}
									</Radio>
								);
							})}
						</Spacer>
					</Box>
				</Radio.Group>
			</Box>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Write type
				</FormControl.Label>
				<TextInput
					style={{ marginLeft: 10 }}
					placeholder="Genetic experiment"
					value={characterType}
					onChangeText={(value) => {
						if (value === "") {
							setCharacterType(undefined);
						} else {
							setCharacterType(value);
						}
					}}
				></TextInput>
			</Box>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Write species
				</FormControl.Label>
				<TextInput
					style={{ marginLeft: 10 }}
					placeholder="Human"
					value={species}
					onChangeText={(value) => {
						if (value === "") {
							setSpecies(undefined);
						} else {
							setSpecies(value);
						}
					}}
				></TextInput>
			</Box>
		</View>
	);
	const locationsListFilters = (
		<View>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Write type
				</FormControl.Label>
				<TextInput
					style={{ marginLeft: 10 }}
					placeholder="Planet"
					value={locationType}
					onChangeText={(value) => {
						if (value === "") {
							setLocationType(undefined);
						} else {
							setLocationType(value);
						}
					}}
				></TextInput>
			</Box>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Write dimension
				</FormControl.Label>
				<TextInput
					style={{ marginLeft: 10 }}
					placeholder="Dimension C-137"
					value={dimension}
					onChangeText={(value) => {
						if (value === "") {
							setDimension(undefined);
						} else {
							setDimension(value);
						}
					}}
				></TextInput>
			</Box>
		</View>
	);
	const episodesListFilters = (
		<View>
			<Box style={{ borderBottomWidth: 1 }}>
				<FormControl.Label
					_text={{
						fontSize: "md",
						bold: true,
					}}
					style={{ marginLeft: 10, borderBottomWidth: 1 }}
				>
					Write episode
				</FormControl.Label>
				<TextInput
					style={{ marginLeft: 10 }}
					placeholder="S01E01"
					value={episode}
					onChangeText={(value) => {
						if (value === "") {
							setEpisode(undefined);
						} else {
							setEpisode(value);
						}
					}}
				></TextInput>
			</Box>
		</View>
	);

	return (
		<View>
			<Flex
				direction="row"
				justify="center"
				align="center"
				style={styles.filters}
				mb="2.5"
				mt="1.5"
			>
				<TextInput
					style={styles.input}
					placeholder="Search name"
					onChangeText={(value) => {
						setSearchParam(value);
					}}
					value={searchParam}
				/>
				<IconButton
					style={styles.filterButton}
					size={"md"}
					_icon={{
						as: FontAwesome5,
						name: "filter",
					}}
					onPress={() => {
						setOpenFilter(!openFilters);
					}}
				/>
			</Flex>
			{openFilters && props.page === Pages.CHARACTER && characterListFilters}
			{openFilters && props.page === Pages.LOCATIONS && locationsListFilters}
			{openFilters && props.page === Pages.EPISODES && episodesListFilters}

			<FlatList
				ListEmptyComponent={
					<Flex
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
						There is nothing here
					</Flex>
				}
				data={list}
				ListFooterComponentStyle={{ flex: 1 }}
				ListFooterComponent={
					<Flex
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						m={1}
						style={{ position: "relative", bottom: 0 }}
					>
						<View>
							{searchInfo?.prev && (
								<IconButton
									size="sm"
									variant="ghost"
									colorScheme="indigo"
									_icon={{
										as: EvilIcons,
										size: 35,
										name: "arrow-left",
									}}
									onPress={() => {
										getWithURL(searchInfo.prev).then((res) => {
											setList(res.data.results);
											setSearchInfo(res.data.info);
										});
									}}
								/>
							)}
						</View>
						<View>
							{searchInfo?.next && (
								<IconButton
									size="sm"
									variant="ghost"
									colorScheme="indigo"
									_icon={{
										as: EvilIcons,
										size: 35,
										name: "arrow-right",
									}}
									onPress={() => {
										getWithURL(searchInfo.next).then((res) => {
											setList(res.data.results);
											setSearchInfo(res.data.info);
										});
									}}
								/>
							)}
						</View>
					</Flex>
				}
				renderItem={({ item }) => (
					<View style={styles.item} key={item.id}>
						{item.image && (
							<Image
								style={styles.itemImage}
								source={{
									uri: item.image,
								}}
							/>
						)}
						<Text style={styles.itemText}>{item.name}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default List;

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		flex: 1,
	},
	itemText: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	item: {
		paddingHorizontal: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderColor: "whiteSmoke",
		borderWidth: 1,
	},
	itemImage: {
		width: 35,
		height: 35,
		borderRadius: 5,
	},
	filters: {
		width: "100%",
		height: 60,
		paddingHorizontal: 10,
	},
	statusFilters: {
		padding: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	filterButton: {
		width: 25,
		height: 25,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	openFilters: { display: "flex" },
	closeFilters: { display: "none" },
});
