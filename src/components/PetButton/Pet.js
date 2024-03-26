import React, { useCallback, useState } from 'react';
import styles from './Pet.module.css';

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
            <button className={styles.petOpenButton} onClick={onPetClick}>🐈</button>
            {openPet && <PetComponent onCloseClick={onCloseClick} />}
        </div>
    );
}

function PetComponent({ onCloseClick }) {
    return (
        <div className={styles.petContainer}>
            <button onClick={onCloseClick}> X </button>
            <div>Put the growing cat here!</div>
        </div>
    );
}

export default Pet;
