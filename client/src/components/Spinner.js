import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dna} from  'react-loader-spinner'
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="items-center">Redirecting to you in {count} second.. </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
