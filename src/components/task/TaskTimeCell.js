import React from 'react';
import moment from 'moment';

const TaskTimeCell = ({ time }) => {
  // Check if time is empty or undefined
  if (!time) {
    return <td><span></span></td>;
  }

  // Use Moment.js to format the time
  const formattedTime = moment(time).format('YYYY-MM-DD HH:mm:ss');

  return (
    <td>
      <span>{formattedTime}</span>
    </td>
  );
};

export default TaskTimeCell;
