import React from 'react';

const TaskStatusCell = ({ stateCode }) => {
  // 映射关系对象
  const stateMap = {
    1: "Unknown",
    2: "Pending",
    3: "Running",
    4: "Wrong",
    5: "Executed",
    6: "ExecuteFailed",
  };

  // 使用映射关系获取状态文本
  const stateText = stateMap[stateCode] || "Unknown";

  return (
    <td>
      <span>{stateText}</span>
    </td>
  );
};

export default TaskStatusCell;
