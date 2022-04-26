import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getSingleCat } from '../api';
import styled from 'styled-components';
import { ICatDetails } from '../interfaces';

const CatCard = styled(Card)`
  margin: 10px 0;
`;

const CardImage = styled(Card.Img)`
  object-fit: cover;
  height: 1300px;
`;

const Info = styled.h3`
  margin-top: 50px;
`;

const Details = () => {
  const { imageId } = useParams();
  const [catDetails, setCatDetails] = useState<ICatDetails>({} as ICatDetails);
  const [isLoading, setIsLoading] = useState(false);

  const populateCatDetails = async () => {
    if (!imageId) {
      return;
    }

    const data = await getSingleCat(imageId);

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
      <Row>
        <Col>
          {catDetails.id && (
            <CatCard className="cat-card" style={{ width: '100%' }}>
              <Card.Body>
                <Link to={`/?breed=${catDetails.breeds[0].id}`}>
                  <Button variant="primary">Back</Button>
                </Link>
              </Card.Body>
              <CardImage loading="lazy" variant="top" src={catDetails.url} />
              <Card.Body className="d-grid">
                <h4>{catDetails.breeds[0].name}</h4>
                <h5>Origin: {catDetails.breeds[0].origin}</h5>
                <h6>{catDetails.breeds[0].temperament}</h6>
                <p>{catDetails.breeds[0].description}</p>
              </Card.Body>
            </CatCard>
          )}
          {isLoading && <Info>Loading...</Info>}
          {catNotFound && <Info>Cat not Found</Info>}
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
