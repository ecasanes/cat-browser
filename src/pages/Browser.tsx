import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { getBreeds, getCatsByBreed } from '../api';
import { useCatContext } from '../context/CatProvider';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 22px;
`;

const FormLabel = styled(Form.Label)`
  font-size: 22px;
  line-height: 1.8;
`;

const CatCard = styled(Card)`
  margin: 10px 0;
`;

const CardImage = styled(Card.Img)`
  object-fit: cover;
  height: 200px;
`;

const Results = styled.div``;

const Options = styled.div`
  margin-top: 20px;
`;

const Browser = () => {
  const { breeds, setBreeds, currentBreed, setCurrentBreed, cats, setCats } = useCatContext();
  const [page, setPage] = useState(0);
  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const breedQuery = searchParams.get('breed');
  const selectRef = useRef<HTMLSelectElement>({} as HTMLSelectElement);

  const isLoading = isLoadingCats || isLoadingBreeds;

  const resetState = () => {
    console.log('resetting state');
    setPage(0);
    setLimitReached(false);
    setIsLoadingCats(false);
    setIsLoadingBreeds(false);
    setCats([]);
  };

  const handleSelectBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('handle select breed', event.target.value);
    const selectedBreed = event.target.value;

    resetState();
    setCurrentBreed(selectedBreed);
  };

  const populateBreedSelection = async () => {
    if (breeds.length > 0) return;

    setIsLoadingBreeds(true);

    const data = await getBreeds();
    setBreeds(data);
    setIsLoadingBreeds(false);
  };

  const populateCatsByBreed = async (loadMore = false) => {
    setIsLoadingCats(true);
    const data = await getCatsByBreed(currentBreed, page);

    if (data.length == 0) {
      setLimitReached(true);
      setIsLoadingCats(false);
      return;
    }

    const [firstCat] = data;
    const foundDuplicate = cats.find((item) => {
      console.log(`${firstCat.id} === ${item.id}`);
      return item.id === firstCat.id;
    });
    console.log({ foundDuplicate });
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

  const handleViewDetails = (id: string) => {
    if (!id) return;
    navigate(`/${id}`);
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
      <Title>Cat browser</Title>
      <main>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <FormLabel column sm="12" md="1" htmlFor="breed">
              Breed
            </FormLabel>
            <Col sm="12" md="3">
              <Form.Select
                ref={selectRef}
                defaultValue={breedQuery ? breedQuery : ''}
                size="lg"
                id="breed"
                onChange={handleSelectBreed}
                disabled={isLoading}
              >
                <option value="">Select breed</option>
                {breeds.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
        <Results>
          <Row>
            {cats.map(({ id, url }) => (
              <Col sm={6} md={3} key={id}>
                <CatCard className="cat-card" style={{ width: '100%' }}>
                  <CardImage loading="lazy" variant="top" src={url} />
                  <Card.Body className="d-grid">
                    <Button variant="primary" onClick={() => handleViewDetails(id)}>
                      View details
                    </Button>
                  </Card.Body>
                </CatCard>
              </Col>
            ))}
          </Row>
          {cats.length == 0 && !isLoading ? <Info>No cats available</Info> : null}
        </Results>
        <Options>
          {!limitReached && (
            <Button
              disabled={cats.length == 0 || isLoading}
              variant="success"
              onClick={handleLoadMore}
            >
              {isLoading ? `Loading Cats ...` : `Load More`}
            </Button>
          )}
        </Options>
      </main>
    </Container>
  );
};

export default Browser;
