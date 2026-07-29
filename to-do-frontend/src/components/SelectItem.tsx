import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

type TaskItemProps = {
  id: string;
  text: string;
  selected: boolean;
  min:number;
  sec:number;
  hour:number;

  onToggle: (id: string) => void;
};


export function SelectItem({ id, text, onToggle }: TaskItemProps) {
  const [state, setState] = useState(0);

  const handlePress = () => {
    setState((prev) => (prev + 1) % 2);
    onToggle(id);
  };

  const buttonStyle =
    state === 0 ? styles.btnNormal :  styles.btnAlternate ;

  return (
    <View style={styles.row}>
      <Pressable style={[styles.button, buttonStyle]} onPress={handlePress}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
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
  button: {
    justifyContent:'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    height: 40,
    width: 120,
  },
  buttonText: {
    color: '#000',
    fontSize: 17,
  },
  btnNormal: {
    borderWidth: 2,
    backgroundColor:'#ff5757',
    width:1888
  },
  btnAlternate: {
    borderWidth: 2,
    backgroundColor:'#56f5fd',
    width:1888
  },
});
