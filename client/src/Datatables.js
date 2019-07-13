import React, { Component } from 'react';
import '../App.css';

import {
    Container,
    FormGroup,
    Row,
    Col,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
  } from 'reactstrap';
  
import Movies from "../Movies";


export default class Datatables extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          movie: null,
          movieList: [],
        //   moviePosterPath: [],
          newMovieName: '',
        }
    }

    getMovieList = () => {
        fetch('/api/movies')
        .then(res => res.json())
        .then(res => {
            var movieList = res.map(r => r.original_title);
            // var moviePosterPath = res.map(r => r.poster_path);
            this.setState({ movieList });
        });
    };

    handleInputChange = (e) => {
        this.setState({ newMovieName: e.target.value });
    };
    
    handleSearchMovie = () => {
        fetch('/api/movies', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ title: this.state.newMovieName})
        })
        .then(res => res.json())
        .then(res => {
            this.getMovieList();
            this.setState({ newMovieName: ''});
        });
    };

    getMovie = (title) => {
        fetch(`/api/movies/${title}`)
        .then(res => res.json())
        .then(title => {
            console.log(title);
            this.setState({ title });
        });
    };

    handleChangeMovie = (e) => {
        this.getMovie(e.target.value);
    }


    componentDidMount () {
        this.getMovieList();
        // this.getMoviePosterPath();
    };


    render() {
    let datatables;
    let newTables;
    datatables = (
        <table className="tableoftables">
            <tbody>
            <tr>
                <td>
                    <font className="tablefont"> Recently Watched TV Shows, You</font>
                    <table className="datatables">
                        <tbody>
                        <tr>
                            <th>Episode</th>
                            <th>TV Show</th>
                            <th>Ranking</th>
                        </tr>
                        <tr>
                            <td>01.01</td>
                            <td>Archer</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>01.02</td>
                            <td>Archer</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>01.03</td>
                            <td>Archer</td>
                            <td>5</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Recently Watched TV Shows, Friends</font>
                    <table className="datatables">
                        <tbody>
                        <tr>
                            <th>Episode</th>
                            <th>TV Show</th>
                            <th>Ranking</th>
                            <th>Friend</th>
                        </tr>
                        <tr>
                            <td>01.01</td>
                            <td>The Office</td>
                            <td>5</td>
                            <td>Sergi</td>
                        </tr>
                        <tr>
                            <td>01.02</td>
                            <td>The Office</td>
                            <td>5</td>
                            <td>Sergi</td>
                        </tr>
                        <tr>
                            <td>01.01</td>
                            <td>Friends</td>
                            <td>3</td>
                            <td>Amed</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Most Popular TV Shows, Everyone</font>
                    <table className="datatables">
                        <tbody>
                        <tr>
                            <th>Episode</th>
                            <th>TV Show</th>
                            <th>Ranking</th>
                        </tr>
                        <tr>
                            <td>01.01</td>
                            <td>Archer</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>01.02</td>
                            <td>Archer</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>01.03</td>
                            <td>Archer</td>
                            <td>5</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr><td><br/></td></tr>
            <tr>
                <td>
                    <font className="tablefont"> Recently Watched Movies, You</font>
                    <table className="datatables">
                        <tbody>
                        <tr>
                            <th>Movie</th>
                            <th>Ranking</th>
                        </tr>
                        <tr>
                            <td>Avengers</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>Iron Man</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>Lord of the Rings</td>
                            <td>5</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Recently Watched Movies, Friends</font>
                    <table className="datatables">
                        <tbody>
                        <tr>
                            <th>Movie</th>
                            <th>Ranking</th>
                            <th>Friend</th>
                        </tr>
                        <tr>
                            <td>Spiderman</td>
                            <td>5</td>
                            <td>Sergi</td>
                        </tr>
                        <tr>
                            <td>Thor</td>
                            <td>3</td>
                            <td>Ibrahim</td>
                        </tr>
                        <tr>
                            <td>What Women Want</td>
                            <td>2</td>
                            <td>Johnson</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Most Popular Movies, Everyone</font>
                    <table className="datatables">
                        <tbody>
                        <tr>
                            <th>Movie</th>
                            <th>Ranking</th>
                        </tr>
                        <tr>
                            <td>Toy Story 4</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>Yesterday</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Aladdin</td>
                            <td>3</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
   );

    newTables = (
        <Container fluid className="centered">
        <Row>
        <Col>
        <InputGroup>
            <input className="input"
            placeholder="Search for a Movie by Title..."
            value={this.state.newCityName}
            onChange={this.handleInputChange}
            />
            <InputGroupAddon addonType="append">
                <Button className="inputButton" onClick={this.handleSearchMovie}>Search Movie</Button>
            </InputGroupAddon>
        
        </InputGroup>
         
        </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup>
                    <Input type="select" onChange={this.handleInputChange}>
                        {this.state.movieList.length === 0 && <option> No Movies Added yet</option>}
                        {this.state.movieList.length > 0 && <option> Select a City</option>}
                        {this.state.movieList.map((title, i) => <option key={i}>{title}</option>)}
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Movies data={this.state.title} />
        </Container> 
        );
    

    return <div>{newTables}<br/>{datatables}</div>;
    }
}
        