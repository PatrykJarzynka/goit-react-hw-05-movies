import { useEffect, useState } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import api from '../services/api';
import styled from '@emotion/styled';

const FancyImg = styled.img({
  width: '400px',
  display: 'flex',
  marginLeft: '20px',
  marginRight: '20px',
});

const FancyMovie = styled.div({
  display: 'flex',
});

const FancyData = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'start',
});

const FancyDescription = styled.p({
  fontWeight: 500,
});

const FancyElement = FancyDescription.withComponent('li');

const FancyList = styled.ul({
  listStyle: 'none',
  display: 'flex',
  padding: 0,
  columnGap: '15px',
});

const FancyInformation = styled.section({
  marginTop: '10px',
  textAlign: 'left',
  width: '100%',
  border: '2px solid rgb(219, 215, 215)',
});

const FancyInfoElement = styled.li({
  width: 'max-content',
});

export default function MovieDetailsPage() {
  const [movieInfo, setMovie] = useState(null);
  const [genres, saveGenres] = useState([]);

  let params = useParams();

  useEffect(() => {
    let abortController = new AbortController();
    api.fetchMovies(`movie/${params.movieId}`, abortController).then(response => {
      setMovie(response);
      saveGenres(
        response.genres.map(genre => <FancyElement key={genre.name}>{genre.name}</FancyElement>),
      );
    });

    return () => abortController.abort();
  }, []);

  return (
    movieInfo && (
      <div>
        <ErrorBoundary>
          <section>
            <FancyMovie>
              <FancyImg
                src={'https://image.tmdb.org/t/p/original/' + movieInfo.poster_path}
              ></FancyImg>
              <FancyData>
                <h2>{movieInfo.title}</h2>
                <FancyDescription>User score: {movieInfo.vote_average * 10}%</FancyDescription>
                <h3>Overview</h3>
                <FancyDescription>{movieInfo.overview}</FancyDescription>
                <h3>Genres</h3>
                <FancyList>{genres}</FancyList>
              </FancyData>
            </FancyMovie>
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <FancyInformation>
            <h3>Additional information</h3>
            <ul>
              <FancyInfoElement>
                <Link to={'/movies/' + params.movieId + '/cast'}>Cast</Link>
              </FancyInfoElement>
              <FancyInfoElement>
                <Link to={'/movies/' + params.movieId + '/reviews'}>Reviews</Link>
              </FancyInfoElement>
            </ul>
          </FancyInformation>
        </ErrorBoundary>
        <Outlet />
      </div>
    )
  );
}
