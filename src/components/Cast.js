import { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import styled from '@emotion/styled';

const FancyImg = styled.img({
  width: '200px',
});

const FancyCast = styled.div({
  display: 'flex',
  justifyContent: 'start',
});

const FancyCastElement = styled.li({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  fontWeight: 600,
  rowGap: '10px',
  marginBottom: '10px',
});

const FancyInfo = styled.p({
  margin: 0,
});

export default function Cast() {
  const [cast, getCredits] = useState(null);

  let params = useParams();

  useEffect(() => {
    let abortController = new AbortController();
    api.fetchMovies(`movie/${params.movieId}/credits`, abortController).then(response => {
      getCredits(
        response.cast.map(person =>
          person.profile_path ? (
            <FancyCastElement key={person.name}>
              <FancyImg
                src={'https://image.tmdb.org/t/p/original/' + person.profile_path}
              ></FancyImg>
              <FancyInfo>{person.name}</FancyInfo>
              <FancyInfo>Character: {person.character}</FancyInfo>
            </FancyCastElement>
          ) : (
            <FancyCastElement key={person.name}>
              <FancyInfo>No image</FancyInfo>
              <FancyInfo>{person.name}</FancyInfo>
              <FancyInfo>Character: {person.character}</FancyInfo>
            </FancyCastElement>
          ),
        ),
      );
    });

    return () => abortController.abort();
  }, []);

  return (
    <ErrorBoundary>
      <FancyCast>
        <ul>{cast}</ul>
      </FancyCast>
    </ErrorBoundary>
  );
}
