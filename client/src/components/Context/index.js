import { useEffect, useState, useContext } from "react";
import {
  getResolutionPattern,
  addResolutionPattern,
  deleteEntityById,
  updateEntityById,
} from "../../client-api/ResolutionPattern";
import "../Domain/index.css";
import WordPhrase from "../Wordphrase";
import ChangeEntity from "./ChangeEntity";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";
const Context = ({ match, location, context }) => {
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;

  const [RP, setRP] = useState([]);
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);
  const [flowValue, setFlowValue] = useState();
  const [update, setUpdate] = useState();
  const [entity, setEntity] = useState();
  const [remove, setRemove] = useState(false);
  const [changedEntity, setChangedEntity] = useState();
  const [newEntity, setNewEntity] = useState();
  const [change, setChange] = useState(false);
  const { domain } = useParams();
  useEffect(() => {
    getResolutionPattern({
      domain: domain,
      flow: context,
      owner: userData.user !== undefined ? userData.user : null,
    }).then((res) => {
      setArr(res.data.data.atttentionentities);
      setRP(res.data.data);
    });
  }, [update]);
  const addRP = () => {
    if (flowValue.wp !== undefined && userData !== undefined) {
      addResolutionPattern({
        id: RP._id,
        rp: flowValue.wp,
        flow: context,
        owner: userData.user._id,
      }).then((res) => {
        setUpdate(!update);
        setShow(false);
      });
    }
  };

  const removeEntity = (d) => {
    setRemove(true);
    setEntity(d);
  };
  const deleteEntity = () => {
    if (userData.user !== undefined) {
      deleteEntityById({
        id: RP._id,
        entity: entity,
        flow: context,
        owner: userData.user._id,
      }).then((res) => {
        setUpdate(!update);
        setRemove(false);
      });
    }
  };
  const changeEntityData = (d) => {
    setChange(true);
    setChangedEntity(d);
  };

  const saveChangedEntity = () => {
    if (userData.user !== undefined) {
      updateEntityById({
        id: RP._id,
        oe: changedEntity,
        ne: newEntity.wp,
        flow: context,
        owner: userData.user._id,
      }).then((res) => {
        setUpdate(!update);
        setChange(false);
      });
    }
  };
  return (
    <div>
      <div className="heading">
        <h1>{`${RP.flow} for ${RP.domain}`}</h1>
        <div className="add-button">
          {!show ? (
            <button className="button-select" onClick={() => setShow(true)}>
              +
            </button>
          ) : null}
        </div>
      </div>
      <div>
        {show ? (
          <>
            <WordPhrase heading={RP.flow} setFlowValue={setFlowValue} />
            <>
              <button className="button-add-canc" onClick={() => addRP()}>
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
      </div>
      <div>
        {arr.map((d, i) => (
          <li className="main-class" style={{ listStyle: "none" }} key={i}>
            <span className="name">{d}</span>
            <span className="change" onClick={() => changeEntityData(d)}>
              C
            </span>
            <span className="delete" onClick={() => removeEntity(d)}>
              D
            </span>

            {context !== "truth statement" ? (
              <span className="r-pattern">
                <Link to={`/mslist/truth statement/${d}`}>T</Link>
              </span>
            ) : null}
          </li>
        ))}
      </div>
      <div>
        {change ? (
          <>
            <ChangeEntity
              entityChange={changedEntity}
              setNewEntity={setNewEntity}
            />
            <>
              <button
                className="button-add-canc"
                onClick={() => saveChangedEntity()}
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
      </div>
      <div>
        {remove ? (
          <>
            <input
              type="text"
              value={entity}
              disabled
              id="fname"
              name="fname"
            />
            <div>
              <button
                className="button-add-canc"
                onClick={() => deleteEntity()}
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
export default Context;
