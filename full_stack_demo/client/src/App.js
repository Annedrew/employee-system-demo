import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    // parameters: (url, object)
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    })
    // handle the asynchronous result of the HTTP request
    .then(() => {
      setEmployeeList([
        ...employeeList, {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const showEmployee = () => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  };

  return (
    <div className="information">
      <label>Name: </label>
      <input type="text" onChange={(event) => {
        setName(event.target.value);
      }}/>
      <label>Age: </label>
      <input type="number" onChange={(event) => {
        setAge(event.target.value);
      }}/>
      <label>Country: </label>
      <input type="text" onChange={(event) => {
        setCountry(event.target.value);
      }}/>
      <label>Position: </label>
      <input type="text" onChange={(event) => {
        setPosition(event.target.value);
      }}/>
      <label>Wage: </label>
      <input type="number" onChange={(event) => {
        setWage(event.target.value);
      }}/>
      <button onClick={addEmployee}>Add Employee</button>
      <hr/>
      <div>
        <button onClick={showEmployee}>Show Employee</button>
        
        {employeeList.map((val, key) => (
        <div className="employee" key={key}>
          <div>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
