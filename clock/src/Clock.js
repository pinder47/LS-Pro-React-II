import React, { Component } from 'react';
/*import './Clock.css'; (Will add later)*/


export default class Clock extends Component{
  constructor(props){
    super(props);
    this.updateTime = this.updateTime.bind(this);
    this.state = {
      now: new Date()
    }
  }

  componentDidMount(){
   setInterval(this.updateTime, 1000);
 }

  updateTime(){
    this.setState({
        now: new Date()
    });
  }

  render(){

    //Hours, minutes, seconds, and AM/PM represented as text strings
    const timeText = {
      hour: ['Twelve','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven'],
      tens: ['', '', 'Twenty','Thirty','Forty','Fifty'],
      special: ['Ten', 'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'], //Specific words for when tens digit is 1
      ones: ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'],
    };

    let currentTime = "";

    //SET HOUR TEXT
    currentTime += timeText.hour[this.state.now.getHours() % 12];

    //MINUTES
    if (this.state.now.getMinutes() > 0){ //If there are minutes...

      //SET MINUTES TENS DIGIT
      if (this.state.now.getMinutes() < 10){ //If there is no minute tens digit...
        currentTime += "o'"; //...put in an " o' " to make the grammar work e.g., "Four o' seven"
      }

      else if (Math.floor(this.state.now.getMinutes() / 10) == 1){ //If the tens digit exists and is a 1...
      currentTime += " " + timeText.special[this.state.now.getMinutes() % 10]; //...use the appropriate word for the digit.
      }

      else {
      currentTime += " " + timeText.tens[Math.floor(this.state.now.getMinutes() / 10)]; //..otherwise, just use the word for the digit.
      }

      //SET MINUTES ONES DIGIT
      if (Math.floor(this.state.now.getMinutes() / 10) > 1 && this.state.now.getMinutes() % 10 != 0) { //If the minutes ones digit is not 0, and the minutes tens digit is not 0 OR 1...
        currentTime += "-" + timeText.ones[this.state.now.getMinutes() % 10];//...add a dash to make the grammar work before adding the word for the digit.
      }
      else if (Math.floor(this.state.now.getMinutes() /10) != 1) { //If the minutes tens digit is not 1...
        currentTime += " " + timeText.ones[this.state.now.getMinutes() % 10]; //...add a space to make the grammar work and add the word for the digit.
      }
    }

    //AM/PM
    if (this.state.now.getHours() > 11) //If it's after 11am...
      currentTime += " PM"; //...it's PM.
    else
      currentTime += " AM"; //...otherwise it's AM.

    //SECONDS
    if (this.state.now.getSeconds() > 0){ //If there are seconds...

      currentTime += " and"; //Making the grammar work.

      //SET SECONDS TENS DIGIT
      if (Math.floor(this.state.now.getSeconds() / 10) == 1){ //If the tens digit exists and is a 1...
        currentTime += " " + timeText.special[this.state.now.getSeconds() % 10]; //...add a space and use the appropriate word for that.
      }
      else {
        currentTime += " " + timeText.tens[Math.floor(this.state.now.getSeconds() / 10)]; //..otherwise, just use the word for the digit.
      }

      //SET SECONDS ONES DIGIT
      if (Math.floor(this.state.now.getSeconds() / 10) > 1 && this.state.now.getSeconds() % 10 != 0) //If the seconds ones digit is not zero AND the seconds tens digit is not zero or one…
        currentTime += "-" + timeText.ones[this.state.now.getSeconds() % 10];//...add a dash to make the grammar work before adding the word for the digit.
      else if (Math.floor(this.state.now.getSeconds() /10) != 1) { //If the seconds tens digit does is not 1...
        currentTime += " " + timeText.ones[this.state.now.getSeconds() % 10];//...add a space to make the grammar work before adding the word for the digit.
      }

      currentTime += " Second"; //Making the grammar work.
      if (this.state.now.getSeconds() > 1){ //If the seconds are plural...
       currentTime += "s"; //..add the 's' to make the grammar work.
      }
    }

  return(
        <div>
          {currentTime}
        </div>
      );
    }
  }
