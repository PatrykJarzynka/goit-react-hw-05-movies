import { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

const FancyReviewElement = styled.li({
  textAlign: 'start',
});

const FancyDescription = styled.p({
  fontWeight: 500,
});

export default function Reviews() {
  const [reviews, setReview] = useState([]);

  let params = useParams();

  useEffect(() => {
    let abortController = new AbortController();
    api.fetchMovies(`/movie/${params.movieId}/reviews`, abortController).then(response => {
      setReview(
        response.results.map(review => (
          <FancyReviewElement>
            <h3>Author: {review.author}</h3>
            <FancyDescription>{review.content}</FancyDescription>
          </FancyReviewElement>
        )),
      );
    });

    return () => abortController.abort();
  }, []);

  return reviews.length === 0 ? (
    <ErrorBoundary>
      <p>We don't have any reviews for this movie.</p>
    </ErrorBoundary>
  ) : (
    <ErrorBoundary>
      <div>
        <ul>{reviews}</ul>
      </div>
    </ErrorBoundary>
  );
}
