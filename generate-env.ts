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
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      },
    };`
  );
}

if (!fs.existsSync(envDevFilePath)) {
  fs.writeFileSync(
    envDevFilePath,
    `export const environment = {
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      },
    };`
  );
}
