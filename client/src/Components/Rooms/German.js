import Card from "../Card/Card";

const German = () => {
  return (
    <div className="speaking-rooms">
      <Card language="German" level="Any Level" subject="Politic" roomId={19}/>
      <Card language="German" level="Beginner" subject="No subject" roomId={20}/>
      <Card language="German" level="Intermediate" subject="Technology" roomId={21}/>
      <Card language="German" level="Advanced level" subject="Nature" roomId={22}/>
      <Card language="German" level="Any Level" subject="Social media" roomId={23}/>
      <Card language="German" level="Intermediate" subject="Travel" roomId={24}/>
      <Card language="German" level="Any Level" subject="Culture" roomId={25}/>
      <Card language="German" level="Beginner" subject="Art" roomId={26}/>
      <Card language="German" level="Any Level" subject="Music" roomId={27}/>
    </div>
  );
};

export default German;
