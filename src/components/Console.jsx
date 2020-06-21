import * as React from 'react';
import styled from "styled-components";
import './Console.css'

const Container = styled.div`
  margin: 30px auto;
  text-align: center;
  font-weight: bold;

`;

const ConsoleBox = styled.div`
  margin: 30px auto;
  text-align: left;
  font-weight: normal;
  color: #CCCC33;
`;

class Console extends React.Component {
  state = {
    currentInput : '',
    lines : [
      // this.outputData(''),
      // this.outputData('This is Scheme Project with React.'),
      // this.outputData('From Programming Language 101 Lecture.'),
      // this.outputData('')
    ],
    inputHistoryIndex : 0,
    inputHistory : [],
    inputPrefix : ">> ",
    inputState : ''
  };

  constructor(props){
    super(props);

    this.socket = new WebSocket('ws://localhost:920');

    this.consoleInput = React.createRef();
    this.onClickDisplay = this.onClickDisplay.bind(this);
    this.onKeyboardDown = this.onKeyboardDown.bind(this);
  }

  componentDidMount(){
       this.consoleInput.focus();

       this.socket.onopen = (evt)=>{
           //doSend("test msg");
       };

       this.socket.onclose = (evt)=>{
           this.writeToScreen("disconnected");
       };

       this.socket.onmessage = (evt)=>{
           console.log(evt.data);
           this.writeToScreen(evt.data);
       }
  }

  send(msg){
    this.socket.send(msg);
    this.setState({inputState : true});
  }

  writeToScreen(msg){
    msg = this.outputData(msg);
    const { lines } = this.state;
    this.setState({
      lines : [...lines, msg],
      inputState : false
    });
  }

  outputData(string){
    return ('=> ' + string );
  }
  inputData(string){
    return ('>> ' + string );
  }
  continueInputData(string){
    return ('.. ' + string );
  }

  onClickDisplay(e){
    this.consoleInput.focus();
  }

  onKeyboardDown(e){
    let { currentInput, inputHistory, lines, inputPrefix } = this.state;
    const currentLine = this.consoleInput.value;
    const newFullLine = currentInput + ' ' + currentLine;

    if(e.key === 'Enter'){
      if(e.shiftKey){
        this.setState({
          currentInput : newFullLine,
          inputHistory : [...inputHistory, currentInput],
          inputPrefix : '.. '
        });
      }
      else{
        console.log(newFullLine);
        this.setState({
          currentInput : '',
          inputPrefix : '>> '
        });
        this.send(newFullLine);
      }

      this.setState({lines : [...lines, inputPrefix + currentLine]});
      this.consoleInput.value = '';
    }
  }

  render(){

    const { lines, inputPrefix, inputState } = this.state;
    const outputLines = lines.map(line=>{return (<div>{line}</div>);});

    return (
    <Container
      onClick={this.onClickDisplay}
      onKeyDown={this.onKeyboardDown}>
    <h3>React Scheme Project</h3>
    <ConsoleBox>
    {outputLines}
    {inputPrefix}
    <input
      type="text"
      ref={e=>{this.consoleInput = e;}}
      readOnly={inputState}
    />
    </ConsoleBox>
    </Container>
    );
  }
}

export default Console;
