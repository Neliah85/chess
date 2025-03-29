import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ChessList = () => {
    const [chesses, setChess] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch('https://chess.sulla.hu/chess')
         .then((valasz) => valasz.json())
         .then((sakkosok) => setChess(sakkosok))
         .catch((hiba) => console.log(hiba))
         .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sakkozók</h2>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-2">
                    {chesses.map((chess, index)=> (
                        <div className="col" key={index}>
                            <div className="card h-100">
                            <div className="text-dark text-center"><b>Sakkozó neve:<br /> {chess.name}</b></div>
                            <div className="text-danger text-center">Születési éve: {chess.birth_date}</div>
                            <div className="text-danger text-center">Megnyert világbajnokságai: {chess.world_ch_won}</div>
                            <div className="card-body d-flex flex-column align-items-center">
                                
                                <Link to={chess.profile_url} className="fs-6  btn btn-success" target="_blank">Profil link</Link><br/>
                               <Link key="x" to={"/chess/" + chess.id}>
                               <img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} 
                               alt={chess.name} className="img-fluid" style={{width: "200px"}} />
                               </Link><br/>
                            </div>
                            <div className="text-center">
                            <Link to={"/chess/" + chess.id}><i className="bi bi-backspace fs-6 btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                            <Link to={"/chess-mod/" + chess.id}><i className="bi bi-pencil-square fs-6 btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
                            <Link to={"/chess-del/" + chess.id}><i className="bi bi-trash3 fs-6 btn btn-danger"></i></Link><br /><br />
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )
            }
        </div>
    );
}
