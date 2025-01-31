import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type GoalItemType = {
	itemData: { item: { id: string; value: string } };
	onDel: (id: string) => void;
};
const GoalItem: React.FC<GoalItemType> = ({ itemData, onDel }) => {
	return (
		<View style={styles.goals}>
			<Pressable
				android_ripple={{ color: '#1cd98d' }}
				onPress={() => onDel(itemData.item.id)}
				style={({ pressed }) => pressed && styles.pressedItem}
			>
				<Text style={styles.goal}>{itemData.item.value}</Text>
			</Pressable>
		</View>
	);
};

export default GoalItem;

const styles = StyleSheet.create({
	goals: {
		borderWidth: 1,
		borderColor: '#cccccc',
		borderRadius: 5,
		backgroundColor: '#015433',
	},
	goal: {
		fontSize: 18,
		color: '#fff',
		padding: 10,
		borderRadius: 5,
	},
	pressedItem: {
		backgroundColor: '#1cd98d',
		opacity: 0.5,
	},
});

/* <FlatList data=() alwaysBounceVertical={true}>
            <View style={styles.goalsView}>
              {arr.map((goal, index) => (
                <View
                  style={styles.goals}
                  key={index}
                >
                  <Text style={styles.goal}>{goal}</Text>
                </View>
              ))}
            </View>
          </FlatList> */
