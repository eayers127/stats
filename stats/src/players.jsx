import React, { useState, useEffect } from 'react';
import { API_TOKEN } from './config';

function Players() {
  const [players, setPlayers] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('PL');

  useEffect(() => {
    fetch(`http://api.football-data.org/v2/competitions/${selectedLeague}/scorers`, {
      headers: {
        'X-Auth-Token': API_TOKEN
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setPlayers(data.scorers);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [selectedLeague]);

  return (
    <div>
      <h2>Top Scorers in the {selectedLeague === 'PL' ? 'Premier League' : 'La Liga'}</h2> {/* conditional rendering for league title */}
      <div>
        <button onClick={() => setSelectedLeague('PL')}>Premier League</button> {/* button to select PL */}
        <button onClick={() => setSelectedLeague('PD')}>La Liga</button> {/* button to select La Liga */}
      </div>
      <ul>
        {players.map(player => (
          <li key={player.player.id}>
            {player.player.name} ({player.team.name}): {player.numberOfGoals} goals
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Players;

