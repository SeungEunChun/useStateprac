
import { useState } from 'react';
import './App.css';

function App() {
  const [week, weekchange] = useState(0);
  const weeklist = ["월", "화", "수", "목", "금", "토", "일"]
  const weekUpdate = (num) => {


    weekchange(num % 7); //week의 변수가 변경되고 랜더링됨
    //useState 변경함수만 연산식이 가능하다.


  }


  return (
    <div className="App">

      <button onClick={() => { weekUpdate(week + 1) }}>클릭</button>
      <p>{weeklist[week]}요일</p>
    </div>
  );
}

export default App;
