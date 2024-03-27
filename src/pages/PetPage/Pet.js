import React, { useCallback, useState } from 'react';
import './Pet.css';

function Pet() {
    const [openPet, setOpenPet] = useState(false);

    const onPetClick = useCallback(() => {
        setOpenPet(true);
    }, []);

    const onCloseClick = useCallback(() => {
        setOpenPet(false);
    }, []);

    return (
        <div>
            <button className='pet-open-button' onClick={onPetClick}>🐈</button>
            {openPet && <PetComponent onCloseClick={onCloseClick} />}
        </div>
    );
}

function PetComponent({ onCloseClick }) {
    return (
        <div className='popup-container'>
            <button className='close-button' onClick={onCloseClick}> X </button>
            <div>Put the growing cat here!</div>
        </div>
    );
}

export default Pet;
