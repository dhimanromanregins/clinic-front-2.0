import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../Actions/Api';
import { useFonts } from 'expo-font';
import { Almarai_400Regular, Almarai_700Bold } from '@expo-google-fonts/almarai';

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      return token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  const [fontsLoaded] = useFonts({
    Almarai_400Regular,
    Almarai_700Bold,
  });

  const fetchNotifications = async () => {
    const token = await getAccessToken();

    if (!token) {
      Alert.alert('Error', 'Access token is missing.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/notifications/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        Alert.alert('Error', 'Failed to fetch notifications.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = await getAccessToken();

    if (!token) {
      Alert.alert('Error', 'Access token is missing.');
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/notifications/${notificationId}/`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_read: true }),
        }
      );

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, is_read: true }
              : notification
          )
        );
      } else {
        Alert.alert('Error', 'Failed to mark notification as read.');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="rgba(24,212,184,255)" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Notifications</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="angle-left" size={34} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            onPress={() => markAsRead(notification.id)}
            style={styles.notificationSection}
          >
            <Text
              style={[
                styles.rightAlignedText,
                notification.is_read && styles.readNotification,
              ]}
            >
              {notification.title}
            </Text>
            <Text style={styles.leftAlignedText}>{notification.body}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // paddingHorizontal: 20,
    paddingVertical: 30,
    // paddingTop:50
  },
  header: {
    width: '100%',
    backgroundColor: 'rgba(24,212,184,255)',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height:100
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Almarai_700Bold',
    color: '#fff',
    marginTop:40
  },
  notificationSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rightAlignedText: {
    fontSize: 16,
    fontFamily: 'Almarai_700Bold',
    color: '#2a4770',
    textAlign: 'right',
    marginBottom: 5,
  },
  readNotification: {
    color: '#9e9e9e',
  },
  leftAlignedText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    lineHeight: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default Notification;
