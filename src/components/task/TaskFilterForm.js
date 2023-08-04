import React from 'react';
import styles from './TaskFilterForm.module.css';

const TaskFilterForm = ({ selectedType, selectedStatus, taskId, onFilterChange }) => {
  const handleTypeChange = (event) => {
    onFilterChange(
      event.target.value,
      selectedStatus,
      taskId,
    );
  };

  const handleStatusChange = (event) => {
    onFilterChange(
      selectedType,
      event.target.value,
      taskId,
    );
  };

  const handleTaskIdChange = (event) => {
    onFilterChange(
      selectedType,
      selectedStatus,
      event.target.value,
    );
  };

  return (
    <div className={styles['task-filter-form']}>
        <div className={styles['form-group']}>
          <label>Task Type:</label>
          <select
            className={styles['form-control']}
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">All</option>
            <option value="1">Create Task</option>
            <option value="2">Transform Task</option>
          </select>
        </div>
        <div className={styles['form-group']}>
          <label>Task Status:</label>
          <select
            className={styles['form-control']}
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="1">Unknown</option>
            <option value="2">Pending</option>
            <option value="3">Running</option>
            <option value="4">Wrong</option>
            <option value="5">Executed</option>
            <option value="6">ExecuteFailed</option>
          </select>
        </div>
        <div className={styles['form-group']}>
          <label>Task Id:</label>
          <input
            type="text"
            className={styles['form-control']}
            value={taskId}
            onChange={handleTaskIdChange}
            placeholder="Enter Task Id"
          />
        </div>
      </div>
  );
};

export default TaskFilterForm;
