import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const ChessDel = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('http://localhost:5000/chess' + id);
                setChess(res.data);
            }
            catch (error) {
                console.log('Hiba :', error);
            }
        })();
}, [id]);
    return (
        <div className="p-1 m-auto text-center content bg-lavender">
            <div>
                <h2>Sakkozó</h2>
                    <div className="card col-sm3 d-inline-block m-1 p-2">
                        <p className="text-dark text-center fs-5"><b>Sakkozó neve:<br />{chess.name}</b></p>
                        <p className="text-danger">Születési éve: {chess.birth_date}</p>
                        <p className="text-danger">Megnyert világbajnokságai: {chess.world_ch_won}</p>
                        <div className="card-body">
                            
                            <Link to={chess.profile_url} className="btn btn-success fs-6" target="_blank">Profil link</Link><br/><br/>
                           <img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} 
                           alt={chess.name} className="img fluid" style={{width: "200px"}} />
                           <br/><br/>
                           <form onSubmit={
                            (event) => {event.preventDefault();
                            axios.delete('http://localhost:5000/chess' + id)
                            .then(() => navigate("/"))
                            .catch((error) => console.log(error));
                            }
                           }>
                            <Link to="/"><i className="bi bi-backspace fs-5 btn btn-warning"> Vissza</i></Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="bi bi-trash3 fs-5 btn btn-danger"> Törlés</button>
                            
                           </form>
                           
                        </div>
                    </div>
                </div>
            </div>
    );
};