import React from "react";
import Task from "./Task";
const Tasks = ({
  editValue,
  editTaskId,
  tasks,
  onChange,
  onClick,
  selectedTask,
  onSubmit,
  handleUpdate,
  handleChangeStatus
}) => (
  <>
    {tasks.map((task) => (
      <Task
        key={task.id}
        editValue={editValue}
        editTaskId={editTaskId}
        task={task}
        onChange={onChange}
        onClick={onClick}
        onSubmit={onSubmit}
        selectedTask={selectedTask}
        handleUpdate={handleUpdate}
        handleChangeStatus={handleChangeStatus}
      />
    ))}
  </>
);
export default Tasks;
