const  express = require('express')
const router = express.Router()
const { getTasks, createTask, deleteTask, updateTaskStatus ,getMyTasks,updateTask } = require('../controllers/taskController')
const { protectedRoute } = require('../middlewares/authMid')


router.use(protectedRoute);

router.get('/getTasks', getTasks)
router.get('/getMyTasks', getMyTasks)
router.post('/createTask', createTask)
router.post('/deleteTask/:id', deleteTask)
router.post('/updateTaskStatus/:id', updateTaskStatus)
router.post('/updateTask/:id', updateTask)



module.exports = router