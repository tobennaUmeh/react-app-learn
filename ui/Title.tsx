import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
type TitleProps = {
	children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children }) => {
	return (
		<View style={styles.title}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
};

export default Title;

const styles = StyleSheet.create({
	title: {
		marginVertical: 20,
		borderColor: 'white',
		borderWidth: 6,
		padding: 20,
		borderRadius: 15,
	},
	text: {
		color: 'white',
		fontSize: 25,
		textAlign: 'center',
	},
});
