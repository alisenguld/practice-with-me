import Card from "../Card/Card";

const French = () => {
  return (
    <div className="speaking-rooms">
      <Card language="French" level="Any Level" subject="Politic" roomId={0}/>
      <Card language="French" level="Beginner" subject="No subject" roomId={1}/>
      <Card language="French" level="Intermediate" subject="Technology" roomId={2}/>
      <Card language="French" level="Advanced level" subject="Nature" roomId={3}/>
      <Card language="French" level="Any Level" subject="Social media" roomId={4}/>
      <Card language="French" level="Intermediate" subject="Travel" roomId={5}/>
      <Card language="French" level="Any Level" subject="Culture" roomId={6}/>
      <Card language="French" level="Beginner" subject="Art" roomId={7}/>
      <Card language="French" level="Any Level" subject="Music" roomId={8}/>
    </div>
  );
};

export default French;
