import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Tracker</Text>
        <Text style={styles.subtitle}>Welcome to your dashboard</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.full_name || 'User'}!
          </Text>
          
          <Text style={styles.emailText}>
            {user?.email || 'email@example.com'}
          </Text>
          
          <Text style={styles.messageText}>
            Your account is connected to the database. This is a simple home screen 
            that shows you're successfully logged in.
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textLight,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    width: '100%',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  emailText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.l,
  },
  messageText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.text,
    lineHeight: 24,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  logoutText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 