import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
const TaskTable = ({ }) => {
 
  const tasks = useSelector(state => state.tasks.tasks)

 

  const handleDelete = (index) => {
    // Handle delete logic here
  };

  const handleEdit = (index) => {
    // Handle edit logic here
  };

  const handleStatus = (index) => {
    // Handle status change logic here
  };

  const [activeRow, setActiveRow] = useState(null);
  const optionsRef = useRef(null);

  const toggleOptions = (index, event) => {
    event.stopPropagation();
    setActiveRow(activeRow === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    // <div className=" p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex  justify-center items-center">
    <div className="  p-4 mt-12 flex justify-center items-center">
      <table className=" bg-white  rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
              <td className="px-6 py-4 max-w-[200px] truncate">{task.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.assignedTo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right relative">
                <button
                  onClick={(event) => toggleOptions(index, event)}
                  className="p-1 rounded-md bg-transparent focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                    height="25x"
                    width="25px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 32.055 32.055"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
                    </g>
                  </svg>

                  {activeRow === index && (
                    <div
                      ref={optionsRef}
                      className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10"
                    >
                      <button
                        onClick={() => handleEdit(index)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleStatus(index)}
                        className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full text-left"
                      >
                        Change Status
                      </button>
                    </div>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    // </div>
  );
};

export default TaskTable;
