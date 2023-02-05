import './normal.css';
import './App.css';
import { useState, useEffect } from 'react';

import logo from './logo2.png';

function App() {

  const [input, setInput] = useState('');
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "Hi there! How can I help you?",
    }
  ]);

  // clear chats
  function clearChats() {
    setChatLog([]);
  }

  function getEngines() {
    fetch('http://localhost:3080/models')
      .then(response => response.json())
      .then(data => {
        // console.log(data.models)
        setModels(data.models)
      });
  }

  // call get engines function in useeffect
  useEffect(() => {
    getEngines()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]

    setInput("");
    setChatLog(chatLogNew)

    // fetch response to the api combining the chat log array of messages and sending it as a message to localhost:3000 as a post
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messages,
        currentModel
      }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
    console.log("Message from GPT", data.message);
  }

  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={clearChats}>
          <span>+</span>
          New Chat
        </div>
        <div className='sidemenu-title-container'>
          <h1>
            ENHANCED CHATGPT
          </h1>
          <img src={logo} alt='logo'width={70} />
          <p>by Harshit Garg</p>
        </div>
        <div className='models'>
          <h3>Models</h3>
          <select
            className='model-select'
            onChange={(e) => setCurrentModel(e.target.value)}
            defaultValue='text-davinci-003'
          >
            {models.map((model, index) => (
              <option
                key={index}
                value={model.id}
              >
                {model.id}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage
              message={message}
              key={index}
            />
          ))}
        </div>
        <div className='chat-input-holder'>
          <div className='chat-input-form-holder'>
            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='chat-input-textarea'
                rows={1}
              ></input>
              <button className='chat-input-button' type='submit'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  width="25" 
                  height="25" 
                  viewBox="0 0 256.000000 256.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
                    fill="#ffffff" stroke="none">
                    <path d="M1260 2074 c-705 -265 -1210 -461 -1217 -471 -7 -9 -13 -21 -13 -27
                            0 -5 101 -112 225 -236 l225 -226 -50 -349 c-49 -341 -50 -350 -31 -368 18
                            -18 26 -17 342 56 l324 76 250 -250 c138 -137 255 -249 261 -249 6 0 18 6 27
                            13 15 10 909 2365 924 2433 5 24 -21 55 -45 53 -9 -1 -559 -206 -1222 -455z
                            m61 -336 l-783 -541 -181 181 c-100 100 -179 183 -177 185 8 5 1904 715 1914
                            716 5 1 -343 -243 -773 -541z m960 355 c-10 -27 -175 -466 -366 -978 -192
                            -511 -350 -932 -352 -935 -2 -2 -96 88 -209 202 l-206 205 572 777 c315 427
                            574 776 576 776 2 0 -5 -21 -15 -47z m-261 4 c0 -1 -341 -343 -758 -760 l-759
                            -759 38 263 c25 174 42 265 51 270 7 4 330 228 718 497 725 504 710 494 710
                            489z m-78 -259 c-38 -51 -252 -343 -477 -648 -224 -305 -409 -557 -411 -559
                            -2 -2 -105 -27 -230 -56 l-226 -52 703 703 c387 387 705 704 707 704 1 0 -29
                            -42 -66 -92z"
                      />
                  </g>
                </svg>
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className='chat-message-center'>
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" &&
            <svg
              width="32"
              height="32"
              data-name="OpenAI Logo"
              viewBox="140 140 520 520"
            >
              <path
                fill="white"
                d="M617.24 354a126.36 126.36 0 00-10.86-103.79 127.8 127.8 0 00-137.65-61.32 126.36 126.36 0 00-95.31-42.49 127.81 127.81 0 00-121.92 88.49 126.4 126.4 0 00-84.5 61.3 127.82 127.82 0 0015.72 149.86 126.36 126.36 0 0010.86 103.79 127.81 127.81 0 00137.65 61.32 126.36 126.36 0 0095.31 42.49 127.81 127.81 0 00121.96-88.54 126.4 126.4 0 0084.5-61.3A127.82 127.82 0 00617.24 354zM426.58 620.49a94.79 94.79 0 01-60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 008.3-14.37V381.69l42.69 24.65a1.52 1.52 0 01.83 1.17v117.92a95.18 95.18 0 01-94.97 95.06zm-204.24-87.23a94.74 94.74 0 01-11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0016.59 0l123.31-71.2v49.3a1.53 1.53 0 01-.61 1.31l-102.1 58.95a95.16 95.16 0 01-129.85-34.79zm-26.57-220.49a94.71 94.71 0 0149.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 008.29 14.36L376.8 476.8l-42.69 24.65a1.53 1.53 0 01-1.44.13l-102.11-59a95.16 95.16 0 01-34.79-129.81zm350.74 81.62l-123.31-71.2 42.69-24.64a1.53 1.53 0 011.44-.13l102.11 58.95a95.08 95.08 0 01-14.69 171.55V408.75a16.4 16.4 0 00-8.24-14.36zM589 330.44c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 00-16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 01.61-1.31l102.1-58.9A95.07 95.07 0 01589 330.44zm-267.11 87.87l-42.7-24.65a1.52 1.52 0 01-.83-1.17V274.57a95.07 95.07 0 01155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 00-8.3 14.36zm23.19-50L400 336.59l54.92 31.7v63.42L400 463.41l-54.92-31.7z"
              ></path>
            </svg>}
          {message.user === "me" &&
            <svg
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path
                fill='slategrey'
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z"></path>
            </svg>
          }
        </div>
        <div className={`message ${message.user === "me" ? "me" : "chatgpt"}`}>
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
