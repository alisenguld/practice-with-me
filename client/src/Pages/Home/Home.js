import "./home.css";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import Background from "../../Images/background.mp4";
import ref from "../../Images/ref1.png";

const Home = () => {
  return (
    <div>
      <video src={Background} className="hvideo-slide" autoPlay muted loop />

      <div className="htop-container">
        <p className="href-text">
          Practice with people <br /> and improve yourself.
        </p>
        <img src={ref} alt="" className="href" />
      </div>
      <div className="hcontainer">
        <h3 className="hcontainer-title">Popular Speaking Rooms</h3>
        <div className="hspeaking-rooms">
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
          <Card language="English" level="Any Level" subject="Politic" />
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Home;
