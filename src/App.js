
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [week, weekchange] = useState(0);//컨텐츠를 옮겨다니는 useState
  const weeklist = ["월", "화", "수", "목", "금", "토", "일"]
  const weekcontent = [
    {
      subject: "월요일싫어",
      content: "그냥월요일싫어"
    },
    {
      subject: "화요일싫어",
      content: "그냥화요일싫어"
    },
    {
      subject: "수요일싫어",
      content: "그냥수요일싫어"
    },
    {
      subject: "목요일싫어",
      content: "그냥목요일싫어"
    },
    {
      subject: "금요일좋아",
      content: "내일주말이야"
    },
    {
      subject: "토요일좋아",
      content: "근데왜이리빨리가?"
    },
    {
      subject: "일요일좋아",
      content: "왜벌써내일월요일?"
    },
  ]
  const [isPaused, setPaused] = useState(false);//useEffect를 제어할 useState
  // const weekUpdate = (num) => {


  //   weekchange(num % 7); //week의 변수가 변경되고 랜더링됨
  //   //useState 변경함수만 연산식이 가능하다.


  // }


  const weekUpdate = () => {
    if (!isPaused) {
      let count = (week + 1) % weeklist.length;
      weekchange(count);
    }
    //버튼을 클릭할때마다 상위 콜백함수가 실행되는데 내부에서 태어나는 count는 이전의 week이 가진 과거연산합계에 + 1 한 값으로 태어나므로 밑에 weeklist[week]의 week 값이 절대 이전과 같을수 없다.
  }

  const handleItemClick = (index) => {
    weekchange(index); //useEffect 진행!
    setPaused(true); //useEffect 정지!

    setTimeout(() => {
      setPaused(false);
      weekUpdate();
    }, 2000);
  }




  useEffect(() => {
    //isPaused 값에 따라 weekUpdate가 아무것도 없이 진행되면 week의 값이 변화가 없음,
    //변화가 없다면 useEffect가 진행되지 않는다.
    const intervalId = setInterval(weekUpdate, 1000);

    return () => clearInterval(intervalId);
  }, [week, isPaused]);







  //const weekUpdate = () =>{weekchange((week+1)%weeklist.length)}


  return (
    <div className="App">
      <ul className='d-flex tablist'>
        {
          weeklist.map((v, i) => {
            return <li key={i} onClick={() => handleItemClick(i)} className={week === i ? "act" : null}>{v}요일</li>

          })
        }
      </ul>
      <div>
        <strong>{weekcontent[week].subject}</strong>
        <p>{weekcontent[week].content}</p>
      </div>
    </div>
  );
}

export default App;





//별코딩방법
//const weekUpdate = () =>{
// let count;
// if ( count >= 7 ){ count = 0 ; } else { count + 1 ; }
// }


// const handleItemClick = (index) => { // 랜더링 2번진행
//weekchange(index); // week 변경 -> useEffect을 통한 -> 데이터 가져와서 화면 변경됨
//setPaused(true); // 화면변경되나 -> week값이 똑같아서 -> useEffect 죽어버림
//  }

//useState는 값이 같으면 랜더링 안함 / useEffect은 디펜던시에 있는 useState변수값이 수정될때 만 함