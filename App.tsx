/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
  SectionList,
  useWindowDimensions,
  BackHandler,
  Alert,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DummyData from './dummyData';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [listData, setListData] = useState([1,2,3])
  const namesData = ["Harman", "Sachin", "Shiv", "Jashan"]

  const windowWidth = useWindowDimensions().width

  useEffect(() => {
    const backAction = () => {
      Alert.alert('You sure?', 'I know you are not', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // return () => backHandler.remove();
  }, []);

  const [inputText, setInputText] = useState('')

  const setData = async () => {
    if(inputText === ''){
      console.warn("Empty Input!")
    }else{
      await AsyncStorage.setItem('name', inputText)
    }
  }

  const getData = async () => {
    let name = await AsyncStorage.getItem('name')
    if(name === null || name === ''){
      console.warn("Data not found")
    }else{
      console.warn('Username : ', name)
    }
  }

  const removeData = async () => {
    await AsyncStorage.removeItem('name')
    console.warn("Data removed successfully")
  }

  return (
    // <Text style={{color: windowWidth > 600 ? 'red' : 'blue',}}>WIDTH : {windowWidth}</Text>
    
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />

    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>

    // </SafeAreaView>

    // <>
    // <Button title='Add Number' onPress={() => setListData([...listData, Math.max(...listData) + 1])}/>
    // <FlatList data={listData} renderItem={({item}) => <Text style={styles.listItem}>{item}</Text>} />

    // <SectionList sections={[{title: 'NAMES', data: namesData}, {title: 'LIST DATA', data: listData}]} renderItem={({item}) => <Text style={styles.sectionListItem}>{item}</Text>} renderSectionHeader={({section}) => <Text style={styles.sectionListHeader}>{section.title}</Text>} SectionSeparatorComponent={() => <View style={{height: 20}}></View>} ItemSeparatorComponent={(item) => <View style={{height: 5}}></View>} />
    // </>

    <>
      <View style={{margin: 15}}>
        <Text style={{fontSize: 25, width: '100%', textAlign: 'center', marginTop: 15, paddingBottom: 10}}>Async Storage</Text>
        <TextInput style={{borderColor: 'black', borderWidth: 2, fontSize: 17}} placeholder='Enter Name' onChangeText={newText => setInputText(newText)} />
        <View style={{marginTop: 10}}>
          <Button onPress={setData} title='Set Data' />
        </View>
        <View style={{marginTop: 5}}>
          <Button onPress={getData} title='Get Data' />
        </View>
        <View style={{marginTop: 5}}>
          <Button onPress={removeData} title='Delete Data' />
        </View>
      </View>

      <DummyData />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  sectionListHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sectionListItem: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
    color: 'seagreen',
  },
  listItem: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10
  }
});

export default App;
