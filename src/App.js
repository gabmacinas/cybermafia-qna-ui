import {useState, useEffect} from 'react';
import './App.css';
// import textBox from './img/text-box.png';
import capo from './img/capo.png';
import animatedTextBox from './img/textBox.gif';
import textBoxHandlerInput from './img/left_dia_box.png';
import init from './img/initiate.png';
// import contBtn from './img/contBtn.png';
import message1 from './img/text-1.png';
import message2 from './img/text-2.png';
import message3 from './img/text-3.png';
import message4 from './img/text-4.png';
import message5 from './img/text-5.png';
import message6 from './img/text-6.png';
import message7 from './img/text-7.png';
import message8 from './img/text-8.png';
import message9 from './img/text-9.png';
import message10 from './img/text-10.png';
import message11 from './img/text-11.png';
import message12 from './img/text-12.png';
import message13 from './img/text-13.png';
import message14 from './img/text-14.png';
import message15 from './img/text-15.png';
import message16 from './img/text-16.png';
import message17 from './img/text-17.png';
import message18 from './img/text-18.png';

function App() {
  const [currentMessage, setCurrentMessage] = useState(1);
  const [textBoxHandler, setTextBoxHandler] = useState(null);
  const [inputForm, setInputForm] = useState([]);
  let audio = new Audio('/sound.mp3');
  let click = new Audio('/click.wav');
  audio.volume = 0.5;
  audio.loop = true;
  
  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const continueBtn = () => {
    // check if audio is playing
    click.play();
    if (currentMessage === 1) audio.play();
    if (currentMessage >= 7 && currentMessage <= 13) {
      // focus
      document.getElementById('inputBox').focus();
      const inputVal = document.getElementById('inputBox').value;
      if (inputVal === '') {
        return;
      }
    }
    setCurrentMessage(current => current + 1);
    showNextMessage();
  }

  const showNextMessage = () => {
    document.getElementById(`msg${currentMessage - 1 }`).classList.add('hidden');
    document.getElementById(`msg${currentMessage}`).classList.remove('hidden');
    if (currentMessage >= 6 && currentMessage <= 14) {
      // document.getElementById('contBtn').classList.add('disable');
      // document.getElementById('contBtn').classList.remove('animate-flicker');
      const inputVal = document.getElementById('inputBox').value;
      setInputForm(inputForm => [...inputForm, inputVal.replace(/[^a-zA-Z0-9 @-]/g, '')]);
      document.getElementById('inputBox').value = '';
    } else if (currentMessage === 17) {
      document.getElementById('capo').classList.add('fade-out');
      document.getElementById('init').classList.add('fade-out');
      console.log(inputForm);
      // window.location.href = 'https://www.google.com';
      fetch('https://glmwjmund2.execute-api.us-east-1.amazonaws.com/submission', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${makeid(32)}`
        },
        body: JSON.stringify({data: inputForm})
      });
    }
  }

  const handleKeydown = (e) => {
    // check key if value is more than 3
    if (e.target.value.length > 3) {
      if (e.key === 'Enter') {
        continueBtn();
      } 
      // document.getElementById('contBtn').classList.remove('disable');
      // document.getElementById('contBtn').classList.add('animate-flicker');
    }
  };

  useEffect(() => {
      setTextBoxHandler('');
    setTimeout(() => {
      setTextBoxHandler(animatedTextBox)
    },10)
    setTimeout(() => {
      document.getElementById('msg1').classList.remove('hidden');
    },2000)
    setTimeout(() => {
      // document.getElementById('contBtn').classList.remove('hidden');
    },5000);
    // audio.loop = true;
  }, []);

  return (
    <div className='main-header'>
      <img src={textBoxHandler} alt='' className={`overlay`} />
      <img src={capo} id='capo' alt='' className='overlay show' />
      <img src={init} id='init' alt='' className='overlay show-left' />

      <img id='msg1' src={message1} alt='' className='overlay hidden' />
      <img id='msg2' src={message2} alt='' className='overlay hidden' />
      <img id='msg3' src={message3} alt='' className='overlay hidden' />
      <img id='msg4' src={message4} alt='' className='overlay hidden' />
      <img id='msg5' src={message5} alt='' className='overlay hidden' />
      <img id='msg6' src={message6} alt='' className='overlay hidden' />
      <img id='msg7' src={message7} alt='' className='overlay hidden' />
      <img id='msg8' src={message8} alt='' className='overlay hidden' />
      <img id='msg9' src={message9} alt='' className='overlay hidden' />
      <img id='msg10' src={message10} alt='' className='overlay hidden' />
      <img id='msg11' src={message11} alt='' className='overlay hidden' />
      <img id='msg12' src={message12} alt='' className='overlay hidden' />
      <img id='msg13' src={message13} alt='' className='overlay hidden' />
      <img id='msg14' src={message14} alt='' className='overlay hidden' />
      <img id='msg15' src={message15} alt='' className='overlay hidden' />
      <img id='msg16' src={message16} alt='' className='overlay hidden' />
      <img id='msg17' src={message17} alt='' className='overlay hidden' />
      <img id='msg17' src={message18} alt='' className='overlay hidden' />

      <img
        src={null}
        alt=''
        id='contBtn'
        className={`overlay hidden`}
        onClick={continueBtn}
      />
      <img
        src={textBoxHandlerInput}
        id='inputBoxBg'
        alt=''
        className={`overlay-flip input-box  ${currentMessage > 6 && currentMessage <= 14 ? 'show' : 'hidden'}`}
      />
      <input
        type='text'
        id='inputBox'
        name='inputBox'
        className={`input-overlay ${currentMessage > 6 && currentMessage <= 14 ? 'show' : 'hidden'}`}
        placeholder='Enter Here'
        onKeyDown={handleKeydown}
      ></input>
      {/* <img src={contBtn} alt="" id="disTxtBox" className="overlay cont-box animate-flicker show-border" /> */}
    </div>
  );
}

export default App;
