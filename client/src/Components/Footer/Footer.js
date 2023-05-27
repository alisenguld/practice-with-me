import "./Footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {
  return <footer>
    <div className="waves">
      <div className="wave"></div>

    </div>
    <ul className="social-icon">
      <li><a href="#"><FacebookIcon sx={{ fontSize: 45 }}/></a></li>
      <li><a href="#"><TwitterIcon sx={{ fontSize: 45 }}/></a></li>
      <li><a href="#"><LinkedInIcon sx={{ fontSize: 45 }}/></a></li>
      <li><a href="#"><InstagramIcon sx={{ fontSize: 45 }}/></a></li>
    </ul>
    <ul className="footer-menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Team</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <p>©2023 Dokuz Eylül | All Rights Reserved</p>
  </footer>;
};

export default Footer;