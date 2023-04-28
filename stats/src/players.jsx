import React, { useState, useEffect } from 'react';
import { API_TOKEN } from './config';

function Players() {
  const [players, setPlayers] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('PL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`http://api.football-data.org/v2/competitions/${selectedLeague}/scorers`, {
      headers: {
        'X-Auth-Token': API_TOKEN
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // log the response data to the console
        setPlayers(data.scorers); // set the state with the player data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedLeague]);

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers = players.filter(player =>
    player.player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Top Scorers</h2>
      <div>
        <label htmlFor="league-select">Select a league:</label>
        <select id="league-select" value={selectedLeague} onChange={handleLeagueChange}>
          <option value="PL">Premier League</option>
          <option value="PD">La Liga</option>
        </select>
      </div>
      <div>
        <label htmlFor="search-input">Search for a player:</label>
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {filteredPlayers.map(player => (
          <li key={player.player.id}>
            {player.player.name} ({player.team.name}): {player.numberOfGoals} goals
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Players;

