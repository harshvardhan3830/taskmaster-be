import { createProject, getProjectById, getProjects } from '../../controllers/projectController.ctr.js';

const authRoutes = (router) => {
    router.post('/create', createProject);
    router.get('/get', getProjects);
    router.get('/get/:id', getProjectById);
    return router;
};

export default authRoutes;
