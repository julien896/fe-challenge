import React, { useEffect, useState } from 'react'
import './App.scss';
import Species from './Species';

const API_URL = 'https://swapi.dev/api/films/2/';
const SPECIES_IMAGES = {
  droid:
    'https://static.wikia.nocookie.net/starwars/images/f/fb/Droid_Trio_TLJ_alt.png',
  human:
    'https://static.wikia.nocookie.net/starwars/images/3/3f/HumansInTheResistance-TROS.jpg',
  trandoshan:
    'https://static.wikia.nocookie.net/starwars/images/7/72/Bossk_full_body.png',
  wookie:
    'https://static.wikia.nocookie.net/starwars/images/1/1e/Chewbacca-Fathead.png',
  yoda: 'https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
};
const CM_TO_IN_CONVERSION_RATIO = 2.54;

function App() {
  const [data, setData] = useState([])
   
  const fetchData = async() => {
    const arr = []

    await fetch(API_URL)
    .then((response) => response.json()) 
    .then(d => {
      d.species.forEach(el => {
          fetch(el)
          .then((response) => response.json())
          .then(res=> {
            arr.push(res)
            setData([...arr])
        })
      })
    }) 
    .catch(err => console.error(err))
  } 
  useEffect(() => {
    fetchData()
  }, []);

  function getImage(name) {
    let img
    Object.fromEntries(Object.entries(SPECIES_IMAGES)
    .filter(([key, val]) => {
      if(key === name) {
        img = val
      }
    }))
    return img
  }

  return (
    <div className="App">
      <h1>Empire Strikes Back - Species Listing</h1> 
      <div className="App-species">
      {data.map(el => (
        <Species 
          name={el?.name}
          classification={el?.classification}
          designation={el?.designation}
          language={el?.language}
          height={el?.average_height}
          numFilms={el?.films.length}
          image={
            el.name !== `Yoda's species` ? 
            getImage(el.name.toLowerCase()) : 
            getImage(el.name.toLowerCase().substring(0,4))
          }
        />
      ))} 
      </div>
    </div>
  );
}

export default App;