(this["webpackJsonpreact-scheme"]=this["webpackJsonpreact-scheme"]||[]).push([[0],{17:function(t,n,e){t.exports=e(26)},22:function(t,n,e){},23:function(t,n,e){},26:function(t,n,e){"use strict";e.r(n);var i=e(0),o=e.n(i),c=e(9),a=e.n(c),u=(e(22),e(3)),r=e(10),s=e(11),l=e(1),p=e(16),f=e(15),h=e(4),y=e(5);e(23);function v(){var t=Object(h.a)(["\n  margin: 30px auto;\n  text-align: left;\n  font-weight: normal;\n  color: #CCCC33;\n"]);return v=function(){return t},t}function d(){var t=Object(h.a)(["\n  margin: 30px auto;\n  text-align: center;\n  font-weight: bold;\n\n"]);return d=function(){return t},t}var k=y.a.div(d()),b=y.a.div(v()),m=function(t){Object(p.a)(e,t);var n=Object(f.a)(e);function e(t){var o;return Object(r.a)(this,e),(o=n.call(this,t)).state={currentInput:"",lines:[],inputHistoryIndex:0,inputHistory:[],inputPrefix:">> ",inputState:""},o.socket=new WebSocket("ws://35.243.183.177:920"),o.consoleInput=i.createRef(),o.onClickDisplay=o.onClickDisplay.bind(Object(l.a)(o)),o.onKeyboardDown=o.onKeyboardDown.bind(Object(l.a)(o)),o}return Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.consoleInput.focus(),this.socket.onopen=function(t){},this.socket.onclose=function(n){t.writeToScreen("disconnected")},this.socket.onmessage=function(n){t.writeToScreen(n.data)}}},{key:"send",value:function(t){this.socket.send(t),this.setState({inputState:!0})}},{key:"writeToScreen",value:function(t){t=this.outputData(t);var n=this.state.lines;this.setState({lines:[].concat(Object(u.a)(n),[t]),inputState:!1})}},{key:"outputData",value:function(t){return"=> "+t}},{key:"inputData",value:function(t){return">> "+t}},{key:"continueInputData",value:function(t){return".. "+t}},{key:"onClickDisplay",value:function(t){this.consoleInput.focus()}},{key:"onKeyboardDown",value:function(t){var n=this.state,e=n.currentInput,i=n.inputHistory,o=n.lines,c=n.inputPrefix,a=this.consoleInput.value,r=e+" "+a;"Enter"===t.key&&(t.shiftKey?this.setState({currentInput:r,inputHistory:[].concat(Object(u.a)(i),[e]),inputPrefix:".. "}):(console.log(r),this.setState({currentInput:"",inputPrefix:">> "}),this.send(r)),this.setState({lines:[].concat(Object(u.a)(o),[c+a])}),this.consoleInput.value="")}},{key:"render",value:function(){var t=this,n=this.state,e=n.lines,o=n.inputPrefix,c=n.inputState,a=e.map((function(t){return i.createElement("div",null,t)}));return i.createElement(k,{onClick:this.onClickDisplay,onKeyDown:this.onKeyboardDown},i.createElement("h3",null,"React Scheme Project"),i.createElement(b,null,a,o,i.createElement("input",{type:"text",ref:function(n){t.consoleInput=n},readOnly:c})))}}]),e}(i.Component);a.a.render(o.a.createElement(m,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.09348913.chunk.js.map