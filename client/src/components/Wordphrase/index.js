import React, { useState, useEffect, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import WordPhraseClientApi from "../../client-api/Wordphrase";
import { Row, Form } from "react-bootstrap";
import toastr from "toastr";
import "./index.css";

const WordPhrase = ({
  name,
  heading,
  background,
  setDomainValue,
  valueChange,
  setSelectDomain,
  setFlowValue,
  entityChange,
  setSelectEntity,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [Label, setLabel] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dataToBeChange, setDataChange] = useState();
  const [selected, isSelected] = useState(false);
  const [IsDelete, SetDelete] = useState(false);
  useEffect(() => {
    if (value !== null) {
      setDataChange(value.wp);
    } else {
      setDataChange(null);
    }
  }, [value, setLoading]);
  useEffect(() => {
    if (setDomainValue) {
      setDomainValue(value);
    }
    if (setSelectDomain) {
      setSelectDomain(value);
    }
    if (setFlowValue) {
      setFlowValue(value);
    }
    if (setSelectEntity) {
      setSelectEntity(value);
    }
  }, [value, setDomainValue, setSelectDomain]);

  useEffect(() => {
    if (valueChange) {
      const selectObj = { wp: valueChange, label: valueChange };
      setValue(selectObj);
    }
    if (entityChange) {
      const selectObj = { wp: entityChange, label: entityChange };
      setValue(selectObj);
    }
  }, [valueChange, setSelectDomain, entityChange]);
  //hendle onchange for select creatable form and saving the selected data to session storage
  const handleChange = (data) => {
    var c_data = {};
    var key_name = name;
    isSelected(true);
    if (data) {
      c_data[key_name] = data.wp;
    }
    setValue(data);
  };
  //creating new anchor and saving to the db
  const handleCreate = (data) => {
    setLoading(true);
    data = data.replace(/\s{2,}/g, " ");
    let d = { wp: data };

    WordPhraseClientApi.saveWordPhrase(d).then((res) => {
      var sd = {
        _id: res.data.data._id,
        wp: res.data.data.wp,
        __v: res.data.data.__v,
        label: res.data.data.wp,
        value: res.data.data.wp,
      };
      setLoading(false);
      setValue(sd);
      setLoading(false);
    });
  };

  //handle ooChange function for edit data form
  const handleAnchorChange = (e) => {
    setDataChange(e.target.value);
  };

  //getting all data from db
  useEffect(() => {
    (async () => {
      await WordPhraseClientApi.getAllWordPhrase().then((result) => {
        setData(result.data);
      });
    })();
  }, [loading, setLoading]);

  //passing an extra attribute named "label" to the array of obects as it needed by creatable components
  useEffect(() => {
    (async () => {
      let wdata = data.map((e) => {
        e.label = e.wp;
        e.value = e.wp;
        return e;
      });

      setLabel(wdata);
    })();
  }, [data]);

  //updating the anchor value in the DB
  const updateAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    setEdit(false);
    var updateData = dataToBeChange;
    updateData = updateData.replace(/\s{2,}/g, " ");
    const d = {
      id: value._id,
      data: updateData,
    };
    WordPhraseClientApi.updateWordPhraseById(d).then((res) => {
      if (res.data.err) {
        toastr.warning(`${res.data.err}`);
        setLoading(false);
      } else {
        var sd = {
          _id: res.data.data._id,
          wp: res.data.data.wp,
          __v: res.data.data.__v,

          label: res.data.data.wp,
        };
        setValue(sd);
        setLoading(false);
      }
    });
  };

  //deleting the anchor from db
  const deleteAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    SetDelete(false);
    var d = {
      id: value._id,
    };
    WordPhraseClientApi.deleteWordPhraseById(d).then((res) => {
      setValue(null);
      if (res.data.err) {
        toastr.warning(`${res.data.err}`);
      }
      if (res.data.msg) {
        toastr.success(`${res.data.msg}`);
      }
      setLoading(false);
      setEdit(false);
    });
  };
  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: "240px",
    }),
  };
  return (
    <div
      className="select-wrapper-2"
      style={{ background: background ? background : "#800080" }}
    >
      <div>
        <div className="form-wrapper-2">
          <p style={{ color: "#fff" }}>
            {heading ? (
              <>
                <b> {heading}</b>
              </>
            ) : (
              "word phrase"
            )}
          </p>
          {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
          {edit && value ? (
            <>
              <Form id="edit-form" onSubmit={updateAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="component"
                    onChange={handleAnchorChange}
                    value={dataToBeChange ? dataToBeChange : ""}
                    placeholder="Edit Anchor"
                  />
                </Form.Group>
                <button
                  className="border-button"
                  style={{ margin: "5px" }}
                  form="edit-form"
                  type="submit"
                >
                  save
                </button>

                <button
                  className="border-button"
                  onClick={() => setEdit(false)}
                >
                  cancel
                </button>
              </Form>
            </>
          ) : null}

          {IsDelete && value ? (
            <>
              {" "}
              <Form id="delete-form" onSubmit={deleteAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="components"
                    value={dataToBeChange ? dataToBeChange : ""}
                    placeholder="Edit Anchor"
                    disabled
                  />
                </Form.Group>
                <button
                  className="border-button"
                  style={{ margin: "5px" }}
                  form="delete-form"
                  type="submit"
                >
                  confirm delete
                </button>
                <button
                  className="border-button"
                  onClick={() => SetDelete(false)}
                >
                  cancel
                </button>
              </Form>
            </>
          ) : null}
        </div>
        {/* this is the creatable components with some basic inline css */}

        <Row style={{ display: "inline-flex" }}>
          <div className="creatable-2">
            {!edit && !IsDelete ? (
              <>
                {" "}
                <CreatableSelect
                  maxMenuHeight={200}
                  isClearable
                  isDisabled={false}
                  isLoading={loading}
                  onChange={handleChange}
                  onCreateOption={handleCreate}
                  options={data}
                  value={value}
                  styles={customStyles}
                />
              </>
            ) : null}
          </div>
          <div className="button-wrapper-2" style={{ width: "80px" }}>
            {selected && !edit && !IsDelete && value ? (
              <>
                <button
                  className="trnsparent-button"
                  style={{ margin: "5px" }}
                  onClick={() => setEdit(true)}
                >
                  C
                </button>
                <button
                  className="trnsparent-button"
                  onClick={() => SetDelete(true)}
                >
                  D
                </button>
              </>
            ) : null}
          </div>
        </Row>
      </div>
    </div>
  );
};
export default WordPhrase;
