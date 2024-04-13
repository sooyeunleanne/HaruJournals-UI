import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './JournalEntryForm.css';

export const JournalEntryForm = ({ selectedDate, onSave, entry }) => {

  const [journalEntry, setJournalEntry] = useState('');

  useEffect(() => {
    setJournalEntry(entry || ''); // Set the initial value of the textarea
  }, [entry]);

  const handleSave = () => {
    onSave(selectedDate, journalEntry);
    setJournalEntry('');
  };


  return (
    <div className='journal-container'>
      <h1>{selectedDate.toDateString().toUpperCase()}</h1> 
      <textarea className='journal-textarea' type="text"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        placeholder="Write your journal entry"
      />
      <button className='save-button' onClick={handleSave}>Save</button>


    </div>
  );
};

JournalEntryForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSave: PropTypes.func.isRequired,
  entry: PropTypes.string,
};