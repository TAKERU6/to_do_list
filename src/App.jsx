import React, { Component } from "react";
import "./styles.css";
import Form from "./Form";
import Tasks from "./Tasks";

class App extends Component {
  state = {
    value: "",
    searchValue: "",
    editValue: "",
    tasks: [],
    selectedTasks: [],
    editTaskId: "",
    taskStatus: {
      all: true,
      done: false,
      notDone: false,
      search: false,
      sort: false
    },
    sortUpdatedList: []
  };

  handleChange = (event) => this.setState({ value: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { tasks, value } = this.state;
    const id = tasks.length + 1;
    const isSameTasks = tasks.some((item) => item.value === value);
    const isBlank = value === "";
    const isValidTask = isSameTasks || isBlank;
    if (isValidTask) {
      const errorMessage = isSameTasks
        ? "please write difference task"
        : "That is blank";
      return alert(errorMessage);
    }
    const createdAt = new Date().toLocaleString();

    this.setState({
      tasks: [...tasks, { id, value, done: false, createdAt }],
      value: ""
    });
  };

  selectedTask = (task) => {
    const { selectedTasks } = this.state;
    this.setState({ selectedTasks: [...selectedTasks, task] });
  };

  handleRemove = (task) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter((item) => item.id !== task.id);
    this.setState({
      tasks: newTasks
    });
  };

  removeTasks = (task) => {
    const { tasks, selectedTasks } = this.state;
    const newTasks = tasks.filter((i) => selectedTasks.indexOf(i) === -1);
    this.setState({
      tasks: newTasks,
      selectedTasks: []
    });
  };

  handleSearchChange = (event) =>
    this.setState({ searchValue: event.target.value });

  /*
  handleSearch = (event) => {
    event.preventDefault();
    const { tasks, searchValue } = this.state;
    return tasks.filter((item) => item.value === searchValue);
  };
  */

  handleEditChange = (event) =>
    this.setState({ editValue: event.target.value });

  editTask = (task) => {
    this.setState({
      editTaskId: task.id,
      editValue: ""
    });
  };
  handleUpdate = (task) => {
    const { editValue, tasks, sortUpdatedList } = this.state;
    const anotherTasks = tasks.filter((item) => item.id !== task.id);
    const updatedAt = new Date().toLocaleString();
    const newTask = {
      id: task.id,
      value: editValue,
      createdAt: task.createdAt,
      updatedAt: updatedAt
    };
    const newTasks = [...anotherTasks, newTask];
    this.setState({
      tasks: newTasks,
      editValue: "",
      editTaskId: "",
      sortUpdatedList: [...sortUpdatedList, newTask]
    });
  };

  handleChangeStatus = (task) => {
    const { tasks } = this.state;
    const done = !task.done;
    const anotherTasks = tasks.filter((item) => item.id !== task.id);
    const changeTask = { done, id: task.id, value: task.value };
    const changeTasks = [...anotherTasks, changeTask];
    this.setState({
      tasks: changeTasks
    });
  };

  handleTaskStatus = (e, status) => {
    e.preventDefault();
    switch (status) {
      case "all":
        this.setState({
          taskStatus: { all: true, done: false, notDone: false }
        });
        break;
      case "done":
        this.setState({
          taskStatus: { all: false, done: true, notDone: false }
        });
        break;
      case "notDone":
        this.setState({
          taskStatus: { all: false, done: false, notDone: true }
        });
        break;
      case "search":
        this.setState({
          taskStatus: { all: false, done: false, notDone: false, search: true }
        });
        break;
      case "sort":
        this.setState({
          taskStatus: {
            all: false,
            done: false,
            notDone: false,
            search: false,
            sort: true
          }
        });
        break;
      default:
    }
  };

  handleTaskSort = () => {
    const { taskStatus, tasks, searchValue } = this.state;
    if (taskStatus.all) return tasks;
    if (taskStatus.done) return tasks.filter((item) => item.done === true);
    if (taskStatus.notDone) return tasks.filter((item) => item.done === false);
    if (taskStatus.search)
      return tasks.filter((item) => item.value === searchValue);
    if (taskStatus.sort)
      return tasks.sort((a, b) => {
        return a.updatedAt < b.updatedAt ? 1 : -1;
      });
  };

  render() {
    const {
      value,
      searchValue,
      selectedTasks,
      editValue,
      editTaskId
    } = this.state;
    const isSlectedTasks = !!selectedTasks.length;
    const renderTasks = this.handleTaskSort();
    console.log(this.state.sortUpdatedList);

    return (
      <>
        <div className="searchForm">
          <Form
            value={searchValue}
            label={"Search:"}
            clickTitle={"Search"}
            onChange={this.handleSearchChange}
            onSubmit={this.handleTaskStatus}
          />
        </div>
        <div className="taskForm">
          <Form
            value={value}
            label={"Submit:"}
            clickTitle={"Submit"}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </div>

        <button onClick={(e) => this.handleTaskStatus(e, "all")}>all</button>
        <button onClick={(e) => this.handleTaskStatus(e, "done")}>done</button>
        <button onClick={(e) => this.handleTaskStatus(e, "notDone")}>
          notDone
        </button>
        <button onClick={(e) => this.handleTaskStatus(e, "sort")}>sort</button>

        <Tasks
          tasks={renderTasks}
          editValue={editValue}
          editTaskId={editTaskId}
          onChange={this.handleEditChange}
          onSubmit={this.editTask}
          onClick={this.handleRemove}
          selectedTask={this.selectedTask}
          handleUpdate={this.handleUpdate}
          handleChangeStatus={this.handleChangeStatus}
        />

        {isSlectedTasks && (
          <button onClick={this.removeTasks}>all selected tasks delete</button>
        )}
      </>
    );
  }
}
export default App;
