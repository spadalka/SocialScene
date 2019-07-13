import React from 'react';
import {Row,Col,Table} from 'reactstrap';

const Movies = (props) => {
    const {data} = props;

    if (!data)
        return <div></div>;
    
    return (
        <Row className="Movies">
            <Col sm="12" md={{ size: 4, offset: 4}}>
                <h2>{data.original_title}</h2>
                <img src={`http://image.tmdb.org/t/p/w185/${data.poster_path}`} alt="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjuycG8lbHjAhWI3lQKHS8wBxkQjRx6BAgBEAU&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F7995080%2Fhtml-if-image-is-not-found&psig=AOvVaw1oRxGiwOuOLcZyH3I4W_f0&ust=1563082297016999"/>
                <span></span>
                <span></span>
                <Table>
                    <tbody></tbody>
                </Table>
            </Col> 
        </Row>
    );
};

export default Movies;