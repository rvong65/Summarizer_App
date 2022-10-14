import React, {Component} from 'react'
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';
import TextInput from './components/TextInput';
import ParticlesBg from 'particles-bg'
import axios from 'axios';
import TextOutput from './components/TextOutput';
import LoadingTextInput from './components/LoadingTextInput';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text_input: "",
      text_output: "",
      loadingTextInput: false,
      route: "signIn",
      isSignedIn: false,
      user: {
        username: ""
      }
    };

    this.submitTextInput = this.submitTextInput.bind(this);
  }

  getUser = (data) => {
    this.setState({username: data.username});
  }

  onChangeRoute = (route) =>{
    if(route === "signOut"){
      this.setState({isSignedIn: false, route: "signIn", text_output: ""});
    }else if(route === "home"){
      this.setState({isSignedIn: true , route: "home"});
    }else{
    this.setState({route: route})}
  }

  textInputOnChange = (event) => {
    this.setState({text_input: event.target.value})
  }

  submitTextInput = async(event) => {
    if(this.state.text_output !== ''){
      this.setState({text_output: ''});
    }
    this.setState({loadingTextInput: true});
    let formData = new FormData();
    formData.append('text_input', this.state.text_input);
    document.getElementsByClassName("textInput")[0].value="";

    await axios.post("/api/submit/", formData, {
        headers: {'content-type': 'multipart/form-data'}
      })
        .then(response => {
          let data = JSON.parse(response['data'])
          let response2 = data['response']
          this.setState({
            text_output: response2,
            loadingTextInput: false
          })
      }).catch(error => this.setState({isError: true}))
  }

  render(){
    return(
      <div className="App">
        <ParticlesBg className="particles" color="#FFFFFF" num={200} type="cobweb" bg={true} />
        <Navigation onChangeRoute = {this.onChangeRoute} isSignedIn={this.state.isSignedIn}/>
        {this.state.route === "home" 
        ?<div>
          <TextInput textInputOnChange = {this.textInputOnChange} submitTextInput = {this.submitTextInput}/>
          {this.state.loadingTextInput === true &&
            <LoadingTextInput />
          }
          {this.state.text_output !== '' &&
          <TextOutput textOutput = {this.state.text_output}/>
          } 
          </div>
          :(this.state.route === "signIn"? <SignIn getUser = {this.getUser} onChangeRoute = {this.onChangeRoute} /> : <SignUp getUser = {this.getUser} onChangeRoute = {this.onChangeRoute} />)
          }
  
      </div>
    );
  }

}

export default App;
