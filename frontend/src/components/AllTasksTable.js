import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AllTasksTable = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTasks = tasks.filter(task =>
    (priorityFilter === '' || task.priority === priorityFilter) &&
    (dateFilter === '' || task.date === dateFilter) &&
    (searchFilter === '' || task.title.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handlePriorityFilterChange = e => {
    setPriorityFilter(e.target.value);
  };

  const handleDateFilterChange = e => {
    setDateFilter(e.target.value);
  };

  const handleSearchFilterChange = e => {
    setSearchFilter(e.target.value);
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100';
      case 'MEDIUM':
        return 'bg-yellow-100';
      case 'LOW':
        return 'bg-green-100';
      default:
        return '';
    }
  };

  return (

    <div className='w-full flex justify-center items-center'>
    <div className="p-4 mt-12">
      <div className="mb-4 flex flex-wrap items-center">
        <div className="mb-2 mr-4 flex items-center">
          <label htmlFor="priorityFilter" className="mr-2">
            Priority:
          </label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div className="mb-2 mr-4 flex items-center">
          <label htmlFor="dateFilter" className="mr-2">
            Date:
          </label>
          <input
            type="text"
            id="dateFilter"
            value={dateFilter}
            onChange={handleDateFilterChange}
            placeholder="Filter by date"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2 flex items-center">
          <label htmlFor="searchFilter" className="mr-2">
            Search:
          </label>
          <input
            type="text"
            id="searchFilter"
            value={searchFilter}
            onChange={handleSearchFilterChange}
            placeholder="Search by title"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className=" overflow-x-auto">
        <table className="bg-white rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <tr key={task?._id} className={ `${(task.status=='DONE')?'line-through bg-gray ':'no-underline' } ${ getPriorityColor(task?.priority)}`}>
                <td className="px-6 py-4 whitespace-nowrap">{task?.title}</td>
                <td className="px-6 py-4 max-w-[200px] truncate">{task?.description}</td>
                <td className="px-6 py-4 max-w-[200px] truncate">{task?.assignedBy?.firstname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task?.assignedTo?.firstname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task?.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task?.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AllTasksTable;
