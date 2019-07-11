import React, { Component } from 'react';
// import './App.css';
import Facebook from './components/Facebook';



class App extends Component { 
    constructor(props){
      super(props);
      this.state = {
        items: ' ',
        isLoaded:false,
      }
    }

    componentDidMount(){
      fetch('https://api.themoviedb.org/3/movie/429617/reviews?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US')
        .then(res=>res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json,
          })
        });
    }

    render() {
      var { isLoaded,items} = this.state;

      if(!isLoaded){
        return <div>Loading... </div>;
      }

      else{
        return(
        <div className="App">
          <ul>
            {items.map(item =>(
              <li key={item.id}>
              Title: {item.id} 
              <br></br>
                Author: {item.author} 
                <br></br>
                  Review: {item.content}
                  <br></br>
              {/*| Overview: {item.overview} */}
              {/*  Documentation id: {item.id} | Name: {item.name} */}
              </li>
              ))}
          </ul>
        </div>
        );
      }
    }
}

export default App;