import {
	Alert,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
	View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Title from '@/ui/Title';
import PrimaryButton from '@/components/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

type GameScreenProps = {
	userNumber: number;
	isGameWon: (condition: string) => void;
};

// const { width, height } = Dimensions.get('window');

const GameScreen: React.FC<GameScreenProps> = ({
	userNumber,
	isGameWon,
}) => {
	// console.log('userNumber:', userNumber);
	const [guessNumbers, setGuessNumbers] = useState<Array<number>>([]);
	const [guess, setGuess] = useState<number>(0);
	useEffect(() => {
		// Generate initial guess on component mount
		const initialGuess = Math.floor(Math.random() * 100);
		setGuess(() => initialGuess);
		setGuessNumbers([initialGuess]);
	}, []); // Empty dependency array ensures this runs once

	const { width, height } = useWindowDimensions();

	type GuessCondition = {
		// Define the properties of the condition object here
		condition: 'LOWER' | 'HIGHER' | 'CORRECT' | null;
	};

	// const [fontsLoaded] = useFonts({
	// 	'open-sans': require('@/assets/fonts/OpenSans-Regular.ttf'),
	// 	'open-sans-bold': require('@/assets/fonts/OpenSans-Bold.ttf'),
	// });

	const guessNumber = (
		num: number,
		condition: GuessCondition,
	): number | void => {
		const MAX_GUESSES = 15;

		const showAlert = (
			title: string,
			message: string,
			buttonText: string,
			buttonStyle: 'cancel' | 'destructive' = 'cancel',
		) => {
			Alert.alert(
				title,
				message,
				[
					{
						text: buttonText,
						style: buttonStyle,
						onPress: () => null,
					},
				],
				{ cancelable: false },
			);
		};

		const updateGuess = (
			newGuess: number,
			condition: GuessCondition = { condition: null },
		) => {
			if (guessNumbers.includes(newGuess)) {
				// If the guess is repeated, generate a new one recursively
				return guessNumber(newGuess, condition);
			}
			setGuess(newGuess);
			setGuessNumbers([...guessNumbers, newGuess]);
			return newGuess;
		};

		if (guessNumbers.length >= MAX_GUESSES) {
			showAlert(
				'YOU LOST',
				'Not Everyone can be a winner, try again',
				'Try again',
				'destructive',
			);
			isGameWon('false');
			return;
		}

		switch (condition.condition) {
			case null: {
				const newGuessNull = Math.floor(Math.random() * num);
				if (newGuessNull == 0) {
					return updateGuess(1);
				}
				if (guessNumbers.includes(newGuessNull)) {
					// If the guess is repeated, generate a new one recursively
					const latestGuess = guessNumber(newGuessNull, {
						condition: null,
					});
					return latestGuess;
				}
				setGuess(newGuessNull);
				setGuessNumbers([...guessNumbers, newGuessNull]);
				return updateGuess(newGuessNull);
			}

			case 'LOWER': {
				if (num <= 1) {
					showAlert("You can't go lower", 'Try again', 'Try again');
					return;
				}

				const newGuessLower = num - Math.floor(Math.random() * num);
				if (guessNumbers.includes(newGuessLower)) {
					// If the guess is repeated, generate a new one recursively
					return guessNumber(newGuessLower, { condition: null });
				}
				if (newGuessLower < 1) {
					return updateGuess(1);
				}
				return updateGuess(newGuessLower, { condition: 'LOWER' });
			}

			case 'HIGHER': {
				if (num === 99) {
					showAlert(
						"Don't go higher than 99",
						'Try again',
						'Try again',
					);
					return;
				}
				const newGuessHigher =
					num + Math.floor(Math.random() * (100 - num));
				if (newGuessHigher === 99) {
					return updateGuess(99);
				}
				return updateGuess(newGuessHigher, { condition: 'HIGHER' });
			}

			case 'CORRECT': {
				if (userNumber === guess) {
					showAlert(
						'YOU WON !!!',
						'You are amazing at this game',
						'Congrats',
					);
					isGameWon(condition.condition);
				} else {
					showAlert(
						"Don't Lie",
						'Please Be Truthful',
						'Try Again',
						'destructive',
					);
				}
				return;
			}

			default:
				return;
		}
	};

	return (
		<View
			style={[
				styles.container,
				{
					marginTop: width < 600 ? 20 : 5,
					width: '100%',
					paddingHorizontal: 12,
				},
			]}
		>
			<View>
				<Title>Computer's Guess: {guess}</Title>
			</View>
			<View style={styles.btnGroup}>
				<View style={styles.btns}>
					<View style={styles.btnDtyle}>
						<PrimaryButton
							onPress={() =>
								guessNumber(guess, { condition: 'HIGHER' })
							}
						>
							{/* Higher */}
							<Ionicons
								name='chevron-up-outline'
								size={24}
								color='white'
							/>
						</PrimaryButton>
					</View>
					<View style={styles.btnDtyle}>
						<PrimaryButton
							onPress={() =>
								guessNumber(guess, { condition: 'LOWER' })
							}
						>
							{/* Lower */}
							<Ionicons
								name='chevron-down-outline'
								size={24}
								color='white'
							/>
						</PrimaryButton>
					</View>
				</View>
				<View>
					<PrimaryButton
						onPress={() =>
							guessNumber(guess, { condition: 'CORRECT' })
						}
					>
						Correct
					</PrimaryButton>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				<Text
					style={{
						fontSize: 20,
						textAlign: 'center',
						marginTop: 20,
						color: 'white',
					}}
				>
					Previous Guesses:
				</Text>
				<View
					style={{
						// alignItems: 'center',
						flex: 1,
						width: '100%',
					}}
				>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							flex: 1,
							width: '100%',
							gap: 10,
							marginTop: 10,
						}}
					>
						<FlatList
							data={guessNumbers}
							keyExtractor={(item) => item.toString()}
							numColumns={width < 600 ? 5 : 10}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							// style={{ maxHeight: 100 }}
							// contentContainerStyle={{
							// 	gap: 10,
							// 	justifyContent: 'center',
							// 	alignItems: 'center',
							// 	flexDirection: 'row',
							// 	flexWrap: 'wrap',
							// }}
							renderItem={({ item }) => (
								<Text
									style={{
										fontSize: 20,
										color: 'white',
										backgroundColor: '#72063c',
										padding: 10,
										borderRadius: 10,
										width: width < 600 ? 45 : 50,
										textAlign: 'center',
										margin: 2,
									}}
								>
									{item}
								</Text>
							)}
						/>
						{/* {guessNumbers.map((num, index) => (
								<Text
									key={index}
									style={{
										fontSize: 18,
										color: '#fff',
										backgroundColor: '#72063c',
										padding: 5,
										borderRadius: 5,
									}}
								>
									{num}
								</Text>
							))} */}
					</View>
				</View>
			</View>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	btnDtyle: {
		flex: 1,
	},
	btns: {
		gap: 15,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btnGroup: { gap: 15 },
});
