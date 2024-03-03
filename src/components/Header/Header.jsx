import "./Header.css";
import logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <div className="header-wrapper">
      <p>
        <span>This is</span> <span> LIBRARY</span>
        <span>
          <img src={logo} />
        </span>
      </p>
    </div>
  );
};
