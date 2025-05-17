import { StyleSheet, Text, View, BackHandler } from 'react-native';
import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import Title from '@/ui/Title';

type GameOverScreenType = {
	isGameWon: boolean;
	resetGame: () => void;
};

const GameOverScreen: React.FC<GameOverScreenType> = ({
	isGameWon,
	resetGame,
}) => {
	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 20,
					color: '#fff',
					padding: 10,
					borderRadius: 104,
					textAlign: 'center',
					marginTop: 10,
					backgroundColor: isGameWon ? '#4caf50' : '#f44336',
				}}
			>
				{isGameWon
					? 'Congratulations! You won the game!'
					: 'Sorry, you lost the game.'}
			</Text>
			<Title>Game Over</Title>
			<View style={styles.btnGroup}>
				<View style={styles.btnContainer}>
					<PrimaryButton onPress={() => resetGame()}>
						Start New Game
					</PrimaryButton>
				</View>
				<View style={styles.btnContainer}>
					<PrimaryButton onPress={() => BackHandler.exitApp()}>
						Exit Game
					</PrimaryButton>
				</View>
			</View>
		</View>
	);
};

export default GameOverScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	announcement: {},
	btnGroup: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
		gap: 15,
	},
	btnContainer: {
		flex: 1,
	},
});
