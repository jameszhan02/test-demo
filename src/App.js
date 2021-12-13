import './App.css';
import React, { useState, useEffect } from 'react';
import jwtAxios from './service';
import StudentCard from './components/StudentCard/StudentCard.js';
function App() {

  const [students, setStudents] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [metaStudents, setMetaStudents] = useState([]);

  let nameList = [];
  let tagList = [];

  useEffect(() => {
    console.log("app.js page rendered!");
    jwtAxios.get('assessment/students').then(res => {
      console.log(res.data.students);
      setStudents(res.data.students);
      setMetaStudents(res.data.students);
      nameList = res.data.students;
      tagList = res.data.students;
    })
  }, []);

  useEffect(() => {
    console.log("new meata",metaStudents);
  }, [metaStudents]);

  useEffect(() => {
    searchFiliter();
  }, [searchTag, searchTxt]);


  const searchFiliter = () =>{
    let resList  = checkName(metaStudents, searchTxt);
    resList = checkTag(resList, searchTag);
    
    setStudents(resList);
  }

  const handleSearchChange = (e) => {
    console.log(metaStudents);
    console.log(e.target.value);
    setSearchTxt(e.target.value);
    // nameList = checkName(metaStudents, e.target.value);
    // // setStudents(checkName(metaStudents, e.target.value));
    // let resList = tagList.filter(function (v) { return nameList.indexOf(v) > -1 })
    // setStudents(nameList);
  }

  const handletagChange = (e) => {
    console.log(e.target.value);
    setSearchTag(e.target.value);
    // tagList = checkTag(metaStudents, e.target.value);
    // let resList = tagList.filter(function (v) { return nameList.indexOf(v) > -1 })
    // setStudents(tagList);
  }

  const checkName = (students, keyWord) => {
    let res = [];
    if (keyWord == "") {
      return students;
    }
    for (let i = 0; i < students.length; i++) {
      if (students[i].lastName.indexOf(keyWord) >= 0) {
        res.push(students[i]);
      } else if (students[i].firstName.indexOf(keyWord) >= 0) {
        res.push(students[i]);
      }
    }
    return res;
  }



  const triggerAddTag = (student, tags) => {
    console.log("meta slice ", metaStudents.slice());
    let newStudents = metaStudents.slice();
    for (let c = 0; c < newStudents.length; c++) {
      if (newStudents[c].id === student.id) {
        console.log("student matched:", newStudents[c]);
        newStudents[c]['tags'] = tags;
        break;
      }
    }
    setMetaStudents(newStudents);
  }

  const checkTag = (students, keyWord) => {
    let res = [];
    if (keyWord == "") {
      return students;
    }
    for (let i = 0; i < students.length; i++) {
      if (students[i]['tags']) {
        for(let c = 0; c < students[i].tags.length; c++){
          if(students[i].tags[c].indexOf(keyWord)  >= 0){
            res.push(students[i]);
            break;
          }
        }
      }
    }
    return res;
  }

  return (
    <div className='App'>
      <div className='scroll box-shadow'>
        <div className='topS'>
          <input className='search-bar' type="text" value={searchTxt}
            autoFocus onChange={handleSearchChange} placeholder="Search by name" />
          <input className='search-bar' type="text" value={searchTag}
            autoFocus onChange={handletagChange} placeholder="Search by tag" />
        </div>
        <div className='list'>
          {
            students.map(student => (
              <StudentCard trigger={triggerAddTag}  student={student}></StudentCard>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;