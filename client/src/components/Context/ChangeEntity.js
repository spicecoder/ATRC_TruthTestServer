import { useEffect, useState } from "react";
import WordPhrase from "../Wordphrase";

const ChangeEntity = ({ entityChange, setNewEntity }) => {
  const [selectEntity, setSelectEntity] = useState();
  useEffect(() => {
    setNewEntity(selectEntity);
  }, [selectEntity]);
  return (
    <div>
      <WordPhrase
        entityChange={entityChange}
        setSelectEntity={setSelectEntity}
      />
    </div>
  );
};
export default ChangeEntity;
