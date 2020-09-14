import React from "react";
const Form = ({ value, onChange, onSubmit, label, clickTitle }) => {
  const isSearch = label === "Search:";
  return (
    <form
      onSubmit={isSearch ? (e) => onSubmit(e, "search") : (e) => onSubmit(e)}
    >
      {label}
      <input type="text" value={value} onChange={onChange}></input>
      <input type="submit" value={clickTitle}></input>
    </form>
  );
};
export default Form;
