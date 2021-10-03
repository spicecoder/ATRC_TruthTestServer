import { useState, useEffect, useContext } from "react";
import WordPhrase from "../Wordphrase";
import { getDomainAnchor } from "../../client-api/DomainAnchor";
import {
  saveDomain,
  getAllDomain,
  deleteDomainById,
  updateDomainById,
} from "../../client-api/Domain";
import "./index.css";
import ChangeDomain from "./ChangeDomain";
import { Link } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";
const Domain = () => {
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const [show, setShow] = useState(false);
  const [domainValue, setDomainValue] = useState();
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const [remove, setRemove] = useState(false);
  const [valueChange, setValueChange] = useState();
  const [removeValue, setRemoveValue] = useState(false);
  const [update, setUpdate] = useState(false);
  const [changeData, setChangedData] = useState();
  const [logedUser, setLogedUser] = useState(false);
  const [DomainAnchor, setDomainAnchor] = useState({ anchor: "Domain" });

  useEffect(() => {
    getDomainAnchor().then((res) => {
      if (res.data.length > 0) {
        setDomainAnchor(res.data[0]);
        sessionStorage.setItem("DomainAnchor", JSON.stringify(res.data[0]));
      }
    });
  }, []);
  useEffect(() => {
    getAllDomain().then((res) => {
      if (res) {
        setData(res.data);
      }
    });
  }, [show, update]);
  const DA = DomainAnchor;
  var CA = sessionStorage.getItem("DomainAnchor");

  const display = () => {
    setShow(true);
  };
  const addDomain = () => {
    if (domainValue) {
      const obj = {
        domain: domainValue.wp,
        domainanchor: DA.anchor,
        owner: userData.user._id,
      };

      saveDomain(obj).then((res) => {
        setShow(false);
      });
    }
  };
  const ChangeDomainValue = (d) => {
    setChange(true);
    setValueChange(d);
  };

  const setDeleteDomain = (d) => {
    setRemove(true);
    setRemoveValue(d);
  };
  const deleteDomain = () => {
    deleteDomainById({ id: removeValue, owner: userData.user._id }).then(
      (res) => {
        setRemove(false);
        setUpdate(!update);
      }
    );
  };
  const saveChangedDomain = () => {
    updateDomainById({
      wp: changeData.wp,
      id: valueChange._id,
      owner: userData.user._id,
    }).then((res) => {
      setUpdate(!update);
      setChange(false);
    });
  };
  return (
    <div>
      <div className="heading">
        <h1>{DA !== null || DA !== undefined ? DA.anchor : "Domain"}</h1>
        <div className="add-button">
          {!show && userData.user !== undefined ? (
            <button className="button-select" onClick={() => display()}>
              +
            </button>
          ) : null}
        </div>
      </div>
      {show ? (
        <>
          <WordPhrase
            heading={DA !== null && DA !== undefined ? DA.anchor : "Domain"}
            setDomainValue={setDomainValue}
          />
          <>
            <button className="button-add-canc" onClick={() => addDomain()}>
              Add
            </button>
            <button
              style={{ background: "#FF5733" }}
              className="button-add-canc"
              onClick={() => setShow(false)}
            >
              cancel
            </button>
          </>
        </>
      ) : null}
      {data.map((d, i) => (
        <li className="main-class" style={{ listStyle: "none" }} key={i}>
          <span className="name">{d.domainanchor}</span>
          {userData.user !== undefined && d.domainanchor.length < 40 ? (
            <>
              <span className="change" onClick={() => ChangeDomainValue(d)}>
                C
              </span>
              <span className="delete" onClick={() => setDeleteDomain(d)}>
                D
              </span>
              <span className="r-pattern">
                <Link
                  to={`/mslist/resolutionpattern/${d.domainanchor}`}
                  style={{ textDecoration: "none" }}
                >
                  R
                </Link>
              </span>
            </>
          ) : null}
        </li>
      ))}
      <div style={{ marginTop: "20px" }}>
        {change ? (
          <>
            <ChangeDomain
              valueChange={valueChange.domainanchor}
              setChangedData={setChangedData}
            />
            <>
              <button
                className="button-add-canc"
                onClick={() => saveChangedDomain()}
              >
                save
              </button>
              <button
                style={{ background: "#FF5733" }}
                className="button-add-canc"
                onClick={() => setChange(false)}
              >
                cancel
              </button>
            </>
          </>
        ) : null}
        {remove ? (
          <>
            <input
              type="text"
              value={removeValue.domainanchor}
              disabled
              id="fname"
              name="fname"
            />
            <div>
              <button
                className="button-add-canc"
                onClick={() => deleteDomain()}
              >
                Remove
              </button>
              <button
                style={{ background: "#FF5733" }}
                className="button-add-canc"
                onClick={() => setRemove(false)}
              >
                cancel
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Domain;
