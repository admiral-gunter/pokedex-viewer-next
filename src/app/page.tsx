'use client';
import React, { useEffect, useState } from "react";
import './App.css';
import Modal from "@/components/Modal";

const backgrounds: Record<string, string> = {
  fire: '#FFA07A',    // Soft red (Light Salmon)
  bug: '#FFFFE0',     // Soft yellow (Light Yellow)
  poison: '#DDA0DD',  // Soft purple (Plum)
  grass: '#98FB98',   // Soft green (Pale Green)
  water: '#AFEEEE',   // Soft teal (Pale Turquoise)
};

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

interface PokemonAPIResponse {
  results: {
    name: string;
    url: string;
  }[];
}

function App() {
  const [pokedexs, setPokedex] = useState<Pokemon[]>([]);

  function fetchPokemonData(pokemon: { name: string; url: string }) {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((pokeData: Pokemon) => {
        setPokedex((prevItems) => [...prevItems, pokeData]);
      });
  }

  function fetchKantoPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=15')
      .then((response) => response.json())
      .then((allpokemon: PokemonAPIResponse) => {
        allpokemon.results.forEach((pokemon) => {
          fetchPokemonData(pokemon);
        });
      });
  }

  useEffect(() => {
    fetchKantoPokemon();
    console.log("useEffect: DOM is rendered and painted");
  }, []);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  const [detailPokeDex, setDetailPokeDex] = useState<any>({});


  return (
    <div className="App">
      {/* Main container for centering */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5%' }}>
        {/* Inner container for wrapping */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {pokedexs.map((item, index) => (
            <div
              onClick={() => {
                openModal();
                setDetailPokeDex(item);

              }}
              key={index}
              className="card"
              style={{
                backgroundColor: backgrounds[item.types[0].type.name] || '#FFFFFF',
                padding: '10px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '15%', // You can adjust the width for responsiveness
              }}
            >
              <h3 style={{ fontWeight: 'bold' }}>{item.name.toLocaleUpperCase()}</h3>
              <img src={item.sprites.front_default} alt={item.name} style={{ width: '100%' }} />

              {/* Type buttons */}
              <ul>
                {item.types.map((type, typeIndex) => (
                  <li
                    key={typeIndex}
                  > <button
                    className="rounded-button"
                    style={{
                      marginBottom: '5%',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      backgroundColor: '#eee',
                      cursor: 'pointer',
                    }}
                  >
                      {type.type.name.toString().replaceAll('-', ' ')}
                    </button>
                  </li>
                ))}
              </ul>


            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="My Modal" >
        <img src={detailPokeDex?.sprites?.front_default} alt="nonexists" style={{
          width: '300px', height: '300px', position: 'absolute',
          left: '50%',
          top: '30%',
          transform: 'translate(-50%, -20%)',
          objectFit: 'contain',
        }}>

        </img>
        <div style={{
          backgroundColor:
            detailPokeDex?.types?.[0]?.type?.name
              ? backgrounds[detailPokeDex.types[0].type.name]
              : '#FFFFFF',
        }}>

          <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '2%' }}>
            <button onClick={closeModal}>
              &times;
            </button>

          </div>
          <div style={{ display: 'flex', justifyContent: 'start', marginLeft: '20px' }}>
            <h4
              style={{
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black',

                fontSize: 20
              }}
            >
              {detailPokeDex?.name.toString().toUpperCase()}
            </h4>
          </div>



          <div style={{ padding: '2%', backgroundColor: 'white', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', marginTop: '30%' }}>
            <p>This is a modal content!</p>

            <div style={{ height: '200px' }}></div>
          </div>


        </div>
      </Modal >
    </div >
  );
}

export default App;
