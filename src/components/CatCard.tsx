import React from 'react';
import { Card } from 'react-bootstrap';
import { CatCard as CardContainer, CardImage } from './styled';

interface ICatCardProps {
  url: string;
  imageHeight?: string;
  header?: JSX.Element;
  children?: React.ReactNode;
}

const CatCard: React.FC<ICatCardProps> = ({ url, imageHeight, header, children }) => {
  return (
    <CardContainer>
      {header && <Card.Body>{header}</Card.Body>}
      <CardImage height={imageHeight} loading="lazy" variant="top" src={url} />
      {children && <Card.Body className="d-grid">{children}</Card.Body>}
    </CardContainer>
  );
};

export default CatCard;
