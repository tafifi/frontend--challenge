import React from 'react';
import './App.scss';

import { Search } from 'react-feather'

const App: React.FC<{}> = () => {
  return (
    <main className="App">
      <header>
        <div className="main-search">
          <Search />
          <input type="text" placeholder="Companies, Organisations, People or Places..." />
        </div>
        <button>SEARCH</button>
      </header>
    </main>
  );
}

export default App;
