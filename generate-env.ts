const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'environments');
const envFilePath = path.join(envDir, 'environment.ts');
const envDevFilePath = path.join(envDir, 'environment.development.ts');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

if (!fs.existsSync(envFilePath)) {
  fs.writeFileSync(
    envFilePath,
    `export const environment = {
      firebase: {
        apiKey: 'AIzaSyAmW_HumreBwhe-UIvhVuiUFtFYLC_7zWY',
        authDomain: 'auth-angular-d85b0.firebaseapp.com',
        projectId: 'auth-angular-d85b0',
        storageBucket: 'auth-angular-d85b0.appspot.com',
        messagingSenderId: '460788585618',
        appId: '1:460788585618:web:6acc26cdc29ad0f18e024b',
      },
    };`
  );
}

if (!fs.existsSync(envDevFilePath)) {
  fs.writeFileSync(
    envDevFilePath,
    `export const environment = {
      firebase: {
        apiKey: 'AIzaSyAmW_HumreBwhe-UIvhVuiUFtFYLC_7zWY',
        authDomain: 'auth-angular-d85b0.firebaseapp.com',
        projectId: 'auth-angular-d85b0',
        storageBucket: 'auth-angular-d85b0.appspot.com',
        messagingSenderId: '460788585618',
        appId: '1:460788585618:web:6acc26cdc29ad0f18e024b',
      },
    };`
  );
}
