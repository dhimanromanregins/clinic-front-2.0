import React ,{useState, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , Modal, FlatList} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Almarai_400Regular, Almarai_700Bold } from '@expo-google-fonts/almarai';

const RequestWhoMayIConcern = ({ route,navigation }) => {
  const { childData } = route.params;
  const childId = childData.id
  const [language, setLanguage] = useState('en');
  const [isModalVisible, setIsModalVisible] = useState(false);



  const SickLeave = language === 'en' ? 'Who May It concern' : 'الي من يهمه الأمر';
  const SickLeaveRecords = language === 'en' ? 'Records' : 'طلب سابق';
  const SickLeaveRequest = language === 'en' ? 'Request Records' : 'طلب الي من يهمه األمر';

  const toggleLanguage = async (selectedLanguage) => {
    try {
      setLanguage(selectedLanguage);
      await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving language to local storage:', error);
    }
  };
  const [fontsLoaded] = useFonts({
      Almarai_400Regular,
      Almarai_700Bold,
    });

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'العربية' },
  ];


  useFocusEffect(
    useCallback(() => {
      const loadSelectedLanguage = async () => {
        try {
          const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
          if (savedLanguage) {
            setLanguage(savedLanguage);
            console.log(`Loaded language from storage: ${savedLanguage}`); // Debugging log
          }
        } catch (error) {
          console.error('Error loading language from local storage:', error);
        }
      };

      loadSelectedLanguage(); // Invoke the function to load the language
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
    {/* Header Section - Full width */}
    <View style={styles.header}>
      {/* Language Switcher Icon */}
      <TouchableOpacity 
        style={styles.languageIcon} 
        onPress={() => setIsModalVisible(true)}
      >
        <MaterialIcons name="language" size={34} color="white" />
      </TouchableOpacity>

      {/* Back Button Icon */}
    
    </View>
    <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <FontAwesome name="angle-left" size={34} color="rgba(24,212,184,255)" />
      </TouchableOpacity>
    {/* Scrollable Content */}
    <ScrollView style={styles.container}>
    <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={languages}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => toggleLanguage(item.code)} style={styles.languageOption}>
                    <Text style={styles.languageText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.code}
              />
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      
      {/* Title Section */}
      <View style={styles.textSection}>
        <Text style={styles.text}> {SickLeave}</Text>
        <View style={styles.borderLine} />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
        {/* Request Leave Button */}
        <TouchableOpacity 
          style={[styles.button, styles.greenBackground]} 
          onPress={() => navigation.navigate('WhomeItMayCocern')}
        >
          <Text style={styles.buttonText}>{SickLeaveRequest}</Text>
        </TouchableOpacity>

        {/* Sick Leave History Button */}
        <TouchableOpacity 
          style={[styles.button, styles.greenBackground]} 
          onPress={() =>navigation.navigate('ConcernRecords', { childId: childId })}
        >
          <Text style={styles.buttonText}>{SickLeaveRecords}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    header: {
      width: '100%',
      backgroundColor: 'rgba(24,212,184,255)', 
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: 'row', 
      alignItems: 'center',
      marginTop:32,
      height:80,
    },
    languageIcon: {
      marginRight: 15,
    },
    backButton: {
      marginLeft: 10,
    },
    textSection: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 20,
    },
    text: {
      fontSize: 20,
      fontFamily: 'Almarai_700Bold',
      color: '#2a4770',
    },
    borderLine: {
      height: 4,
      backgroundColor: '#2a4770',
      marginTop: 10,
      alignSelf: 'stretch', // Ensures it spans the parent's full width
    },
    buttonSection: {
      marginTop: 30,
    },
    button: {
      paddingVertical: 15,
      marginBottom: 15,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'flex-end', // Align text to the right
    },
    greenBackground: {
      backgroundColor: 'rgba(24,212,184,255)', // Green color for the background
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Almarai_700Bold',
      color: '#2a4770',
      marginRight: 10, // Text alignment right
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Background overlay
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    languageOption: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    languageText: {
      fontSize: 18,
      color: 'black',
      fontFamily: 'Almarai_700Bold',
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#24d4b8',
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#2a4770',
      fontFamily: 'Almarai_700Bold',
      fontSize: 16, 
  
    },
  });
export default RequestWhoMayIConcern;
