import Card from "../Card/Card";

const German = () => {
  return (
    <div className="speaking-rooms">
      <Card language="German" level="Any Level" subject="Politic" roomId={0}/>
      <Card language="German" level="Beginner" subject="No subject" roomId={1}/>
      <Card language="German" level="Intermediate" subject="Technology" roomId={2}/>
      <Card language="German" level="Advanced level" subject="Nature" roomId={3}/>
      <Card language="German" level="Any Level" subject="Social media" roomId={4}/>
      <Card language="German" level="Intermediate" subject="Travel" roomId={5}/>
      <Card language="German" level="Any Level" subject="Culture" roomId={6}/>
      <Card language="German" level="Beginner" subject="Art" roomId={7}/>
      <Card language="German" level="Any Level" subject="Music" roomId={8}/>
    </div>
  );
};

export default German;
