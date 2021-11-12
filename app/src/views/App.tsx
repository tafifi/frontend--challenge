import './App.scss';

import React, { useEffect, useState } from 'react';
import { Search } from 'react-feather'

import api from 'api';
import { Autocomplete } from 'models';
import { useDebounce } from 'util/hooks';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const App: React.FC<{}> = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setSearching] = useState(false)

  const [typingMode, setTypingMode] = useState(false)
  const [isAutoCompleting, setAutoCompleting] = useState(false)
  const [autocomplete, setAutocomplete] = useState([] as Autocomplete[])

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)
    if (!!searchQuery.length) {
      setTypingMode(true)
      setAutoCompleting(true)
    } else {
      setAutocomplete([])
    }
  };

  const handleAutoComplete = (searchQuery: string) => {
    setSearchQuery(searchQuery)
    setAutocomplete([])
    setTypingMode(false)
    search()
  };

  const getAutoComplete = async () => {
    if (!!searchQuery.length) {
      try {
        const { data } = await api.autocomplete(searchQuery)
        setAutocomplete(data.autocompletes || [])
      } catch (_) {
        setAutocomplete([])
      } finally {
        setAutoCompleting(false)
      }
    }
  }

  useEffect(() => {
    if (!!debouncedSearchTerm) {
      getAutoComplete()
    }
  }, [debouncedSearchTerm]);

  const search = async () => {
  }

  const onSubmit = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      search()
    }
  }

  return (
    <main className="App">
      <header>
        <div className="main-search">
          <div className="main-search-input">
            <Search />
            <input
              type="text"
              value={searchQuery}
              onKeyDown={onSubmit}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Companies, Organisations, People or Places..."
            />

            <div className={`auto-complete ${(isAutoCompleting || autocomplete.length) && typingMode ? 'visible' : 'hidden'}`}>
              {!!isAutoCompleting && (
                <Skeleton count={5} height={10} />
              )}
              {!isAutoCompleting && autocomplete.map((entity, index) => (
                <button key={index} onClick={() => handleAutoComplete(entity.text)}>
                  {entity.text}
                </button>
              ))}
            </div>
          </div>
          <button className="search-button">SEARCH</button>
        </div>
      </header>
      <section className="results">

      </section>
    </main>
  );
}

export default App;
