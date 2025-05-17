import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	useWindowDimensions,
} from 'react-native';
import PrimaryButton from '@/components/PrimaryButton'; // Assuming you have a PrimaryButton component
import Title from '@/ui/Title';
import { Colors } from '@/utils/colors';
type StartGameScreenProps = {
	userNumber?: number | null;
	pickedNumberHandler: (num: number) => void;
};

const StartGameScreen: React.FC<StartGameScreenProps> = ({
	pickedNumberHandler,
}) => {
	const [enteredValue, setEnteredValue] = useState<string>('');

	const reset = () => {
		setEnteredValue('');
	};

	const confirm = () => {
		const chosenNumber = parseInt(enteredValue);
		if (
			isNaN(chosenNumber) ||
			chosenNumber <= 0 ||
			chosenNumber > 99
		) {
			Alert.alert(
				'Invalid number!',
				'Number has to be between 1 and 99.',
				[{ text: 'Okay', style: 'destructive', onPress: reset }],
			);
			return;
		}
		// Proceed with the confirmed number
		// console.log('Valid number:', chosenNumber);
		pickedNumberHandler(chosenNumber);
		// You can add further logic here, like navigating to another screen or starting a game
	};

	const inputHandler = (inputText: string) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

	const { width, height } = useWindowDimensions();

	return (
		<KeyboardAvoidingView
			style={styles.screen}
			behavior='padding'
		>
			<ScrollView style={styles.screen}>
				<View
					style={[
						styles.outerContainer,
						{ marginTop: width < 500 ? 100 : 20 },
					]}
				>
					<View>
						<Title>Guess My Number Game</Title>
					</View>
					<View style={styles.innwecontainer}>
						<TextInput
							style={styles.input}
							value={enteredValue}
							placeholder='00'
							onChangeText={inputHandler}
							keyboardType='number-pad'
							maxLength={2}
							autoCapitalize='none'
							autoFocus={true}
						/>
						<View style={styles.buttons}>
							<View style={styles.btnContainer}>
								<PrimaryButton onPress={reset}>Reset</PrimaryButton>
							</View>
							<View style={styles.btnContainer}>
								<PrimaryButton onPress={confirm}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	screen: { flex: 1, width: '100%' },
	innwecontainer: {
		gap: 15,
		// elevation: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowRadius: 16,
		shadowOpacity: 0.58,
		borderRadius: 8,
		paddingHorizontal: 20,
		backgroundColor: Colors.gameStartBg,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	outerContainer: {
		marginTop: 10,
		flex: 1,
		paddingHorizontal: 20,
		// width: '100%',
		// height: '100%',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		padding: 10,
		gap: 15,
	},
	input: {
		width: 50,
		borderBottomColor: Colors.inputBorderColor,
		borderBottomWidth: 2,
		fontSize: 20,
		marginVertical: 12,
		textAlign: 'center',
		color: Colors.inputTextColor,
	},
	textStyle: {
		marginTop: 20,
		color: 'white',
		fontSize: 20,
	},
	btnContainer: {
		flex: 1,
	},
});

export default StartGameScreen;
