import React, { useState, useEffect } from 'react';
import './StudentCard.css';
function StudentCard(props) {
  //vars
  let student = props.student;
  const triggerAddTag = props.trigger;
  let sum = 0.0;
  const inputRef = React.createRef();
  const [isOpened, setIsOpened] = useState(false);
  let tags = [];
  if(student.tags){
    tags = student.tags;
  }
  // const [tags, setTags] = useState([]);
  // const [tagFlag, setTagFlag] = useState(true);

  for (let c = 0; c < student.grades.length; c++) {
    // console.log(student.grades[0]);
    sum += student.grades[0] * 1.0;
  }
  let average = sum / student.grades.length;
  student['average'] = average;



 
  //helper funcs
  const exClick = () => {
    if (isOpened) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  }


  const handleEnterKey = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      // setTags([...tags, e.target.value]);
      tags.push(e.target.value);
      triggerAddTag(student, tags);
      e.target.value = "";
    }
  }


  return (
    <div className="wrapper">
      <div className="studentcard-wrapper">
        <img className="avator" src={student.pic} alt="" />
        <div className="info-box">
          <div className='student-name to-left'>{student.firstName + ' ' + student.lastName}</div>
          <div className="email gray-txt-mr to-left">Email: {student.email} </div>
          <div className="company gray-txt-mr to-left">Company: {student.company} </div>
          <div className="skill gray-txt-mr to-left">Skill: {student.skill} </div>
          <div className="average gray-txt-mr to-left">Average: {student.average} % </div>
          {isOpened && (
            <div className='grade-detail'>
              {
                student.grades.map((test, index) => (
                  <div className='gray-txt-mr to-left'>Test &nbsp;{index + 1}: &nbsp;&nbsp;&nbsp;&nbsp;{test}%</div>
                ))
              }
            </div>
          )}
          <div className='tag-holder'>
            {tags.length > 0 && (
              tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                </div>
              ))
            )
            }
          </div>
          <input ref={inputRef} onKeyPress={handleEnterKey} className='input-s' type="text" placeholder='Add a tag' />
        </div>
        {isOpened && (
          <div className="exBtn" onClick={exClick}>-</div>
        )}
        {!isOpened && (
          <div className="exBtn" onClick={exClick}>+</div>
        )}
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default StudentCard;
