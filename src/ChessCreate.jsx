import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const ChessCreate = () => {
    const navigate = useNavigate();

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            <h2>Új sakkozó</h2>
            <form
            onSubmit={
                (e) => {e.preventDefault();
                const formData= {
                    name: e.target.name.value,
                    birth_date: e.target.birth_date.value,
                    world_ch_won: e.target.world_ch_won.value,
                    profile_url: e.target.profile_url.value,
                    image_url: e.target.image_url.value
                };
                axios.post("https://chess.sulla.hu/chess", formData, {
                    headers: { 'Content-Type' : 'application/json' },
                })
                .then(() => navigate("/"))
                .catch((error) => console.error("Hiba történt: ", error));}
            }>
        <div className="form-group row pb-3">
        <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
        <div className="col-sm-9">
            <input type="text" name="name" className="form-control"/>
        </div>
    </div>
    <div className="form-group row pb-3">
        <label className="col-sm-3 col-form-label">Születési dátum:</label>
        <div className="col-sm-9">
            <input type="date" name="birth_date" className="form-control"/>
        </div>
    </div>
    <div className="form-group row pb-3">
        <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
        <div className="col-sm-9">
            <input type="number" name="world_ch_won" className="form-control" />
        </div>
    </div>
    <div className="form-group row pb-3">
        <label className="col-sm-3 col-form-label">Profil URL:</label>
        <div className="col-sm-9">
            <input type="text" name="profile_url" className="form-control" />
        </div>
    </div>
    <div className="form-group row pb-3">
        <label className="col-sm-3 col-form-label">Kép URL:</label>
        <div className="col-sm-9">
            <input type="text" name="image_url" className="form-control" />
        </div>
    </div>
    <button type="submit" className="btn btn-success">Küldés</button>
</form>
<div><Link to="/" className="bi bi-backspace-fill fs-6 btn btn-danger">Vissza</Link></div>
</div>

    );
}