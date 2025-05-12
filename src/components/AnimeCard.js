import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <article className="anime-card">
      <Link to={`/anime/${anime.mal_id}`}>
        <figure>
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title} 
          />
        </figure>
        <h3>{anime.title}</h3>
      </Link>
    </article>
  );
}

export default AnimeCard;