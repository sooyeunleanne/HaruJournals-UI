import React, { useState } from "react";
import data from "../data/journals.json";

export const InputForm = props => {

    const {updateJournal} = props;
    
    const initialInputState = "";
   

    const [eachEntry, setEachEntry] = useState(initialInputState);

    const journal = eachEntry;

      
    const handleInputChange = e => {
        setEachEntry(eachEntry, e.target.value);
    };

    const handleFinalSubmit = e => {
        updateJournal(eachEntry);
    };

  return (
  <div>
    <form>
        <button className="edit-button" value="Submit" onClick={handleFinalSubmit}/>
        <br/>
        <input className="journal"
        type="text" 
        placeholder="Journal"
        onChange = {handleInputChange}/>
    </form> 
  </div> 
  );
};