import { useState, useEffect } from 'react';
import './App.css';
import capo from './img/capo.png';
import animatedTextBox from './img/textBox.gif';
import textBoxHandlerInput from './img/left_dia_box.png';
import init from './img/initiate.png';
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

function App() {
  const [currentMessage, setCurrentMessage] = useState(1);
  const [textBoxHandler, setTextBoxHandler] = useState(null);
  const [inputForm, setInputForm] = useState([]);
  let audio = new Audio('/sound.mp3');
  let click = new Audio('/click.wav');
  audio.volume = 0.5;
  click.volume = 0.5;
  audio.loop = true;

  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const continueBtn = () => {
    // check if audio is playing
    click.play();
    if (currentMessage === 1) audio.play();
    if (currentMessage >= 7 && currentMessage <= 12) {
      // focus
      document.getElementById('inputBox').focus();
      const inputVal = document.getElementById('inputBox').value;
      if (inputVal === '') {
        return;
      }
    }
    setCurrentMessage((current) => current + 1);
    showNextMessage();
  };

  const showNextMessage = () => {
    try {
      document.getElementById(`msg${currentMessage - 1}`).classList.add('hidden');
      document.getElementById(`msg${currentMessage}`).classList.remove('hidden');
      if (currentMessage >= 6 && currentMessage <= 12) {
        const inputVal = document.getElementById('inputBox').value;
        setInputForm((inputForm) => [...inputForm, inputVal.replace(/[^a-zA-Z0-9 @-]/g, '')]);
        document.getElementById('inputBox').value = '';
      } else if (currentMessage === 13) {
        fetch('https://glmwjmund2.execute-api.us-east-1.amazonaws.com/submission', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${makeid(32)}`,
          },
          body: JSON.stringify({ data: inputForm }),
        });
      } else if (currentMessage === 16) {
        document.getElementById('capo').classList.add('fade-out');
        document.getElementById('init').classList.add('fade-out');
        // settimeout 1 sec redirect
        setTimeout(() => {
          window.location.href = 'https://twitter.com/intent/tweet?text=I%20have%20completed%20my%20initiation%20for%20%40cybermafianft_%20%E2%9D%A4%EF%B8%8F%E2%80%8D%F0%9F%94%A5%0A%0AIf%20you%20haven%27t%20done%20yours,%20you%20can%20do%20it%20here%3A%0Ahttps%3A//apply.cybermafia.cc/%20%F0%9F%9A%AC%0A%0AMay%20the%20Godfather%20be%20in%20your%20favor%20%F0%9F%AB%A1%0A%0AMy%20Discord%20Username%3A%20%0A%23CYBERMAFIA';
        }, 1500);
      }
    } catch (e) {}
  };

  const handleKeydown = (e) => {
    if ((e.code >= 'KeyA' && e.code <= 'KeyZ') || e.code === 'Space') {
      let clickBtn = new Audio('/click.wav');
      clickBtn.play();
    }
    if (e.target.value.length >= 3) {
      if (e.key === 'Enter') {
        continueBtn();
      }
    }
  };

  useEffect(() => {
    setTextBoxHandler('');
    setTimeout(() => {
      setTextBoxHandler(animatedTextBox);
    }, 10);
    setTimeout(() => {
      document.getElementById('msg1').classList.remove('hidden');
    }, 2000);
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

      <img src={null} alt='' id='contBtn' className={`overlay hidden`} onClick={continueBtn} />
      <img
        src={textBoxHandlerInput}
        id='inputBoxBg'
        alt=''
        className={`overlay-flip input-box  ${currentMessage > 6 && currentMessage <= 12 ? 'show' : 'hidden'}`}
      />
      <input
        type='text'
        id='inputBox'
        name='inputBox'
        className={`input-overlay ${currentMessage > 6 && currentMessage <= 12 ? 'show' : 'hidden'}`}
        placeholder='Enter Here'
        onKeyDown={handleKeydown}
      ></input>
    </div>
  );
}

export default App;
