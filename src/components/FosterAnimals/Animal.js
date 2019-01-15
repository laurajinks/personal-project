import React from "react";
import "./animal.css";

const Animal = props => {
    return (
        <div className="animalContainer">
            <img src={props.img} alt="animal" />
            <h2>Name: {props.name}</h2>
            <p>Age: {props.age}</p>
            <p>Type: {props.animalType}</p>
            <p>Breed: {props.breed}</p>
            <p>Sex: {props.sex}</p>
            <p>Size: {props.size}</p>
            <p>Description: {props.description}</p>
            {props.user_username && <p>Foster: {props.user_username}</p>}
            {props.removeAnimal && (
                <button onClick={() => props.removeAnimal(props.id)}>X</button>
            )}
            {props.fosterAnimal && (
                <button onClick={() => props.fosterAnimal(props.id)}>
                    Foster This Animal
                </button>
            )}
            {props.removeFosterParent && props.user_id !== null && (
                <button onClick={() => props.removeFosterParent(props.id)}>
                    Remove Foster Parent
                </button>
            )}
        </div>
    );
};

export default Animal;
