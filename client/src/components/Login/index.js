import Button from "@mui/material/Button";
import "./index.scss";

const Landing = () => {
  const cas = () => {
    window.open("http://localhost:5000/api/auth/cas", "_self");
  };

  return (
    <div className="container login">
      <h1>Welcome to YMajor</h1>
      <Button variant="outlined" className="Button" onClick={cas}>
        Login with CAS
      </Button>
    </div>
  );
};

export default Landing;
