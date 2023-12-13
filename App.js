const express = require('express');
const app = express();

import { registerUser } from './controllers/registrationController';
import { loginUser } from './controllers/loginController';
import { resetPassword } from './controllers/resetPasswordController';

app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/resetPassword', resetPassword);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
