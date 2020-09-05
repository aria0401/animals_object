"use strict";

window.addEventListener("DOMContentLoaded", start);

// Create a prototype for the animal object and an array where I'll put the objects
const allAnimals = [];
const Animal = {
  name: "",
  type: "",
  description: "",
  age: "",
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    //Create new object with cleaned data (from prototype)

    let animal = Object.create(Animal);

    const fullName = jsonObject.fullname;
    const age = jsonObject.age;
    const firstName = fullName.substring(0, fullName.indexOf(" "));
    const animalType = fullName.substring(fullName.lastIndexOf(" ") + 1);
    const longDescription = fullName.substring(
      fullName.indexOf(" ") + 1,
      fullName.lastIndexOf(" ")
    );
    const description = longDescription.substring(
      longDescription.indexOf(" ") + 1
    );

    animal.name = firstName;
    animal.type = animalType;
    animal.age = age;
    animal.desc = description;
    //- and store that object in the allAnimals array
    allAnimals.push(animal);

    //same result but without variables:
    //animal.name = fullName.substring(0, fullName.indexOf(" "));
    //animal.type = fullName.substring(fullName.lastIndexOf(" "));

    // console.log(fullName);
    console.table(allAnimals);
    // console.log(animal);
    // console.log("this is long:", longDescription);
    // TODO: MISSING CODE HERE !!!
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
