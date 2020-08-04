import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import './PageHome.css'
class PageHome extends Component {

   state={
        name:""
    }
   getNameUserConnected=()=>{
    const token = localStorage.token;
     if(token){
          const tokenDecoded = jwt.decode(token)
          const nameUserConnected= tokenDecoded.fullname
         this.setState({
        name:nameUserConnected
         }) 
        }
         else{
          localStorage.removeItem("token")
          window.location.assign('/login')
         } 
      }
   
      componentDidMount(){
       this.getNameUserConnected()   
      }
      
    render() {
        return (
            <div className="PageHome">
            <h1>Bonjour {this.state.name} 🖐  </h1>
            </div>
        );
    }
}

export default PageHome;