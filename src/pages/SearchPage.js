import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AnimeCard from '../components/AnimeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current_page: 1, last_visible_page: 1 });

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const debouncedQuery = useDebounce(query, 250);

  const getTopAnime = async () => {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?page=1&filter=bypopularity&limit=5');
    const data = await response.json();
    setTopAnime(data.data);
  };

  const fetchAnime = async (query, page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&page=${page}&limit=10`
      );
      const data = await response.json();
      setAnimeList(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      fetchAnime(debouncedQuery, page);
    }
  }, [debouncedQuery, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage.toString() });
  };

  return (
    <div className="content-wrap">
      <Sidebar topAnime={topAnime} />
      <main>
        <SearchBar 
          query={query}
          setQuery={(value) => setSearchParams({ q: value, page: '1' })}
        />
        
        {loading && <div className="loading-spinner">Loading...</div>}
        
        <div className="anime-list">
          {animeList.map((anime) => (
            <AnimeCard anime={anime} key={anime.mal_id} />
          ))}
        </div>
        
        {animeList.length > 0 && (
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_visible_page}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default SearchPage;