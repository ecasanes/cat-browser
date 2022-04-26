import { Form, Card } from 'react-bootstrap';
import styled from 'styled-components';

export const Main = styled.main``;

export const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Info = styled.p`
  font-size: 22px;
`;

export const FormLabel = styled(Form.Label)`
  font-size: 22px;
  line-height: 1.8;
`;

export const CatCard = styled(Card)`
  width: 100%;
  margin: 10px 0;
`;

interface IStyledCardImageProps {
  height?: string;
}

export const CardImage = styled(Card.Img)<IStyledCardImageProps>`
  object-fit: cover;
  height: ${({ height }) => height || '200px'};
`;

export const Results = styled.div``;

export const Options = styled.div`
  margin-top: 20px;
`;

export const NotificationsContainer = styled.div`
  margin-top: 20px;
`;
