import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/utils/colors';

type PrimaryButtonType = {
	children: React.ReactNode;
	onPress: () => void;
};

const PrimaryButton = ({ children, onPress }: PrimaryButtonType) => {
	return (
		<View style={styles.buttonOuter}>
			<Pressable
				android_ripple={{ color: Colors.background100 }}
				style={({ pressed }) =>
					pressed
						? [styles.buttonInner, styles.pressedItem]
						: styles.buttonInner
				}
				onPress={onPress}
			>
				<Text style={styles.btnStyle}>{children}</Text>
			</Pressable>
		</View>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	pressedItem: {
		backgroundColor: Colors.background100,
		opacity: 0.7,
	},
	buttonInner: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	buttonOuter: {
		backgroundColor: Colors.background200,
		borderRadius: 28,
		overflow: 'hidden',
	},
	btnStyle: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
});
