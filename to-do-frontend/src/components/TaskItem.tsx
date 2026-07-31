import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';

type TaskItemProps = {
  id: string;
  text: string;
  selected: boolean;
  onToggle: (id: string) => void;
  subtitle?: string;
  showCheckbox?: boolean;
};

export function TaskItem({
  id,
  text,
  selected,
  onToggle,
  subtitle,
  showCheckbox = true,
}: TaskItemProps) {
  return (
    <View style={styles.row}>
      {showCheckbox ? (
        <Checkbox value={selected} onValueChange={() => onToggle(id)} />
      ) : null}
      <View style={styles.textColumn}>
        <Text style={styles.text}>{text}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
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
  textColumn: {
    flex: 1,
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#666',
  },
});
