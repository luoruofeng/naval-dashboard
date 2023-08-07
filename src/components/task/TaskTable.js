import React from 'react';
import styles from './TaskTable.module.css';
import TaskStatusCell from './TaskStatusCell';
import TaskTimeCell from './TaskTimeCell';
import ModalButton from './ModalButton';

const TaskTable = ({ tasks, deleteById, execById }) => {
  return (
    <div className={styles['task-table']}>
      <h3 className={styles['table-heading']}>Task Table</h3>
      <table className={styles['table']}>
        <thead>
          <tr>
            <th>MongoId</th>
            <th>Id</th>
            <th>Items</th>
            <th>Type</th>
            <th>CreatedAt</th>
            <th>PlanExecAt</th>
            <th>StateCode</th>
            <th>Kompose</th>
            <th>ExtDoneTime</th>
            <th>ConvertTime</th>
            {/* Add other table headers as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.Id}>
              <td>{task.MongoId}</td>
              <td>{task.Id}</td>
              <td>
                {task.Items ? (
                  JSON.stringify(task.Items).length > 20
                    ? JSON.stringify(task.Items).slice(0, 20) + "..."
                    : JSON.stringify(task.Items)
                ) : null}
              </td>
              <td>{task.Type === 1 ? "create":"convert"}</td>
              <TaskTimeCell time={task.CreatedAt} />
              <TaskTimeCell time={task.PlanExecAt} />
              <TaskStatusCell stateCode={task.StateCode} />
              <td>
                {task.Kompose ? (
                  JSON.stringify(task.Kompose).length > 10
                    ? JSON.stringify(task.Kompose).slice(0, 10) + "..."
                    : JSON.stringify(task.Kompose)
                ) : null}
              </td>
              
              <TaskTimeCell time={task.ExtDoneTime} />
              <TaskTimeCell time={task.ConvertTime} />
              {/* Add other table cells as needed */}
              <td>
                <ModalButton
                  buttonText="Detail"
                  modalTitle={task.Id}
                  modalText={JSON.stringify(task)}
                />

              {task.ExecResultIds && task.ExecResultIds.length > 1 && (
                <ModalButton
                  buttonText="Result"
                  modalTitle={task.Id}
                  url={`/taskresult/${task.Id}`}
                />
              )}


                {task.StateCode === 2 && (
                <button className={styles['btn-primary']} onClick={() => execById(task.Id)}>Execute</button>
                )}
                <button className={styles['btn-danger']} onClick={() => deleteById(task.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
