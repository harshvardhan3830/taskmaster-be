import { login, register } from '../../controllers/authController.ctr.js';

const authRoutes = (router) => {
    router.get('/', (req, res) => {
        res.status(200).json({ message: 'Auth endpoint is working' });
    });
    router.post('/login', login);
    router.post('/register', register);
    return router;
};

export default authRoutes;
