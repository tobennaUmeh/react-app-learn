import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
	Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import StartGameScreen from '@/screens/StartGameScreen';
import GameOverScreen from '@/screens/GameOverScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from '@/screens/GameScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const index = () => {
	const [userNumber, setUserNumber] = useState<number | null>(null);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [isGameWon, setIsGameWon] = useState<boolean>(false);

	// useFonts({
	// 	helvetica: require('@/assets/font/Helvetica.ttf'),
	// 	helveticaBold: require('@/assets/font/Helvetica-Bold.ttf'),
	// 	helveticaLight: require('@/assets/font/Helvetica-Light.ttf'),
	// 	helveticaLightOblique: require('@/assets/font/Helvetica-LightOblique.ttf'),
	// });

	const pickedNumberHandler = (num: number) => {
		setUserNumber(num);
	};

	const gameWinnerFunc = (condition: string) => {
		setIsGameOver(true); // Always set game over to true
		setIsGameWon(condition === 'CORRECT'); // Set game won based on the condition
	};

	const resetGame = () => {
		setUserNumber(null);
		setIsGameOver(false);
		setIsGameWon(false);
	};

	let screen = (
		<StartGameScreen pickedNumberHandler={pickedNumberHandler} />
	);

	if (userNumber) {
		// console.log('userNumber:', userNumber);
		screen = (
			<GameScreen
				userNumber={userNumber}
				isGameWon={gameWinnerFunc}
			/>
		);
	}

	if (isGameOver) {
		screen = (
			<GameOverScreen
				isGameWon={isGameWon}
				resetGame={resetGame}
			/>
		);
	}

	return (
		<LinearGradient
			// Background Linear Gradient
			// colors={['rgba(0,0,0,0.8)', 'transparent']}
			colors={['#fe723f', '#fef23f']}
			style={styles.screen}
		>
			<ImageBackground
				source={require('@/assets/images/dice.jpg')}
				resizeMode='cover'
				style={styles.screen}
				imageStyle={styles.imageStyle}
			>
				<SafeAreaView style={styles.container}>{screen}</SafeAreaView>
				<StatusBar style='auto' />
			</ImageBackground>
		</LinearGradient>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#fe723f',
		flex: 1,
	},
	screen: { flex: 1 },
	imageStyle: { opacity: 0.15 },
});
// TODO part 1 t0 4
// import {
// 	StyleSheet,
// 	Text,
// 	View,
// 	FlatList,
// 	Button,
// } from 'react-native';
// import React, { useState } from 'react';
// import GoalItem from '@/components/GoalItem';
// import GoalInput from '@/components/GoalInput';
// import { StatusBar } from 'expo-status-bar';

// const index = () => {
// 	type Goal = { id: string; value: string };
// 	const [arr, setArr] = useState<Goal[]>([]);
// 	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

// 	const addGoalHandler = (enteredText: string) => {
// 		// console.log(arr);
// 		enteredText &&
// 			setArr((prevArr) => [
// 				...prevArr,
// 				{ id: Math.random().toString(), value: enteredText },
// 			]);

// 		enteredText && setIsModalOpen(false);
// 	};
// 	const delGoalHandler = (id: string) => {
// 		setArr((prevArr) => {
// 			return prevArr.filter((goal) => goal.id !== id);
// 		});
// 	};

// 	const closeModal = () => {
// 		setIsModalOpen(false);
// 	};

// 	return (
// 		<>
// 			<StatusBar style='dark' />
// 			<View style={styles.container}>
// 				<Button
// 					title='Add a goal'
// 					color='#310154'
// 					onPress={() => setIsModalOpen(true)}
// 				/>
// 				{isModalOpen && (
// 					<GoalInput
// 						addGoal={addGoalHandler}
// 						closeModal={closeModal}
// 						isModalOpen={isModalOpen}
// 					/>
// 				)}
// 				<View style={styles.goalContainer}>
// 					<Text style={{ fontSize: 25 }}>List of goals</Text>
// 					<View style={styles.goalsView}>
// 						<FlatList
// 							data={arr}
// 							keyExtractor={(item) => item.id}
// 							renderItem={(itemData) => (
// 								<GoalItem
// 									itemData={itemData}
// 									onDel={delGoalHandler}
// 								/>
// 							)}
// 						/>
// 					</View>
// 				</View>
// 			</View>
// 		</>
// 	);
// };

// export default index;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingTop: 10,
// 		paddingHorizontal: 16,
// 		// alignItems: 'center',
// 		// justifyContent: 'center',
// 		// backgroundColor: '#311b6b',
// 		gap: 16,
// 	},
// 	button: {
// 		borderColor: 'black',
// 		borderWidth: 1,
// 	},
// 	goalContainer: {
// 		flex: 6,
// 		gap: 6,
// 		// fontSize: 2,
// 	},
// 	goalsView: {
// 		gap: 10,
// 	},
// });
