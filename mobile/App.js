import React from 'react';
import { View, StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
])

export default function App() {
  return (
    <>
      <StatusBar barStyle = "dark-content" backgroundColor = "#7d40e7"/>
      <Routes/>
    </>
  );
}

