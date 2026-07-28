import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompleteTaskScreen } from '../screens/CompleteTaskScreen';
import { TaskListScreen } from '../screens/TaskListScreen';
import { DeletedTaskScreen } from '../screens/DeletedTaskScreen';

export type RootTabParamList = {
  TaskList: undefined;
  CompleteTask: undefined;
  Deleted: undefined;
};  

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (

    <Tab.Navigator>

      <Tab.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CompleteTask"
        component={CompleteTaskScreen}
        options={{
          title: 'Completed',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
      name="Deleted"
      component={DeletedTaskScreen}
      options={{
        title:'Deleted',
        tabBarIcon:()=>
          <Ionicons name="trash-outline"/>
      }}

      />
    </Tab.Navigator>
  );
}
