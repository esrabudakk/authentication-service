import { updateCredentials } from '../ResetPassword';

export const resetPassword = (req, res) => {
    try {
        const { userId, newPassword } = req.body;

        updateCredentials(userId, newPassword);

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
