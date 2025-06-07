import { createTask, getTaskById, getTasks, updateTask, deleteTask } from '../../controllers/taskController.ctr.js';

const authRoutes = (router) => {
    router.post('/create', createTask);
    router.get('/get', getTasks);
    router.get('/get/:id', getTaskById);
    router.put('/update/:id', updateTask);
    router.delete('/delete/:id', deleteTask);
    return router;
};

export default authRoutes;
