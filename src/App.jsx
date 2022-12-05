import './App.scss';
import React from 'react';

const sounds = [
  {
    key: 'Q',
    url: 'https://bigsoundbank.com/UPLOAD/mp3/0284.mp3',

},
{
  key:'W',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0283.mp3'
},
{
  key:'E',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0281.mp3'
},
{
  key:'A',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0312.mp3'
},
{
  key:'S',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0315.mp3'
},
{
  key:'D',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0437.mp3'
},
{
  key:'Z',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0453.mp3'
},
{
  key:'X',
  url:'https://bigsoundbank.com/UPLOAD/mp3/0465.mp3'
},
{
  key:'C',
  url:'https://bigsoundbank.com/UPLOAD/mp3/2837.mp3'
},
]

const App = () => (  
  <div id="drum-machine" className='container-fluid'>
      <div id="display" className="display">
        <p>Your keyboard, please</p>
          {sounds.map((sound, idx)  => (
          <DrumPad text={sound.key} key={idx} audio={sound.url} />))}
      </div>
  </div>
);

class DrumPad extends React.Component {
constructor(props) {
  super(props);
      this.audio = React.createRef();
}

componentDidMount() {
  this.audio.current.addEventListener("ended", (e) => {
    const parent = e.target.parentNode;
    parent.classList.remove("active");
  });
}

playSound = () => {
  this.audio.current.play();
  const id = this.audio.current.id;

  const parent = this.audio.current.parentNode;
  parent.classList.add("active");

  const display = parent.parentNode;
   display.querySelector("p").innerText = `Senti come pompa ${id}`;

    }

render() {
  
  const { text, audio } = this.props;

  return (
    
    <div id={`drum-${text}`} className="drum-pad" onClick={this.playSound}>
    {text}
    <audio className="clip" src={audio} id={text} ref={this.audio} />
    </div>
  
  )
}
}

document.addEventListener('keydown', (e) => {
const id = e.key.toUpperCase();
const audio = document.getElementById(id);

if (audio) {
  audio.currentTime = 0;
  const parent = audio.parentNode;
  parent.classList.add("active");
  
 const display = parent.parentNode;
  display.querySelector("p").innerText = `Senti come pompa ${id}`;
  
  audio.play();
}
});
  
  
export default App;