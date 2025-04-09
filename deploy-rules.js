const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if firebase-tools is installed
try {
  execSync('firebase --version', { stdio: 'ignore' });
} catch (error) {
  console.error('Firebase CLI is not installed. Please install it with: npm install -g firebase-tools');
  process.exit(1);
}

// Check if user is logged in
try {
  execSync('firebase projects:list', { stdio: 'ignore' });
} catch (error) {
  console.error('You are not logged in to Firebase. Please run: firebase login');
  process.exit(1);
}

// Deploy the rules
console.log('Deploying Firestore security rules...');
try {
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  console.log('Security rules deployed successfully!');
} catch (error) {
  console.error('Failed to deploy security rules:', error.message);
  process.exit(1);
} 