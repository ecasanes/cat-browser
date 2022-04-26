import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

const CatCard = styled(Card)`
  margin: 10px 0;
`;

const CardImage = styled(Card.Img)`
  object-fit: cover;
  height: 1300px;
`;

const Details = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CatCard className="cat-card" style={{ width: '100%' }}>
            <Card.Body>
              <Button variant="primary">Back</Button>
            </Card.Body>
            <CardImage loading="lazy" variant="top" src="" />
            <Card.Body className="d-grid">
              <h4>Name</h4>
              <h5>Origin: Egypt</h5>
              <h6>Temperament</h6>
              <p>Description</p>
            </Card.Body>
          </CatCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
