export const filterMyTasks = (tasks, userId) => {
   
    const task = tasks.filter(task => task.assignedTo?._id === userId)
    
    return task
}

export const filterAssignedToOthers = (tasks, userId) => {
   
    const task = tasks.filter(task => task.assignedBy?._id === userId)
    
    return task
}



export const filterByStatus = (tasks, status) => {
    return tasks.filter(task => task.status === status)
}

export const filterByPriority = (tasks, priority) => {
    return tasks.filter(task => task.priority === priority)
}

export const filterByDate = (tasks, date) => {
    return tasks.filter(task => task.date === date)
}



