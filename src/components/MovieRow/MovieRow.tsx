import { useState } from 'react';
import {IMoviesList} from '../../utils/moviesLists';
import { MovieItem } from '../MovieItem/MovieItem';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import "./MovieRow.scss";

const imgWidth = 200;
const imageBaseUrl = `https://image.tmdb.org/t/p/w${imgWidth}`;

interface Props {
	title: string,
	list: any[]
}

const MovieRow: React.FC<Props> = ({title, list}) => {
	const fullListWidth = list.length * imgWidth;

	const [hScrollPosition, setHScrollPosition] = useState<number>(0);

	const arrowLeftAction = () => {
		if (hScrollPosition + Math.round(window.innerWidth / 2) >= 0) setHScrollPosition(0)
		else setHScrollPosition((currPosition => currPosition + Math.round(window.innerWidth / 2)))
	}

	const arrowRightAction = () => {
		if((window.innerWidth - fullListWidth) > hScrollPosition - Math.round(window.innerWidth / 2)) {
			setHScrollPosition((window.innerWidth - fullListWidth) + 350)
		}
		setHScrollPosition((currPosition => currPosition - imgWidth * 2))
	}

	return <div className='rowContainer'>
		<h1 className="rowTitle">{title}</h1>
		<div className="moviesListArea">
			<span className="leftArrow rowMovementArrow" style={{ display: hScrollPosition === 0 ? 'none' : 'flex'}} onClick={() => arrowLeftAction()}>
				<BsArrowLeftShort fontSize="100px" opacity={.7} />
			</span>
			<span className="rightArrow rowMovementArrow" onClick={() => arrowRightAction()}>
				<BsArrowRightShort fontSize="100px" opacity={.7} />
			</span>
			<ul className='moviesList' style={{
				marginLeft: hScrollPosition+'px',
				width: fullListWidth
			}}>
			{
				list.map((movie): any => <MovieItem 
					title={movie.title} 
					img={`${imageBaseUrl}${movie.poster_path}`}
					key={movie.id}
					/>
				)
			}
			</ul>
		</div>
	</div>
}

export default MovieRow