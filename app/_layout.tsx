import StartGameScreen from '@/screens/StartGameScreen';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ title: 'index', headerShown: false }}

				// component={StartGameScreen}
			/>
		</Stack>
	);
}
