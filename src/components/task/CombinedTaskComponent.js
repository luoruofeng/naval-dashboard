import React, { useState, useEffect,useRef  } from 'react';
import TaskFilterForm from './TaskFilterForm';
import TaskTable from './TaskTable';
import { fetchData } from '../../libs/api'; // Replace this with your actual API request function
import './CombinedTaskComponent.module.css';

const CombinedTaskComponent = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [taskId, setTaskId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filterTasks, setFilterTasks] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading status

  const prevTaskIdRef = useRef(taskId);
  const prevSelectedStatusRef = useRef(selectedStatus);
  const prevSelectedTypeRef = useRef(selectedType);

  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  const [handleSuccess, setHandleSuccess] = useState(false);

  // Fetch data initially and when the component mounts
  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  // 当taskId selectedStatus selectedType发生变化时，重新过滤数据
  useEffect(() => {
    if (prevTaskIdRef.current === taskId && prevSelectedStatusRef.current === selectedStatus && prevSelectedTypeRef.current === selectedType) {
      return;
    }

    // 修改taskId selectedStatus selectedType时，重新过滤数据
    setFilterTasks(getFilteredTasks());
    
    // 更新ref保存的值为当前的值，以便下次渲染时使用
    prevTaskIdRef.current = taskId;
    prevSelectedStatusRef.current = selectedStatus;
    prevSelectedTypeRef.current = selectedType;
  }, [taskId,selectedStatus,selectedType]);
  

  useEffect(() => {
    setFilterTasks(getFilteredTasks());
  }, [tasks]);

  useEffect(() => {
    if (!handleSuccess) {
      return;
    }
    // 删除成功后，重新获取数据
    fetchDataFromAPI();
    setHandleSuccess(false);
  }, [handleSuccess]);
  

  // 当apiResponse或error发生变化时，4秒后清除alert
  useEffect(() => {
    // Clear the alerts after 4 seconds (4000 milliseconds)
    const timeout = setTimeout(() => {
      setApiResponse(null);
      setError(null);
    }, 4000);

    // Clear the timeout when the component unmounts or when apiResponse or error changes
    return () => clearTimeout(timeout);
  }, [apiResponse, error]);

  // 获取数据
  const fetchDataFromAPI = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/tasks', 'GET');
      console.log('Data fetched:', data);
      setTasks(data.tasks);
      if (data !== null){
        setApiResponse("获取数据成功");
      } 
      data.error ? setError(data.error) : setError(null);
    } catch (error) {
      setApiResponse(null);
      setError(error.message || 'Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 检查str2是否在str1的前后都有任意字符或没有字符
  function isMatchWithSurroundings(str1, str2) {
    // 使用正则表达式创建一个模式，检查str2是否在str1的前后都有任意字符或没有字符
    const pattern = new RegExp(`.*${str2}.*`);
    // 使用test方法检查str1是否与pattern匹配
    return pattern.test(str1);
  }

  // 获取过滤后的数据
  const getFilteredTasks = () => {
    const filteredTasks = tasks.filter((task) => {
      // Check if tasks is an array before filtering
      if (!Array.isArray(tasks)) {
        console.error('tasks is not an array or is not defined.');
        return [];
      }
      
      const typeMatch = selectedType === '' || task.Type === parseInt(selectedType);
      const statusMatch = selectedStatus === '' || task.StateCode === parseInt(selectedStatus);
      const idMatch = taskId === '' || isMatchWithSurroundings(task.Id,taskId);
      console.log('typeMatch:', typeMatch);
      console.log('statusMatch:', statusMatch);
      console.log('idMatch:', idMatch);
      
      return typeMatch && statusMatch && idMatch && task.Available === true;
    });
    return filteredTasks;
  };

  // Callback function to handle changes in filter values
  const onFilterChange = (type, status, id) => {
    setSelectedType(type);
    setSelectedStatus(status);
    setTaskId(id);
  };

  // 删除任务
  const deleteById = async (taskId) => {
    try {
      setLoading(true);
      const response = await fetchData(`/task/${taskId}`, 'DELETE');
      setApiResponse(response.message);
      response.error ? setError(response.error) : setError(null);

      // 删除成功后，重新获取数据
      setHandleSuccess(true);
    } catch (error) {
      setApiResponse(null);
      setError(error.message || 'An error occurred during the API request.');
    } finally {
      setLoading(false);
    }
  };


  // 执行任务
  const execById = async (taskId) => {
    try {
      setLoading(true);
      const response = await fetchData(`/task/exec/${taskId}`, 'POST');
      setApiResponse(response.message);
      response.error ? setError(response.error) : setError(null);
      // 执行成功后，重新获取数据
      setHandleSuccess(true);
    } catch (error) {
      setApiResponse(null);
      setError(error.message || 'An error occurred during the API request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      {
        apiResponse && (
        <div className="alert alert-primary" style={{ display: 'flex', justifyContent: 'flex-start' }} role="alert">
        {apiResponse}
        </div>
        )
      }

      {
        error && (
          <div className="alert alert-danger" role="alert">
          {error}
        </div>
        )
      }


      <TaskFilterForm
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        taskId={taskId}
        onFilterChange={onFilterChange}
      />
      
      {loading && ( // Conditionally render loading overlay and icon
        <div className="loading-overlay">
          <div className="loading-icon"></div> {/* Add your Bootstrap-style loading icon here */}
        </div>
      )}

      <TaskTable tasks={filterTasks} deleteById={deleteById} execById={execById} />
    </div>
  );
};

export default CombinedTaskComponent;
