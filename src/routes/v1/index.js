import { Router } from 'express';
import authRoutes from './auth.rou.js';
import projectRoutes from './project.rou.js';
import taskRoutes from './task.rou.js';

const routes = (router) => {
    router.use('/auth', authRoutes(Router()));
    router.use('/project', projectRoutes(Router()));
    router.use('/task', taskRoutes(Router()));
    return router;
};

export default routes;
