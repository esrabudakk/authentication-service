
import { checkUserCredentials } from '../Login';

export const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        const isCredentialsValid = checkUserCredentials(email, password);

        if (!isCredentialsValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
