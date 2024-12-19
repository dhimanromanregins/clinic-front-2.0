import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Modal, FlatList, Platform, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../../Actions/Api';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts } from 'expo-font';
import { Almarai_400Regular, Almarai_700Bold } from '@expo-google-fonts/almarai';

const AddKidsDetail = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [uaeId, setUaeId] = useState('');
  const [sex, setSex] = useState('');
  const [URN, setURNId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [nationality, setNationality] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [language, setLanguage] = useState('en');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState({});

  const showDatePicker = () => {
    setShow(true);
  };

  const [fontsLoaded] = useFonts({
    Almarai_400Regular,
    Almarai_700Bold,
  });

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {

      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateTime(formattedDate);
    }
  };


  const AddKidsDetail = language === 'en' ? "Add Kid's Detail" : 'أضف طفل';
  const UAENumber = language === 'en' ? 'UAE ID Number' : 'رقم الهويه الأماراتية';
  const URNNumber = language === 'en' ? 'URN Number' : 'رقم URN';
  const Sex = language === 'en' ? 'Sex' : 'الجنس';
  const Nationality = language === 'en' ? 'Nationality' : 'الجنسيه';
  const AddKid = language === 'en' ? 'Add Kid' : 'أضف طفل';
  const DOB = language === 'en' ? 'Date Of Birth' : 'تاريخ الميلاد';
  const InsuranceCompany = language === 'en' ? 'Insurance Company' : 'شركة التأمين';
  const InsuranceCompanyNumber = language === 'en' ? 'Insurance Number' : 'رقم التأمين';
  const FullNameasUAEID = language === 'en' ? 'Full Name as UAE ID' : 'ألأسم الكامل (حسب الهويه الأماراتية)';


  const toggleLanguage = async (selectedLanguage) => {
    try {
      setLanguage(selectedLanguage);
      await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving language to local storage:', error);
    }
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'العربية' },
  ];


  const handleClear = () => {
    setDateTime('');
    setShow(true);
  };

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

  const genderChoices = [
    { label: "None", value: "NONE" },
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" }

  ];
  const NationalityOptions = [
    { label: "None", value: "NONE" },
    { label: "Afghanistan", value: "AFG" },
    { label: "Albania", value: "ALB" },
    { label: "Algeria", value: "DZA" },
    { label: "Andorra", value: "AND" },
    { label: "Angola", value: "AGO" },
    { label: "Antigua and Barbuda", value: "ATG" },
    { label: "Argentina", value: "ARG" },
    { label: "Armenia", value: "ARM" },
    { label: "Australia", value: "AUS" },
    { label: "Austria", value: "AUT" },
    { label: "Azerbaijan", value: "AZE" },
    { label: "Bahamas", value: "BHS" },
    { label: "Bahrain", value: "BHR" },
    { label: "Bangladesh", value: "BGD" },
    { label: "Barbados", value: "BRB" },
    { label: "Belarus", value: "BLR" },
    { label: "Belgium", value: "BEL" },
    { label: "Belize", value: "BLZ" },
    { label: "Benin", value: "BEN" },
    { label: "Bhutan", value: "BTN" },
    { label: "Bolivia", value: "BOL" },
    { label: "Bosnia and Herzegovina", value: "BIH" },
    { label: "Botswana", value: "BWA" },
    { label: "Brazil", value: "BRA" },
    { label: "Brunei", value: "BRN" },
    { label: "Bulgaria", value: "BGR" },
    { label: "Burkina Faso", value: "BFA" },
    { label: "Burundi", value: "BDI" },
    { label: "Cabo Verde", value: "CPV" },
    { label: "Cambodia", value: "KHM" },
    { label: "Cameroon", value: "CMR" },
    { label: "Canada", value: "CAN" },
    { label: "Central African Republic", value: "CAF" },
    { label: "Chad", value: "TCD" },
    { label: "Chile", value: "CHL" },
    { label: "China", value: "CHN" },
    { label: "Colombia", value: "COL" },
    { label: "Comoros", value: "COM" },
    { label: "Congo (Congo-Brazzaville)", value: "COG" },
    { label: "Costa Rica", value: "CRI" },
    { label: "Croatia", value: "HRV" },
    { label: "Cuba", value: "CUB" },
    { label: "Cyprus", value: "CYP" },
    { label: "Czechia (Czech Republic)", value: "CZE" },
    { label: "Denmark", value: "DNK" },
    { label: "Djibouti", value: "DJI" },
    { label: "Dominica", value: "DMA" },
    { label: "Dominican Republic", value: "DOM" },
    { label: "Ecuador", value: "ECU" },
    { label: "Egypt", value: "EGY" },
    { label: "El Salvador", value: "SLV" },
    { label: "Equatorial Guinea", value: "GNQ" },
    { label: "Eritrea", value: "ERI" },
    { label: "Estonia", value: "EST" },
    { label: "Ethiopia", value: "ETH" },
    { label: "Fiji", value: "FJI" },
    { label: "Finland", value: "FIN" },
    { label: "France", value: "FRA" },
    { label: "Gabon", value: "GAB" },
    { label: "Gambia", value: "GMB" },
    { label: "Georgia", value: "GEO" },
    { label: "Germany", value: "DEU" },
    { label: "Ghana", value: "GHA" },
    { label: "Greece", value: "GRC" },
    { label: "Grenada", value: "GRD" },
    { label: "Guatemala", value: "GTM" },
    { label: "Guinea", value: "GIN" },
    { label: "Guinea-Bissau", value: "GNB" },
    { label: "Guyana", value: "GUY" },
    { label: "Haiti", value: "HTI" },
    { label: "Holy See", value: "VAT" },
    { label: "Honduras", value: "HND" },
    { label: "Hungary", value: "HUN" },
    { label: "Iceland", value: "ISL" },
    { label: "India", value: "IND" },
    { label: "Indonesia", value: "IDN" },
    { label: "Iran", value: "IRN" },
    { label: "Iraq", value: "IRQ" },
    { label: "Ireland", value: "IRL" },
    { label: "Israel", value: "ISR" },
    { label: "Italy", value: "ITA" },
    { label: "Jamaica", value: "JAM" },
    { label: "Japan", value: "JPN" },
    { label: "Jordan", value: "JOR" },
    { label: "Kazakhstan", value: "KAZ" },
    { label: "Kenya", value: "KEN" },
    { label: "Kiribati", value: "KIR" },
    { label: "Kuwait", value: "KWT" },
    { label: "Kyrgyzstan", value: "KGZ" },
    { label: "Laos", value: "LAO" },
    { label: "Latvia", value: "LVA" },
    { label: "Lebanon", value: "LBN" },
    { label: "Lesotho", value: "LSO" },
    { label: "Liberia", value: "LBR" },
    { label: "Libya", value: "LBY" },
    { label: "Liechtenstein", value: "LIE" },
    { label: "Lithuania", value: "LTU" },
    { label: "Luxembourg", value: "LUX" },
    { label: "Madagascar", value: "MDG" },
    { label: "Malawi", value: "MWI" },
    { label: "Malaysia", value: "MYS" },
    { label: "Maldives", value: "MDV" },
    { label: "Mali", value: "MLI" },
    { label: "Malta", value: "MLT" },
    { label: "Marshall Islands", value: "MHL" },
    { label: "Mauritania", value: "MRT" },
    { label: "Mauritius", value: "MUS" },
    { label: "Mexico", value: "MEX" },
    { label: "Micronesia", value: "FSM" },
    { label: "Moldova", value: "MDA" },
    { label: "Monaco", value: "MCO" },
    { label: "Mongolia", value: "MNG" },
    { label: "Montenegro", value: "MNE" },
    { label: "Morocco", value: "MAR" },
    { label: "Mozambique", value: "MOZ" },
    { label: "Myanmar (Burma)", value: "MMR" },
    { label: "Namibia", value: "NAM" },
    { label: "Nauru", value: "NRU" },
    { label: "Nepal", value: "NPL" },
    { label: "Netherlands", value: "NLD" },
    { label: "New Zealand", value: "NZL" },
    { label: "Nicaragua", value: "NIC" },
    { label: "Niger", value: "NER" },
    { label: "Nigeria", value: "NGA" },
    { label: "North Korea", value: "PRK" },
    { label: "North Macedonia", value: "MKD" },
    { label: "Norway", value: "NOR" },
    { label: "Oman", value: "OMN" },
    { label: "Pakistan", value: "PAK" },
    { label: "Palau", value: "PLW" },
    { label: "Palestine State", value: "PSE" },
    { label: "Panama", value: "PAN" },
    { label: "Papua New Guinea", value: "PNG" },
    { label: "Paraguay", value: "PRY" },
    { label: "Peru", value: "PER" },
    { label: "Philippines", value: "PHL" },
    { label: "Poland", value: "POL" },
    { label: "Portugal", value: "PRT" },
    { label: "Qatar", value: "QAT" },
    { label: "Romania", value: "ROU" },
    { label: "Russia", value: "RUS" },
    { label: "Rwanda", value: "RWA" },
    { label: "Saint Kitts and Nevis", value: "KNA" },
    { label: "Saint Lucia", value: "LCA" },
    { label: "Saint Vincent and the Grenadines", value: "VCT" },
    { label: "Samoa", value: "WSM" },
    { label: "San Marino", value: "SMR" },
    { label: "Sao Tome and Principe", value: "STP" },
    { label: "Saudi Arabia", value: "SAU" },
    { label: "Senegal", value: "SEN" },
    { label: "Serbia", value: "SRB" },
    { label: "Seychelles", value: "SYC" },
    { label: "Sierra Leone", value: "SLE" },
    { label: "Singapore", value: "SGP" },
    { label: "Slovakia", value: "SVK" },
    { label: "Slovenia", value: "SVN" },
    { label: "Solomon Islands", value: "SLB" },
    { label: "Somalia", value: "SOM" },
    { label: "South Africa", value: "ZAF" },
    { label: "South Korea", value: "KOR" },
    { label: "South Sudan", value: "SSD" },
    { label: "Spain", value: "ESP" },
    { label: "Sri Lanka", value: "LKA" },
    { label: "Sudan", value: "SDN" },
    { label: "Suriname", value: "SUR" },
    { label: "Sweden", value: "SWE" },
    { label: "Switzerland", value: "CHE" },
    { label: "Syria", value: "SYR" },
    { label: "Tajikistan", value: "TJK" },
    { label: "Tanzania", value: "TZA" },
    { label: "Thailand", value: "THA" },
    { label: "Timor-Leste", value: "TLS" },
    { label: "Togo", value: "TGO" },
    { label: "Tonga", value: "TON" },
    { label: "Trinidad and Tobago", value: "TTO" },
    { label: "Tunisia", value: "TUN" },
    { label: "Turkey", value: "TUR" },
    { label: "Turkmenistan", value: "TKM" },
    { label: "Tuvalu", value: "TUV" },
    { label: "Uganda", value: "UGA" },
    { label: "Ukraine", value: "UKR" },
    { label: "United Arab Emirates", value: "ARE" },
    { label: "United Kingdom", value: "GBR" },
    { label: "United States of America", value: "USA" },
    { label: "Uruguay", value: "URY" },
    { label: "Uzbekistan", value: "UZB" },
    { label: "Vanuatu", value: "VUT" },
    { label: "Venezuela", value: "VEN" },
    { label: "Vietnam", value: "VNM" },
    { label: "Yemen", value: "YEM" },
    { label: "Zambia", value: "ZMB" },
    { label: "Zimbabwe", value: "ZWE" },
];




  const insuranceChoices = [
    { label: "None", value: "NONE" },
    { label: "NAS", value: "NAS" },
    { label: "METLIFE", value: "METLIFE" },
    { label: "NEXTCARE", value: "NEXTCARE" },
    { label: "GLOBEMED", value: "GLOBEMED" },
    { label: "ADNIC", value: "ADNIC" },
    { label: "OPEN JET", value: "OPEN_JET" },
    { label: "DAMAN", value: "DAMAN" },
    { label: "THIQA", value: "THIQA" },
    { label: "AL KHAZNA", value: "AL_KHAZNA" },
    { label: "AXA", value: "AXA" },
    { label: "NEURON", value: "NEURON" },
    { label: "MEDNET", value: "MEDNET" },
    { label: "SUKOON", value: "SUKOON" },
    { label: "Wealth International", value: "Wealth_International" },
    { label: "Pentacare", value: "Pentacare" },
    { label: "AL Madallah", value: "AL_Madallah" },
    { label: "FMC - Metlife", value: "FMC_METLIFE" },
    { label: "Max Care", value: "Max_Care" },
    { label: "Afiya TPA", value: "Afiya_TPA" },
    { label: "NGI Healthnet", value: "NGI_Healthnet" },
    { label: "IRIS", value: "IRIS" },
    { label: "MSH", value: "MSH" }
  ];

  const validateFields = () => {
    const newErrors = {};

    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!uaeId) newErrors.uaeId = "UAE ID Number is required";
    if (!URN) newErrors.URN = "URN is required";
    if (!sex) newErrors.sex = "Gender is required";
    if (!nationality) newErrors.nationality = "Nationality is required";
    if (!insuranceCompany) newErrors.insuranceCompany = "Insurance Company is required";
    if (!dateTime) newErrors.dateTime = "Date of Birth is required";
    if (!insuranceNumber) newErrors.insuranceNumber = "Insurance Number is required";

    setErrors(newErrors); // Update errors state

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    const data = {
      full_name: fullName,
      child_id_number: uaeId,
      UAE_number: URN,
      gender: sex,
      nationality: nationality,
      insurance: insuranceCompany,
      insurance_number: insuranceNumber,
      date_of_birth: dateTime
    };

    try {
      const token = await AsyncStorage.getItem('access_token');

      if (!token) {
        console.log('No access token found');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/children/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.status === 201) {
        const result = await response.json();
        console.log('Submitted successfully:', result);
        ToastAndroid.show('Child added successfully!', ToastAndroid.SHORT);
        navigation.navigate('kids');
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Validation Errors:', errorData);
        ToastAndroid.show('Child Id or URN number already exist', ToastAndroid.LONG);

        const apiErrors = {};
        Object.keys(errorData).forEach(key => {
          apiErrors[key] = errorData[key].join(' ');
        });
        setErrors(apiErrors);
      } else {
        console.error('Failed to submit:', response.statusText);
        ToastAndroid.show('Failed to submit data. Please try again.', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.languageIcon} onPress={() => setIsModalVisible(true)}>
          <MaterialIcons name="language" size={34} color="white" />
        </TouchableOpacity>

      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="angle-left" size={34} color="rgba(24,212,184,255)" />
      </TouchableOpacity>
      {/* Modal for Language Selection */}
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

      {/* Main Content Section */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* Section Title */}
          <View style={styles.textSection}>
            <Text style={styles.text}>{AddKidsDetail}</Text>
            <View style={styles.borderLine} />
          </View>

          {/* Full Name Input */}
          <Text style={styles.label}>{FullNameasUAEID}</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          {/* UAE ID Number */}
          <Text style={styles.label}>{UAENumber}</Text>
          <TextInput
            style={styles.input}
            value={uaeId}
            onChangeText={setUaeId}
            keyboardType="numeric"
          />
          {errors.uaeId && <Text style={styles.errorText}>{errors.uaeId}</Text>}

          <Text style={styles.label}>{URNNumber}</Text>
          <TextInput
            style={styles.input}
            value={URN}
            onChangeText={setURNId}
            keyboardType="numeric"
          />
          {errors.URN && <Text style={styles.errorText}>{errors.URN}</Text>}

          {/* Gender Dropdown */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{Sex}</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={sex}
                  style={styles.picker}
                  onValueChange={setSex}
                >
                  {genderChoices.map((choice) => (
                    <Picker.Item key={choice.value} label={choice.label} value={choice.value} />
                  ))}
                </Picker>
              </View>
              {errors.sex && <Text style={styles.errorText}>{errors.sex}</Text>}
            </View>

            {/* Nationality Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{Nationality}</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={nationality}
                  style={styles.picker}
                  onValueChange={setNationality}
                >
                  {NationalityOptions.map((choice) => (
                    <Picker.Item key={choice.value} label={choice.label} value={choice.value} />
                  ))}
                </Picker>
              </View>
              {errors.nationality && <Text style={styles.errorText}>{errors.nationality}</Text>}
            </View>
          </View>

          {/* Insurance Company Dropdown */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{InsuranceCompany}</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={insuranceCompany}
                  style={styles.picker}
                  onValueChange={setInsuranceCompany}
                >
                  {insuranceChoices.map((choice) => (
                    <Picker.Item key={choice.value} label={choice.label} value={choice.value} />
                  ))}
                </Picker>
              </View>
              {errors.insuranceCompany && <Text style={styles.errorText}>{errors.insuranceCompany}</Text>}
            </View>

            {/* Date of Birth Input */}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{DOB}</Text>
0


              <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                  style={styles.dateInput}
                  value={dateTime}
                  onChangeText={setDateTime}
                  placeholder="(YYYY-MM-DD)"
                  placeholderTextColor="#A0A0A0"
                  editable={false}
                  maxLength={10}
                />
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
              {errors.dateTime && <Text style={styles.errorText}>{errors.dateTime}</Text>}

            </View>

          </View>

          {/* Insurance Number */}
          <Text style={styles.label}>{InsuranceCompanyNumber}</Text>
          <TextInput
            style={styles.input}
            value={insuranceNumber}
            onChangeText={setInsuranceNumber}
          />
          {errors.insuranceNumber && <Text style={styles.errorText}>{errors.insuranceNumber}</Text>}

          {/* Add Kid Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{AddKid}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    backgroundColor: 'rgba(24,212,184,255)', 
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    padding: 0,
    marginTop: 30,
  },

  textSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,

  },
  text: {
    fontSize: 20,
    color: '#2a4770',
    fontFamily: 'Almarai_700Bold',
  },
  borderLine: {
    width: '100%',
    height: 4,
    backgroundColor: '#2a4770',
    marginTop: 10,
  },
  languageIcon: {
    padding: 10,
  },
  backButton: {
    padding: 10,
  },
  label: {
    fontSize: 12                                                                       ,
    color: '#2a4770',
    marginBottom: 5,
    textAlign: 'right',
    fontFamily: 'Almarai_700Bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#2a4770',
    color: '#fff',
    height: 60,
    fontFamily: 'Almarai_400Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  halfWidth: {
    width: '48%', // Ensures both inputs take half width of the row
  },
  button: {
    backgroundColor: 'rgba(24,212,184,255)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,

  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Almarai_700Bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Almarai_400Regular',

  },

  inputContainer: {
    width: '48%', // Adjusting width slightly to account for any spacing
  },
  pickerContainer: {
    borderWidth: 1,
    backgroundColor: '#2a4770',
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',

  },
  picker: {
    height: 58,
    width: '100%',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    fontFamily: 'Almarai_700Bold',

  },
  languageText: {
    fontSize: 18,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#24d4b8',
    borderRadius: 5,
    alignItems: 'center',
  },
  dateInput: {
    textAlign: 'center',
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#2a4770',
    color: '#fff',
  },
});

export default AddKidsDetail;