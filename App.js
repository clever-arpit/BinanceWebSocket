import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import Theme from './src/utils/Theme';
import AppStack from './src/navigation/AppStack/AppStack';

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentTheme = isDarkMode ? Theme.black : Theme.white;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={currentTheme} barStyle={'dark-content'} />
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
