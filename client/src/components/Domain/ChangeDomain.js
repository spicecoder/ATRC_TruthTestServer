import { useEffect, useState } from "react";
import WordPhrase from "../Wordphrase";

const ChangeDomain = ({ valueChange, setChangedData }) => {
  const [selectDomain, setSelectDomain] = useState();
  useEffect(() => {
    setChangedData(selectDomain);
  }, [selectDomain]);
  return (
    <div>
      <WordPhrase valueChange={valueChange} setSelectDomain={setSelectDomain} />
    </div>
  );
};
export default ChangeDomain;
