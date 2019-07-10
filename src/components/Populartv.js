
export default class Populartv extends Component {
    state = {

    };


/*
const request = require('request');

_EXTERNAL_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&page=1';

const populartv(callback) =>{
	request(_EXTERNAL_URL,{json:true},(err,res,body)=>{
		if(err){
			return callback(err);
		}
		console.log(body);
		return callback(body);
	});
}

module.export.callApi = populartv;
*/


// componentDidMount() {
//         fetch('https://api.themoviedb.org/3/tv/popular?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&page=1')
//         .then(res => res.json())
//         .then((data) => {
//           this.setState({ contacts: data })
//         })
//         .catch(console.log)
//       }