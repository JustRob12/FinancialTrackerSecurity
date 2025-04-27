import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { theme } from '../styles/theme';
import { AuthScreenProps } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Get auth context
  const { register, isLoading, error } = useAuth();

  // Show auth errors
  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error);
    }
  }, [error]);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    const success = await register(name, email, password, confirmPassword);
    
    if (success) {
      Alert.alert(
        'Registration Successful',
        'Your account has been created! You will now be logged in.',
        [
          {
            text: 'OK',
            // This would navigate to Home in a real app after registration
            // onPress: () => navigation.navigate('Home')
          }
        ]
      );
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>
          
          <View style={styles.form}>
            <FormInput 
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              error={formErrors.name}
            />
            
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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={formErrors.password}
            />
            
            <FormInput 
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={formErrors.confirmPassword}
            />
            
            <Button 
              title="Create Account" 
              onPress={handleRegister} 
              loading={isLoading}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log In</Text>
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
    marginBottom: theme.spacing.l,
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

export default RegisterScreen; 