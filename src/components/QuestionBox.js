import React, { useState, useEffect } from "react";
import "../App.css";
import questions from "../questions";

function App() {
  const [showFinalResult, setFinalResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currQestion, setCurrQuestion] = useState(0)
  const [theme, setTheme] = useState(true)
  const [themeName, setThemeName] = useState("dark")
  const [textcol,settextcol] = useState('blue')  

  const optionClicked =(isCorrect) =>{
        if(isCorrect){
        setScore(score+1)
        }
        if(currQestion+1<questions.length){
        setCurrQuestion(currQestion+1)
        }
        else{
        setFinalResult(true)
        }
    }

  const restartGame = ()=>{
        setScore(0);
        setCurrQuestion(0);
        setFinalResult(false)
    }
  
  const handleToggle = ()=>{
        setTheme(theme?false:true);
    }

  const changeColor = ()=>{
        if(textcol==='blue')
        {settextcol('red')}
        else{
        settextcol('blue')
        }
    }
  
    function backGroundColors(color){
        document.body.style.backgroundColor = color? "#6e6a6a":"white";
        return{
        backgroundColor : color? "#6e6a6a":"white",
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{setThemeName(themeName==="light"?"Dark":"Light")},[theme])

  return (
    <div className="App"  style={backGroundColors(theme)}>
        <div className="head">
            <h1 className="kalvium">Kalvium Quiz</h1>
            <div> <button className="toggle-button" onClick={handleToggle}  >{themeName}</button></div>
        </div>

        <h2 className="curr-score">Current Score: {score}</h2>

            { showFinalResult ? (
                <div className="final-result">
                <h1>Final Results</h1>
                <h2>{score} out of {questions.length} correct - ({(score/questions.length)*100}%)</h2>
                <button onClick={()=> restartGame()}>Restart Game</button>
            </div>
        ):
      
        (<div className="question-card">
            <h2 >Question {currQestion+1} out of {questions.length}</h2>
            <h3 style={{color:`${textcol}`}} className="question-text">{questions[currQestion].text}</h3>
            <ul>
                {questions[currQestion].options.map((options)=>{
                return <li onClick={()=> optionClicked(options.isCorrect)}>{options.text}</li>})}
            </ul>
        
        <div > <button onClick={()=>changeColor()}>Highlight</button> </div>

      </div>
      )}
    </div>
  );
}

export default App;