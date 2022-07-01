import {
  Fascinate_400Regular,
  Jost_400Regular,
  Ranga_700Bold,
} from '@expo-google-fonts/dev';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootBottomTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

// --- Mood Screen ---
function MoodScreen(props: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h2}>Hello, how are how today?</Text>
      <Pressable onPress={() => props.navigation.navigate('SignIn')}>
        <Image
          source={require('./assets/images/sad.png')}
          style={styles.moodImage}
        />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('SignUp')}>
        <Image
          source={require('./assets/images/angry.png')}
          style={styles.moodImage}
        />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('SignIn')}>
        <Image
          source={require('./assets/images/tired.png')}
          style={styles.moodImage}
        />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('SignIn')}>
        <Image
          source={require('./assets/images/fine.png')}
          style={styles.moodImage}
        />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('SignIn')}>
        <Image
          source={require('./assets/images/great.png')}
          style={styles.moodImage}
        />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('SignIn')}>
        <Image
          source={require('./assets/images/love.png')}
          style={styles.moodImage}
        />
      </Pressable>
    </SafeAreaView>
  );
}

// --- Main Screen ---

type HomeScreenProps = BottomTabScreenProps<RootBottomTabParamList, 'Home'>;

function HomeScreen(props: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.homeScrollView}>
        <Text>Home Screen</Text>
        {/* first card */}
        <View style={[styles.subContainer, styles.elevation]}>
          <Text style={styles.h3}>How are you felling today?</Text>
          <Pressable onPress={() => props.navigation.navigate('Mood')}>
            <Text style={styles.moodSubtitle}>Let's check your mood!</Text>
          </Pressable>
        </View>
        {/* second card */}
        <View style={[styles.card, styles.elevation]}>
          <Image
            source={require('./assets/images/journal.png')}
            style={styles.journalImage}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Your personal journal</Text>
          </TouchableOpacity>
        </View>
        {/* third card */}
        <View style={[styles.card, styles.elevation]}>
          <Image
            source={require('./assets/images/meditation.png')}
            style={styles.journalImage}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Take a moment to relax</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastCard}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AccountScreen(props: HomeScreenProps) {
  return (
    <View>
      <Text>Account Screen</Text>
      <View>
        <View />
        <Text></Text>
      </View>
      <View>
        <Text>About you</Text>
        <View></View>
      </View>
      <View>
        <Text>Insights</Text>
        <View></View>
      </View>
      <View>
        <Text>Records</Text>
        <View></View>
      </View>
    </View>
  );
}

function DailyScreen(props: HomeScreenProps) {
  return (
    <View>
      <Text>Daily Screen</Text>
      <Pressable onPress={() => props.navigation.navigate('SignUp')}>
        <Text style={styles.signUpAnchor}>Sign up</Text>
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('SignIn')}>
        <Text style={styles.signUpAnchor}>Sign in</Text>
      </Pressable>
    </View>
  );
}

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Daily" component={DailyScreen} />
    </Tab.Navigator>
  );
}

// --- App ---

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignInScreen(props: SignUpScreenProps) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ Fascinate_400Regular, Jost_400Regular });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // function confirmPasswordsMatch(props) {
  //   const {
  //     nativeEvent: { text },
  //   } = props;

  //   if (text !== password) {
  //     alert('passwords do not match, please try again');
  //   }
  // }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Welcome on Kresko</Text>
      <Image
        source={require('./assets/images/image.png')}
        style={styles.image}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.h3}>Create account for</Text>
        <TextInput
          style={styles.input}
          placeholder="Are you teacher or a student?"
          onChangeText={setUserType}
        />
        <Text style={styles.h3}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="choose a username"
          onChangeText={setUsername}
        />
        <Text style={styles.h3}>Class</Text>
        <TextInput
          style={styles.input}
          placeholder="select a class"
          onChangeText={setSchoolClass}
        />
        <Text style={styles.h3}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.h3}>Confirm password</Text>
        <TextInput
          style={styles.inputLast}
          placeholder="Choose a password"
          onChangeText={setPassword}
          secureTextEntry={true}
          // onSubmitEditing={confirmPasswordsMatch}
        />
        <Button
          title="Create account"
          onPress={() => props.navigation.navigate('Main')}
        />
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.thirdContainer}>
        <Text style={styles.h4}>Already have an account?</Text>
        <Pressable onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={styles.signUpAnchor}>Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back on Kresko</Text>
      <Image
        source={require('./assets/images/cloud.png')}
        style={styles.cloudImage}
      />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.h3}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="choose a username"
          onChangeText={setUsername}
        />
        <Text style={styles.h3}>Password</Text>
        <TextInput
          style={styles.inputLast}
          placeholder="Choose a password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Sign up" onPress={() => navigation.navigate('Main')} />
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Mood" component={MoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDDBFB',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  scrollView: {
    height: '40%',
    width: '80%',
    // margin: 5,
    alignSelf: 'center',
    // padding: 5,
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },

  title: {
    top: 20,
    fontSize: 40,
    fontFamily: 'Fascinate_400Regular',
    textAlign: 'center',
  },

  h2: {
    fontFamily: 'Jost_400Regular',
    fontSize: 24,
    fontWeight: 'bold',
    top: 20,
    textAlign: 'center',
    marginBottom: 15,
  },

  h3: {
    fontFamily: 'Jost_400Regular',
    fontSize: 20,
    top: 20,
  },

  image: {
    top: 20,
    marginBottom: 20,
    bottom: 20,
    width: 160,
    height: 160,
  },

  cloudImage: {
    marginTop: 70,
    marginBottom: 40,
    width: 223.75,
    height: 114,
  },

  input: {
    height: 40,
    borderBottomWidth: 1,
    top: 10,
  },

  inputLast: {
    height: 40,
    borderBottomWidth: 1,
    top: 10,
    marginBottom: 40,
  },

  thirdContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 20,
    bottom: 15,
  },

  h4: {
    top: 10,
    fontSize: 18,
  },

  signUpAnchor: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },

  moodSubtitle: {
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },

  subContainer: {
    // flex: 1,
    top: 40,
    backgroundColor: '#F7E7FF',
    alignSelf: 'center',
    alignItems: 'center',
    width: 340,
    height: 120,
    borderWidth: 1,
    borderColor: '##262626',
    borderStyle: 'solid',
    borderRadius: 15,
  },

  elevation: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  card: {
    width: 340,
    height: 320,
    top: 80,
    backgroundColor: '#FFEFF9',
    marginBottom: 50,
    borderRadius: 20,
  },

  homeScrollView: {
    marginHorizontal: 20,
  },

  journalImage: {
    top: 5,
    marginBottom: 1,
    bottom: 60,
    width: 380,
    height: 240,
    alignSelf: 'center',
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: '#9D71CA',
    borderWidth: 1,
    borderColor: '##262626',
    borderStyle: 'solid',
    borderRadius: 10,
    alignSelf: 'center',
    bottom: 2,
    // top: 10,
  },

  buttonText: {
    top: 3,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  lastCard: {
    height: 150,
  },

  moodImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
