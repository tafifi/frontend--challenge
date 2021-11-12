import './App.scss';

import React, { useEffect, useState } from 'react';
import { Image, Search } from 'react-feather'

import api from 'api';
import { Autocomplete, Story } from 'models';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { range, useDebounce } from 'utils';
import { Button } from 'components/Button';

const App: React.FC<{}> = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setSearching] = useState(false)
  const [isEmpty, setEmpty] = useState(false)
  const [searchResults, setSearchResults] = useState([] as Story[])

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

  useEffect(() => {
    document.body.onclick = () => setTypingMode(false)
  }, [])

  const search = async () => {
    if (!isSearching && !!searchQuery) {
      try {
        setSearching(true)
        const { data } = await api.search(searchQuery)
        setSearchResults(data.stories)

        if (data.stories.length === 0) {
          setEmpty(true)
        }
      } catch (_) {

      } finally {
        setSearching(false)
      }
    }
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
          <div className="main-search-input" onClick={(e) => e.stopPropagation()}>
            <Search />
            <input
              type="text"
              value={searchQuery}
              onKeyDown={onSubmit}
              autoComplete="none"
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Companies, Organisations, People or Places..."
            />

            <div className={`auto-complete ${(isAutoCompleting || autocomplete.length) && typingMode ? 'visible' : 'hidden'}`}>
              {!!isAutoCompleting && (
                <Skeleton count={5} height={10} />
              )}
              {!isAutoCompleting && autocomplete.map((entity, index) => (
                <button key={index}  onClick={() => handleAutoComplete(entity.text)}>
                  {entity.text}
                </button>
              ))}
            </div>
          </div>
          
          <Button className="search-button" loading={isSearching} onClick={search}>SEARCH</Button>
        </div>
      </header>

      <h1 className="title">Stories</h1>

      {!searchResults.length && !isEmpty && (
        <h2 className="subtitle">Use the search bar to look for stories</h2>
      )}

      {!searchResults.length && isEmpty && (
        <h2 className="subtitle">No results have been found, please use another search key!</h2>
      )}

      <section className="stories">
      {isSearching && range(0, 5).map(index => (
          <div className="story" key={index}>
            <div className="story-details">
              <h2>
                <Skeleton count={1} height={20} baseColor="#ddd" />
              </h2>
              <h3>
                <Skeleton count={1} height={20} />
              </h3>
              <h4>
                <Skeleton count={1} height={20} />
              </h4>
              <p>
                <Skeleton count={1} height={20} />
              </p>
            </div>

            <div className="img-wrapper">
              <Image size={80} />
            </div>
          </div>
        ))}

        {!isSearching && searchResults.map((story, index) => (
          <div className="story" key={index}>
            <div className="story-details">
              <h3>
                {story.author.name}
              </h3>
              <h4>
                {story.title}
              </h4>
              <p>
              {story.hashtags.join(" ")}
              </p>
            </div>

            <div className="img-wrapper">
              {!!story.media.length ? (
                <img src={story.media[0].url} />
              ) : (
                <Image size={80} />
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
