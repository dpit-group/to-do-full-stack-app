import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';

type TaskItemProps = {
  id: string;
  text: string;
  selected: boolean;
  min:number;
  sec:number;
  hour:number;

  onToggle: (id: string) => void;
};

export function TaskItem({ id, text, selected, onToggle }: TaskItemProps) {
  return (
    <View style={styles.row}>
      <Checkbox value={selected} onValueChange={() => onToggle(id)} />
      <Text style={styles.text}>
        {text}
      </Text>

    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});
