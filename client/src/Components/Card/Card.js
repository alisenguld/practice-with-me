import "./Card.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

const Card = ({ language, level, subject, roomId}) => {
  return (
    <div className="card-content">
      <div className="card-conteiner">
        <div className="card-title">
          <h3 className="title">
            {language} - <p className="level">{level}</p>
          </h3>
          <p className="title">Subject -&nbsp;{subject}</p>
        </div>

        <div className="users">
          <AccountCircleIcon sx={{ fontSize: 65 }} />
          <AccountCircleIcon sx={{ fontSize: 65 }} />
          <AccountCircleIcon sx={{ fontSize: 65 }} />
        </div>

        <div className="btn">
          <button>
            <Link className="btn_link" to={`/Room/${language}/${roomId}`}><LoginIcon /> &nbsp; Join</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
