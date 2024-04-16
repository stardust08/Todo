import axios from 'axios'
import { toast } from 'react-toastify'
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    tasks: [],
    isLoading: false,
    error: null,
}


const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        }
        ,
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id)
            state.tasks[index] = action.payload
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
        }
        ,



    },
    extraReducers: (builder) => {
        builder.addCase(getTasksApi.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getTasksApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks = action.payload
            toast.success('Tasks Loaded')
        })
        builder.addCase(getTasksApi.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload
            toast.error(action.payload?.message)
        })

        builder.addCase(createTaskApi.pending, (state) => {
            state.isLoading = true
        }
        )
        builder.addCase(createTaskApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks.push(action.payload)
            toast.success('Task Created')
        }
        )
        builder.addCase(createTaskApi.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            toast.error(action?.payload?.message)
        }
        )

        builder.addCase(updateTaskStatusApi.pending, (state) => {
            state.isLoading = true
        }
        )
        builder.addCase(updateTaskStatusApi.fulfilled, (state, action) => {
            state.isLoading = false
            const index = state.tasks.findIndex(task => task._id === action.payload._id)
            console.log("index", index)
            state.tasks[index] = action.payload
            toast.success('Task Status Updated')
        }
        )
        builder.addCase(updateTaskStatusApi.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            toast.error(action.payload)
        }
        )

        builder.addCase(deleteTaskApi.pending, (state) => {
            state.isLoading = true
        }
        )
        builder.addCase(deleteTaskApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
            toast.success('Task Deleted')
        }
        )
        builder.addCase(deleteTaskApi.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            toast.error(action.payload.message)
        }
        )

        builder.addCase(updateTaskApi.pending, (state) => {
            state.isLoading = true
        }
        )
        builder.addCase(updateTaskApi.fulfilled, (state, action) => {
            state.isLoading = false
            const index = state.tasks.findIndex(task => task._id === action.payload._id)
            state.tasks[index] = action.payload
            toast.success('Task Updated')
        }
        )
        builder.addCase(updateTaskApi.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            toast.error(action.payload.message)
        }
        )

    }
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions



export const getTasksApi = createAsyncThunk(
    'task/getTasks',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('https://taskmanagement-7yjx.onrender.com/api/task/getTasks', { withCredentials: true })
            console.log(data)
            return data?.tasks
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const createTaskApi = createAsyncThunk(
    'task/createTask',
    async (data, { rejectWithValue }) => {
        try {
            const { data: task } = await axios.post('https://taskmanagement-7yjx.onrender.com/api/task/createTask', data, { withCredentials: true })
            return task.task
        } catch (error) {
            return rejectWithValue(error.message)
        }

    }

)

export const updateTaskStatusApi = createAsyncThunk(
    'task/updateTaskStatus',
    async (updates, { rejectWithValue }) => {
        try {

            const { data: task } = await axios.post(`https://taskmanagement-7yjx.onrender.com/api/task/updateTaskStatus/${updates.taskId}`, updates, { withCredentials: true })
            console.log("updated", task.task)
            return task.task
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export const updateTaskApi = createAsyncThunk(
    'task/updateTask',
    async (update, { rejectWithValue }) => {
        try {
              
            
            const { data: task } = await axios.post(`https://taskmanagement-7yjx.onrender.com/api/task/updateTask/${update.taskId}`, update, { withCredentials: true })
            console.log("updated", task.task)
            return task.task
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }

)





export const deleteTaskApi = createAsyncThunk(
    'task/deleteTask',
    async (taskId, { rejectWithValue }) => {
        try {
           
            const  {data}  =  await axios.post(`https://taskmanagement-7yjx.onrender.com/api/task/deleteTask/${taskId}`, taskId, { withCredentials: true })
            console.log(data,"data",data._id)
            return data._id
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)




export default taskSlice.reducer
