import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Button,
} from 'react-native';
import React, { useState } from 'react';
import GoalItem from '@/components/GoalItem';
import GoalInput from '@/components/GoalInput';
import { StatusBar } from 'expo-status-bar';

const index = () => {
	type Goal = { id: string; value: string };
	const [arr, setArr] = useState<Goal[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const addGoalHandler = (enteredText: string) => {
		// console.log(arr);
		enteredText &&
			setArr((prevArr) => [
				...prevArr,
				{ id: Math.random().toString(), value: enteredText },
			]);

		enteredText && setIsModalOpen(false);
	};
	const delGoalHandler = (id: string) => {
		setArr((prevArr) => {
			return prevArr.filter((goal) => goal.id !== id);
		});
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<StatusBar style='dark' />
			<View style={styles.container}>
				<Button
					title='Add a goal'
					color='#310154'
					onPress={() => setIsModalOpen(true)}
				/>
				{isModalOpen && (
					<GoalInput
						addGoal={addGoalHandler}
						closeModal={closeModal}
						isModalOpen={isModalOpen}
					/>
				)}
				<View style={styles.goalContainer}>
					<Text style={{ fontSize: 25 }}>List of goals</Text>
					<View style={styles.goalsView}>
						<FlatList
							data={arr}
							keyExtractor={(item) => item.id}
							renderItem={(itemData) => (
								<GoalItem
									itemData={itemData}
									onDel={delGoalHandler}
								/>
							)}
						/>
					</View>
				</View>
			</View>
		</>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		paddingHorizontal: 16,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#311b6b',
		gap: 16,
	},
	button: {
		borderColor: 'black',
		borderWidth: 1,
	},
	goalContainer: {
		flex: 6,
		gap: 6,
		// fontSize: 2,
	},
	goalsView: {
		gap: 10,
	},
});
