import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { IBreed } from '../interfaces';
import { FormLabel } from './styled';

interface ICatSelectorProps {
  selectRef: React.RefObject<HTMLSelectElement>;
  breedQuery: string | null;
  handleSelectBreed: React.ChangeEventHandler<HTMLSelectElement>;
  isLoading: boolean;
  breeds: IBreed[];
}

const CatSelector: React.FC<ICatSelectorProps> = ({
  selectRef,
  breedQuery = '',
  handleSelectBreed,
  isLoading,
  breeds = [],
}) => {
  return (
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
  );
};

export default CatSelector;
