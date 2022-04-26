import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { getBreeds, getCatsByBreed } from '../api';
import { useCatContext } from '../context/CatProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Info, Main, NotificationsContainer, Options, Results, Title } from '../components/styled';
import CatSelector from '../components/CatSelector';
import CatCard from '../components/CatCard';

const Browser = () => {
  const { breeds, setBreeds, currentBreed, setCurrentBreed, cats, setCats } = useCatContext();
  const [page, setPage] = useState(0);
  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const breedQuery = searchParams.get('breed');
  const selectRef = useRef<HTMLSelectElement>({} as HTMLSelectElement);

  const isLoading = isLoadingCats || isLoadingBreeds;

  const resetState = () => {
    setPage(0);
    setLimitReached(false);
    setIsLoadingCats(false);
    setIsLoadingBreeds(false);
    setCats([]);
  };

  const handleViewDetails = (id: string) => {
    if (!id) return;
    navigate(`/${id}`);
  };

  const handleSelectBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = event.target.value;

    resetState();
    setCurrentBreed(selectedBreed);
  };

  const populateBreedSelection = async () => {
    if (breeds.length > 0) return;

    setIsLoadingBreeds(true);

    const data = await getBreeds();

    if (data === null) {
      setHasError(true);
      return;
    }

    setBreeds(data);
    setIsLoadingBreeds(false);
  };

  const populateCatsByBreed = async (loadMore = false) => {
    setIsLoadingCats(true);
    const data = await getCatsByBreed(currentBreed, page);

    if (data === null) {
      setHasError(true);
      return;
    }

    if (data.length == 0) {
      setLimitReached(true);
      setIsLoadingCats(false);
      return;
    }

    const [firstCat] = data;
    const foundDuplicate = cats.find((item) => {
      return item.id === firstCat.id;
    });

    if (foundDuplicate) {
      setLimitReached(true);
      setIsLoadingCats(false);
      return;
    }

    if (loadMore) {
      setCats((prevCats) => [...prevCats, ...data]);
      setIsLoadingCats(false);
      return;
    }

    setCats(data);
    setIsLoadingCats(false);
  };

  const handleLoadMore = () => {
    setIsLoadingCats(true);
    setPage((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    populateBreedSelection();
    return () => {
      resetState();
    };
  }, []);

  useEffect(() => {
    if (!currentBreed) return;

    const hasMore = page > 0;
    populateCatsByBreed(hasMore);
  }, [currentBreed, page]);

  useEffect(() => {
    if (!breedQuery || !breeds) return;
    setCurrentBreed(breedQuery);
    selectRef.current.value = breedQuery;
  }, [breedQuery, breeds]);

  return (
    <Container>
      <Main>
        <Title>Cat browser</Title>
        <CatSelector
          selectRef={selectRef}
          handleSelectBreed={handleSelectBreed}
          breedQuery={breedQuery}
          isLoading={isLoading}
          breeds={breeds}
        />
        <Results>
          <Row>
            {cats.map(({ id, url }) => (
              <Col sm={6} md={3} key={id}>
                <CatCard url={url}>
                  <Button variant="primary" onClick={() => handleViewDetails(id)}>
                    View details
                  </Button>
                </CatCard>
              </Col>
            ))}
          </Row>
          {cats.length == 0 && !isLoading ? <Info>No cats available</Info> : null}
        </Results>
        <NotificationsContainer>
          {hasError && (
            <Alert variant="danger">
              Apologies but we could not load new cats for you at this time! Miau!
            </Alert>
          )}
        </NotificationsContainer>
        <Options>
          {!limitReached && !hasError && (
            <Button
              disabled={cats.length == 0 || isLoading}
              variant="success"
              onClick={handleLoadMore}
            >
              {isLoading ? `Loading Cats ...` : `Load More`}
            </Button>
          )}
        </Options>
      </Main>
    </Container>
  );
};

export default Browser;
