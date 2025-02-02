import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
	Modal,
	Image,
} from 'react-native';
import React, { useState } from 'react';

interface GoalInputType {
	addGoal: (enteredText: string) => void;
	isModalOpen: boolean;
	closeModal: () => void;
}

const GoalInput: React.FC<GoalInputType> = ({
	addGoal,
	isModalOpen,
	closeModal,
}) => {
	const [enteredText, setEnteredText] = useState<string>('');
	const goalInputHandler = (enteredText: string) => {
		setEnteredText(enteredText);
	};

	const addGoalHandler = () => {
		addGoal(enteredText);
		setEnteredText('');
	};

	return (
		<Modal
			visible={isModalOpen}
			animationType='slide'
		>
			<View style={styles.inputContainer}>
				<Image
					style={styles.imageStyle}
					source={require('../assets/images/goal.png')}
				/>
				<TextInput
					value={enteredText}
					style={styles.textInput}
					placeholder='Your career goals'
					onChangeText={goalInputHandler}
				/>
				<View style={styles.buttonGroup}>
					<View style={styles.btn}>
						<Button
							onPress={addGoalHandler}
							title='Add a goal'
							color='#1a9d68'
						/>
					</View>
					<View style={styles.btn}>
						<Button
							title='Cancel'
							onPress={() => closeModal()}
							color='#ff0000'
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default GoalInput;

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		alignItems: 'center',
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderColor: '#cccccc',
		flex: 1,
		backgroundColor: '#311b6b',
		// gap: 2,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#e4c0ff',
		width: '70%',
		padding: 18,
		borderRadius: 4,
		marginRight: 8,
		fontSize: 16,
		color: '#000000',
		backgroundColor: '#d2c7ef',
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '70%',
		marginTop: 10,
		marginRight: 8,
	},
	btn: {
		width: '40%',
	},
	imageStyle: {
		width: 200,
		height: 200,
	},
});
