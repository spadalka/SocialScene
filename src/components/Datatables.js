import React, { Component } from 'react';


export default class Datatables extends Component {
    render() {
    let datatables;
    datatables = (
        <table className="tableoftables">
            <tr>
                <td>
                    <font className="tablefont"> Recently Watched TV Shows, You</font>
                    <table className="datatables">
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
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Recently Watched TV Shows, Friends</font>
                    <table className="datatables">
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
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Most Popular TV Shows, Everyone</font>
                    <table className="datatables">
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
                    </table>
                </td>
            </tr>
            <tr><td><br/></td></tr>
            <tr>
                <td>
                    <font className="tablefont"> Recently Watched Movies, You</font>
                    <table className="datatables">
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
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Recently Watched Movies, Friends</font>
                    <table className="datatables">
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
                    </table>
                </td>
                <td>
                    <font className="tablefont"> Most Popular Movies, Everyone</font>
                    <table className="datatables">
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
                    </table>
                </td>
            </tr>
        </table>
   );

    return <div>{datatables}</div>;
    }
}
        