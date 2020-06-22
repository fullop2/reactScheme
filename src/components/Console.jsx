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
    currentTotalInput : '',
    lines : [],
    inputHistoryIndex : 0,
    inputHistory : [],
    prefix : ">> ",
    inputBlock : '',
    currentLine : '',
  };

  constructor(props){
    super(props);

    this.socket = new WebSocket('ws://35.243.183.177:920');

    this.consoleInput = React.createRef();
    this.onClickDisplay = this.onClickDisplay.bind(this);
    this.onKeyboardDown = this.onKeyboardDown.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    document.title = "React Scheme";
    
    this.consoleInput.focus();

    this.socket.onopen = (evt)=>{
        // nothing to do;
    };
    this.socket.onclose = (evt)=>{
        this.writeToScreen("disconnected");
    };
    this.socket.onmessage = (evt)=>{
        this.writeToScreen(evt.data);
    }
}
       

  send(msg){
    this.socket.send(msg);
    this.setState({inputBlock : true});
  }

  writeToScreen(msg){
    msg = this.outputData(msg);
    const { lines } = this.state;
    this.setState({
      lines : [...lines, msg],
      inputBlock : false
    });
  }

  outputData(string){
    return (this.props.outputPrefix + string );
  }

  onClickDisplay(e){
    this.consoleInput.focus();
  }

  onKeyboardDown(e){
    let { currentLine, currentTotalInput, inputHistory, lines, prefix } = this.state;
    const newFullLine = currentTotalInput + ' ' + currentLine;

    if(e.key === 'Enter'){
      if(e.shiftKey){
        this.setState({
          currentTotalInput : newFullLine,
          inputHistory : [...inputHistory, currentTotalInput],
          prefix : this.props.inputContinuePrefix
        });
      }
      else{
        this.setState({
          currentTotalInput : '',
          prefix : this.props.inputPrefix
        });
        this.send(newFullLine);
      }

      this.setState({
        lines : [...lines, prefix + currentLine],
        currentLine : ''
      });
    }
  }
  
  onChange(e){
    this.setState({currentLine : e.target.value});
  }
  
  render(){

    const { lines, prefix, inputBlock } = this.state;
    const outputLines = lines.map(line=>{return (<div>{line}</div>);});

    return (
    <Container onClick={this.onClickDisplay} onKeyDown={this.onKeyboardDown}>
    <h3>React Scheme Project</h3>
    <ConsoleBox>
    {outputLines}
    {prefix}
    <input 
      type="text" 
      ref={e=>{this.consoleInput = e;}} 
      value={this.state.currentLine} 
      onChange={this.onChange}
      readOnly={inputBlock}/>
    </ConsoleBox>
    </Container>
    );
  }
}

Console.defaultProps = {
  inputPrefix : '>> ',
  inputContinuePrefix : '.. ',
  outputPrefix : '=> '
};

export default Console;
