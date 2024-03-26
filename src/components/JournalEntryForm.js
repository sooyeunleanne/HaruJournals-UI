import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>{selectedDate.toLocaleDateString()}</h2>
      <textarea
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        placeholder="Write your journal entry..."
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};