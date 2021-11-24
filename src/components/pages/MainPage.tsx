import * as React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC<{}> = () => (
  <>
    <div className="layout-extra-large">
      <Link to="/login">to login</Link>
    </div>
  </>
);

export default MainPage;
