import { Router } from 'express';
import authRoutes from './auth.rou.js';
const routes = (router) => {
    router.use('/auth', authRoutes(Router()));
    return router;
};

export default routes;
