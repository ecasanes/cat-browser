import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getSingleCat } from '../api';
import { ICatDetails } from '../interfaces';
import { Info, Main, NotificationsContainer } from '../components/styled';
import CatCard from '../components/CatCard';

const Details = () => {
  const { imageId } = useParams();
  const [catDetails, setCatDetails] = useState<ICatDetails>({} as ICatDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const populateCatDetails = async () => {
    if (!imageId) {
      return;
    }

    const data = await getSingleCat(imageId);

    if (data === null) {
      setHasError(true);
      return;
    }

    if (!data) {
      setIsLoading(false);
      return;
    }

    console.log('details: ', data);
    setCatDetails(data);
    setIsLoading(false);
  };

  const catNotFound = !catDetails.id && !isLoading;

  useEffect(() => {
    if (!imageId) return;
    setIsLoading(true);
    populateCatDetails();
  }, [imageId]);

  return (
    <Container>
      <Main>
        <Row>
          <Col>
            {catDetails.id && (
              <CatCard
                imageHeight="100%"
                url={catDetails.url}
                header={
                  <Link to={`/?breed=${catDetails.breeds[0].id}`}>
                    <Button variant="primary">Back</Button>
                  </Link>
                }
              >
                <h4>{catDetails.breeds[0].name}</h4>
                <h5>Origin: {catDetails.breeds[0].origin}</h5>
                <h6>{catDetails.breeds[0].temperament}</h6>
                <p>{catDetails.breeds[0].description}</p>
              </CatCard>
            )}
          </Col>
        </Row>
        <NotificationsContainer>
          {isLoading && !hasError && <Info>Loading...</Info>}
          {catNotFound && !hasError && (
            <>
              <Info>Cat not Found</Info>
              <Link to="/">
                <Button variant="primary">Back</Button>
              </Link>
            </>
          )}
          {hasError && (
            <Alert variant="danger">
              Apologies but we could not load new cats for you at this time! Miau!
            </Alert>
          )}
        </NotificationsContainer>
      </Main>
    </Container>
  );
};

export default Details;
