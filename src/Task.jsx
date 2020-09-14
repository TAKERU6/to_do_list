import React from "react";
const Task = ({
  editValue,
  editTaskId,
  task,
  onChange,
  onClick,
  selectedTask,
  onSubmit,
  handleUpdate,
  handleChangeStatus
}) => {
  const isDone = task.done;
  const isUpdateTask = editTaskId === task.id;

  return (
    <div>
      {task.value}
      {isUpdateTask && (
        <>
          <input type="text" value={editValue} onChange={onChange}></input>
          <button onClick={() => handleUpdate(task)}>change</button>
        </>
      )}
      <button onClick={() => onSubmit(task)}>edit</button>
      <button onClick={() => onClick(task)}>delete</button>
      <button onClick={() => selectedTask(task)}>select</button>
      <button onClick={() => handleChangeStatus(task)}>
        {isDone ? "done cancel" : "done"}
      </button>
      Create: {task.createdAt}
      Update: {task.updatedAt}
    </div>
  );
};
export default Task;
