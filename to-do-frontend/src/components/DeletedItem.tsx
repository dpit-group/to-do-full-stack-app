
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


export function DeletedItem({ id, text, selected, onToggle,min,sec,hour }: TaskItemProps) {

  function Make2Digits(time:number)
  {
    let a=String(time)
    if(time>9)
      return a;
    else
      return "0"+a;
  }

  return (
    <View style={styles.row}>
      <Text style={styles.text}>
        {text}
        {"    deleted at "}
        {Make2Digits(hour)}{":"}{Make2Digits(min)}{":"}{Make2Digits(sec)}
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