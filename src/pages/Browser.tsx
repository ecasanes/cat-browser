import React from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 20px;
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

const Browser = () => {
  const handleSelectBreed = () => {
    console.log('handle select breed');
  };

  const handleViewDetails = () => {
    console.log('handle view details');
  };

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
              <Form.Select size="lg" id="breed" onChange={handleSelectBreed}>
                <option value="">Select breed</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
        <Results>
          <Row>
            <Col sm={6} md={3}>
              <CatCard className="cat-card" style={{ width: '100%' }}>
                <CardImage loading="lazy" variant="top" src="" />
                <Card.Body className="d-grid">
                  <Button variant="primary" onClick={handleViewDetails}>
                    View details
                  </Button>
                </Card.Body>
              </CatCard>
            </Col>
          </Row>
        </Results>
      </main>
    </Container>
  );
};

export default Browser;
