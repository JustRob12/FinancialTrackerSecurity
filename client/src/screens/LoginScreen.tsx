import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { theme } from '../styles/theme';
import { AuthScreenProps } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{email?: string; password?: string}>({});
  
  // Get auth context
  const { login, isLoading, error } = useAuth();
  
  // Show auth errors
  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
    }
  }, [error]);

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    const success = await login(email, password);
    
    if (success) {
      // Navigate to Home screen or show success message
      Alert.alert('Success', 'You have successfully logged in!');
      // This would normally navigate to Home or Dashboard
      // navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Financial Tracker</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>
          </View>
          
          <View style={styles.form}>
            <FormInput 
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={formErrors.email}
            />
            
            <FormInput 
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={formErrors.password}
            />
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <Button 
              title="Log In" 
              onPress={handleLogin} 
              loading={isLoading}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.l,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
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
  form: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.m,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
  },
  footerText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 