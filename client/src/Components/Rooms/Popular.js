import Card from "../Card/Card";

const Popular = () => {
  return (
    <div className="hspeaking-rooms">
      <Card language="English" level="Any Level" subject="Politic" roomId={0}/>
      <Card language="German" level="Any Level" subject="Politic" roomId={19}/>
      <Card language="English" level="Beginner" subject="Art" roomId={7}/>
      <Card language="German" level="Beginner" subject="No subject" roomId={20}/>
      <Card language="French" level="Any Level" subject="Politic" roomId={9}/>
      <Card language="German" level="Intermediate" subject="Technology" roomId={21}/>
      <Card language="French" level="Any Level" subject="Culture" roomId={16}/>
      <Card language="German" level="Advanced level" subject="Nature" roomId={22}/>
      <Card language="English" level="Intermediate" subject="Travel" roomId={5}/>
      <Card language="English" level="Intermediate" subject="Travel" roomId={5}/>
      <Card language="German" level="Intermediate" subject="Travel" roomId={24}/>
      <Card language="English" level="Any Level" subject="Social media" roomId={4}/>
      <Card language="German" level="Beginner" subject="Art" roomId={26}/>
      <Card language="German" level="Any Level" subject="Music" roomId={27}/>
      <Card language="French" level="Any Level" subject="Music" roomId={18}/>
    </div>
  );
};

export default Popular;
