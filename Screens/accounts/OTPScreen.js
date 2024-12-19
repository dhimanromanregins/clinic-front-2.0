import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, TouchableOpacity,ActivityIndicator } from 'react-native';
import {BASE_URL} from "../../Actions/Api"
import { useFonts } from 'expo-font';
import { Almarai_400Regular, Almarai_700Bold } from '@expo-google-fonts/almarai';


export default function OTPScreen({ navigation, route }) { 
  const { data } = route.params; 
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const [fontsLoaded] = useFonts({
    Almarai_400Regular,
    Almarai_700Bold,
  });

  useEffect(() => {
    if (isResendDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setIsResendDisabled(false); // Enable button when timer reaches 0
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isResendDisabled]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    if (value.length === 6) {
      const pastedOtp = value.split('').slice(0, 6);
      setOtp(pastedOtp);
    } else if (/^\d$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      const nextInput = index + 1;
      if (nextInput < 6) {
        inputs[nextInput].focus();
      }
    }
  };

  const ResendOtp = async () => {
    setIsLoading(true); // Show spinner before starting the process
    setIsResendDisabled(true); // Disable resend button
    setTimer(30); // Reset timer

    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        ToastAndroid.showWithGravity(
          `OTP Sent Successfully: ${responseData.message || 'Please check your phone'}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
      } else {
        ToastAndroid.showWithGravity(
          `Failed to Resend OTP: ${responseData.message || 'Invalid credentials. Please try again.'}`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Network error. Please try again later.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } finally {
      setIsLoading(false); // Hide spinner after request completion
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '' && index > 0) {
        const prevInput = index - 1;
        inputs[prevInput].focus();
        newOtp[prevInput] = ''; // Clear the previous input
      } else {
        newOtp[index] = ''; // Clear the current input
      }
      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      setIsLoading(true); // Start loading
      setError(''); // Reset previous error
      try {
        const response = await fetch(`${BASE_URL}/verify-otp/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp: otpCode }),
        });

        const data = await response.json();
        setIsLoading(false); // Stop loading
        if (response.ok) {
          ToastAndroid.show(`OTP successfully verified: ${data.message}`, ToastAndroid.SHORT);
          // Navigate to Home page after OTP verification
          navigation.navigate('Login');  // Navigate to the Home screen
        } else {
          ToastAndroid.show(data.error || 'Something went wrong', ToastAndroid.LONG);
        }
      } catch (error) {
        setIsLoading(false); // Stop loading
        setError('Network error or invalid server');
        ToastAndroid.show('Network error or invalid server', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Please enter a 6-digit OTP', ToastAndroid.LONG);
    }
  };

  const inputs = [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            returnKeyType="next"
            ref={(ref) => (inputs[index] = ref)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit OTP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          styles.resendButton,
          isResendDisabled && styles.resendButtonDisabled,
        ]}
        onPress={ResendOtp}
        disabled={isResendDisabled}
      >
        <Text style={styles.resendButtonText}>
          {isResendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2a4770',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderColor: '#2a4770',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    fontFamily: 'Almarai_400Regular',
  },
  submitButton: {
    backgroundColor: '#2a4770',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Almarai_700Bold',
  },
  resendButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  resendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  resendButtonText: {
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16,
  },
});
