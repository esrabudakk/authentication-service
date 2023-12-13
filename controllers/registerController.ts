
import { createUser } from "../Register";

export const registerUser = (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;

        const newUser = {
            name,
            lastName,
            email,
            password,
        };

        createUser(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
