import {useState} from "react";
import React from "react";
import "./App.css";


const List = () => {
  const [bookName, setBookName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [libraryName, setLibraryName] = useState("");
  const [libraryCampus, setLibraryCampus] = useState("");
  const [bookFind, setBookFind] = useState([{bookName: "", bookLocation:""}]);
  const [studentFind, setStudentFind] = useState([{bookName: "", studentId:"", libraryName:""}]);
  const [campusFind, setCampusFind] = useState([{bookName: "",  bookLocation:""}]);


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/activities", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bookName: bookName,
            libraryName: libraryName,
            studentId: studentId
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setBookName("");
          setLibraryName("");
          setStudentId("");
        })
        .catch(event => console.log('error:', event));
  };
    const handleDelete = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/activities", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookName: bookName,
                libraryName: libraryName,
                studentId: studentId
            }),
        })
            .then((response) => response.json())
            .then(() => {
                setBookName("");
                setLibraryName("");
                setStudentId("");
            })
            .catch(event => console.log('error:', event));
    };
    const handleSearch = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/books/name=" +bookName, {
            method: "GET",
           })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.length === 0){
                    alert("Oops! No " +bookName+ " can be found")
                }
                //setBookFind(JSON.stringify(data))
                setBookFind(data)

            })
            .catch(err => {
                console.log(err)
                setBookFind({});
                })
    }
    const handleStudent = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/activities/studentId=" +studentId, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.length === 0){
                    alert("Oops! No " +studentId+ " can be found")
                }
                //setBookFind(JSON.stringify(data))
                setStudentFind(data)

            })
            .catch(err => {
                console.log(err)
                setBookFind({});
            })
    }
    const handleCampus = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/books/campus=" +libraryCampus, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                //setBookFind(JSON.stringify(data))
                setCampusFind(data)

            })
            .catch(err => {
                console.log(err)
                setCampusFind({});
            })
    }


  return (
      <div>
        <div className="create-book" >
          <form>
              <fieldset>
                  <label>
                      <p>Student ID</p>
                      <input
                          type="text"
                          id="studentId"
                          name="studentId"
                          value={studentId}
                          onChange={(event) => setStudentId(event.target.value)}
                      />
                  </label>
              </fieldset>
            <fieldset>
              <label className={"select-dropdown"}>
                <p>Book Name</p>
                <select
                    id="bookName"
                    name="bookName"
                    value={bookName}
                    onChange={(event) => setBookName(event.target.value)}
                    //required
                    >
                    <option value=""></option>
                    <option value="Data Structure and Algorithms">Data Structure and Algorithms</option>
                    <option value="Database Design">Database Design</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Introduction to Statistics">Introduction to Statistics</option>
                    <option value="Linear Algebra">Linear Algebra</option>
                </select>
              </label>
            </fieldset>
              <fieldset>
                  <label className={"select-dropdown"} >
                      <p>Campus</p>
                      <select
                          id="libraryCampus"
                          name="libraryCampus"
                          value={libraryCampus}
                          onChange={(event) => setLibraryCampus(event.target.value)}
                      >
                          <option value=""></option>
                          <option value="Seattle">Seattle</option>
                          <option value="Tacoma">Tacoma</option>
                          <option value="Bothell">Bothell</option>
                      </select>
                  </label>
              </fieldset>
              <fieldset>
                  <label className={"select-dropdown"} >
                      <p>Library</p>
                      <select
                          id="libraryName"
                          name="libraryName"
                          value={libraryName}
                          onChange={(event) => setLibraryName(event.target.value)}
                      >
                          <option value=""></option>
                          <option value="suzzallo">Suzzallo</option>
                          <option value="Odegaard">Odegaard</option>
                          <option value="Tioga">Tioga</option>
                          <option value="UW Bothell">UW Bothell</option>
                      </select>
                  </label>
              </fieldset>
              <button className="borrow-book-button" type="submit" onClickCapture={handleStudent}>
                  Search ID
              </button>
              <button className="borrow-book-button" type="submit" onClickCapture={handleSearch}>
                  Search book
              </button>
            <button className="borrow-book-button" type="submit" onClick={handleSubmit}>
              Borrow book
            </button>
              <button className="borrow-book-button" type="submit" onClick={handleDelete}>
                  Return book
              </button>
              <button className="borrow-book-button" type="submit" onClickCapture={handleCampus}>
                  Campus
              </button>

          </form>
        </div>
          <table className="table">
              <thead>
              <tr>
                  <th>Book Name</th>
                  <th>Library</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>{campusFind.map(campusFind => <div>{campusFind.bookName}</div>)}</td>
                  <td>{campusFind.map(campusFind => <div>{campusFind.bookLocation}</div>)}</td>
              </tr>
              </tbody>
          </table>
          <table className="table">
              <thead>
              <tr>
                  <th>Book Name</th>
                  <th>Library</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>{bookFind.map(bookFind => <div>{bookFind.bookName}</div>)}</td>
                  <td>{bookFind.map(bookFind => <div>{bookFind.bookLocation}</div>)}</td>
              </tr>
              </tbody>
          </table>

          <table className="table">
              <thead>
              <tr>
                  <th>Student ID</th>
                  <th>Book Name</th>
                  <th>Library</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>{studentFind.map(studentFind => <div>{studentFind.studentId}</div>)}</td>
                  <td>{studentFind.map(studentFind => <div>{studentFind.bookName}</div>)}</td>
                  <td>{studentFind.map(studentFind => <div>{studentFind.libraryName}</div>)}</td>


              </tr>
              </tbody>
          </table>
      </div>
  );
};

export default List;

