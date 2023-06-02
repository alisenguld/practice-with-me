import Card from "../Card/Card";

const French = () => {
  return (
    <div className="speaking-rooms">
      <Card language="French" level="Any Level" subject="Politic" roomId={9}/>
      <Card language="French" level="Beginner" subject="No subject" roomId={10}/>
      <Card language="French" level="Intermediate" subject="Technology" roomId={11}/>
      <Card language="French" level="Advanced level" subject="Nature" roomId={12}/>
      <Card language="French" level="Any Level" subject="Social media" roomId={13}/>
      <Card language="French" level="Intermediate" subject="Travel" roomId={14}/>
      <Card language="French" level="Any Level" subject="Culture" roomId={16}/>
      <Card language="French" level="Beginner" subject="Art" roomId={17}/>
      <Card language="French" level="Any Level" subject="Music" roomId={18}/>
    </div>
  );
};

export default French;
