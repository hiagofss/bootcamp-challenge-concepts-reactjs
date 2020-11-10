import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
      console.log(response);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Challenge Concepts ReactJS',
      url: 'https://github.com/hiagofss/bootcamp-challenge-concepts-reactjs',
      techs: ['ReactJS', 'React'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log(response);

    if (response.status === 204) {
      repositories.splice();
      const newRepos = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(newRepos);
    } else {
      alert('Houve um erro, tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            {repository.title}
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
