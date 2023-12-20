
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [week, weekchange] = useState(0);
  const weeklist = ["월", "화", "수", "목", "금", "토", "일"]
  // const weekUpdate = (num) => {


  //   weekchange(num % 7); //week의 변수가 변경되고 랜더링됨
  //   //useState 변경함수만 연산식이 가능하다.


  // }
  const weekUpdate = () => {
    let count = (week + 1) % weeklist.length;
    weekchange(count);
    //버튼을 클릭할때마다 상위 콜백함수가 실행되는데 내부에서 태어나는 count는 이전의 week이 가진 과거연산합계에 + 1 한 값으로 태어나므로 밑에 weeklist[week]의 week 값이 절대 이전과 같을수 없다.
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      weekUpdate((week + 1) & weeklist.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [week]);



  //const weekUpdate = () =>{weekchange((week+1)%weeklist.length)}


  return (
    <div className="App">
      <ul className='d-flex tablist'>
        {
          weeklist.map((v, i) => {
            return <li className={week === i ? "act" : null}>{v}요일</li>

          })
        }
      </ul>
    </div>
  );
}

export default App;





//별코딩방법
//const weekUpdate = () =>{
// let count;
// if ( count >= 7 ){ count = 0 ; } else { count + 1 ; }
// }
