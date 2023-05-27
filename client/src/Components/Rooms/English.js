import Card from "../Card/Card";

const English = () => {
  return (
    <div className="speaking-rooms">
      <Card language="English" level="Any Level" subject="Politic" roomId={0}/>
      <Card language="English" level="Beginner" subject="No subject" roomId={1}/>
      <Card language="English" level="Intermediate" subject="Technology" roomId={2}/>
      <Card language="English" level="Advanced level" subject="Nature" roomId={3}/>
      <Card language="English" level="Any Level" subject="Social media" roomId={4}/>
      <Card language="English" level="Intermediate" subject="Travel" roomId={5}/>
      <Card language="English" level="Any Level" subject="Culture" roomId={6}/>
      <Card language="English" level="Beginner" subject="Art" roomId={7}/>
      <Card language="English" level="Any Level" subject="Music" roomId={8}/>
   
    </div>
  );
};

export default English;
