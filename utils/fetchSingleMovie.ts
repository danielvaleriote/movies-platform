export const fetchSingleMovie = async (movieID: number | string) => {
	const result = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.API_KEY}&language=pt-BR`);
	return await result.json();
};