import { Tabs } from 'expo-router';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './home';
import ExploreScreen from './explore';
import ChatScreen from './chat';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
     screenOptions={{
       tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
       headerShown: false,
     }}>
     <Tabs.Screen
       name="index"
       options={{
         title: 'Home',
         tabBarIcon: ({ color, focused }) => (
           <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
         ),
       }}
     />
     <Tabs.Screen
       name="explore"
       options={{
         title: 'Explore',
         tabBarIcon: ({ color, focused }) => (
           <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
         ),
       }}
     />
     <Tabs.Screen
      name='chat'
      options={{
        title:'Chat',
        tabBarIcon:({color, focused}) => (
          <TabBarIcon name={focused? 'chatbubble-sharp': 'chatbubble-outline'} color={color}/>
        ),
      }}
      />
    </Tabs>
  );
}
