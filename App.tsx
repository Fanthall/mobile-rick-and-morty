/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from "react";

import {
	Box,
	NativeBaseProvider,
	Radio,
	ScrollView,
	Spacer,
} from "native-base";
import { SafeAreaView } from "react-native";
import { Pages } from "./constants/enums";
import List from "./pages/List";

const App = () => {
	const [page, setPage] = useState<string>(Pages.CHARACTER);
	const pages = [
		{ label: "Character", value: Pages.CHARACTER },
		{ label: "Location", value: Pages.LOCATIONS },
		{ label: "Episode", value: Pages.EPISODES },
	];
	return (
		<NativeBaseProvider>
			<SafeAreaView style={{ display: "flex" }}>
				<ScrollView>
					<Radio.Group
						defaultValue={Pages.CHARACTER}
						name="statusFilter"
						value={page}
						accessibilityLabel="Select Status"
						onChange={(value) => {
							setPage(value);
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
								{pages.map((status) => {
									return (
										<Radio value={status.value} my={1} size="sm">
											{status.label}
										</Radio>
									);
								})}
							</Spacer>
						</Box>
					</Radio.Group>
					<List page={page} />
				</ScrollView>
			</SafeAreaView>
		</NativeBaseProvider>
	);
};
export default App;
