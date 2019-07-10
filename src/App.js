import React, { Component } from 'react';
// import './App.css';
import Facebook from './components/Facebook';
// import Populartv from './components/Populartv';


class App extends Component { 
    constructor(props){
      super(props);
      this.state = {
        items:[],
        isLoaded:false,
      }
    }

    componentDidMount(){
      fetch('https://api.themoviedb.org/3/tv/popular?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&page=1')
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
            {items.results.map(item =>(
              <li>
                id: {item.id} |Orig_Name: {item.original_name} | Name: {item.name}
              </li>
              ))}
          </ul>
        </div>
        );
      }
    }
}

export default App;