import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const AnimeDetail = () => {
	const { id } = useParams();
	const [anime, setAnime] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
				const data = await response.json();
				setAnime(data.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchAnimeDetails();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!anime) return <div>No anime found</div>;

	return (
		<div className="anime-detail">
			<Link to="/" className="back-button">← Back to Search</Link>

			<div className="anime-header">
				<img src={anime.images.jpg.large_image_url} alt={anime.title} />
				<div className="anime-info">
					<h1>{anime.title}</h1>
					<div className="meta">
						<span>Score: {anime.score}</span>
						<span>Episodes: {anime.episodes}</span>
						<span>Status: {anime.status}</span>
					</div>
				</div>
			</div>

			<div className="anime-content">
				<h3>Synopsis</h3>
				<p>{anime.synopsis}</p>

				<h3>Details</h3>
				<div className="details-grid">
					<div>
						<strong>Type:</strong> {anime.type}
					</div>
					<div>
						<strong>Source:</strong> {anime.source}
					</div>
					<div>
						<strong>Duration:</strong> {anime.duration}
					</div>
					<div>
						<strong>Rating:</strong> {anime.rating}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimeDetail;