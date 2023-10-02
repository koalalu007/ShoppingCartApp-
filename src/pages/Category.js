import React, { useCallback, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import fakeProducts from '../db/products.json';
import categories from '../db/categories.json';
import { useFilters } from '../lib/useFilters';
import FilterCheckbox from '../components/FilterCheckbox';
import Products from '../components/Products';

function getComputedProducts(products, filters) {
  // Clone the products array to avoid mutating the original data
  const result = [...products];

  if (filters.delivery) {
    // eslint-disable-next-line no-const-assign
    result = result.filter(p => p.delivery === true);
  }

  if (filters.inStock) {
    // eslint-disable-next-line no-const-assign
    result = result.filter(p => p.inStock === true);
  }

  if (filters.expensive) {
    // eslint-disable-next-line no-const-assign
    result = result.filter(p => p.price > 100);
  }

  return result;
}

const Category = ({ category }) => {
  const [products] = useState(
    fakeProducts.filter(p => p.categoryId === category.id)
  );
  const [filter, dispatchFilter] = useFilters({
    delivery: false,
    inStock: false,
    expensive: false,
  });
  const filteredProducts = getComputedProducts(products, filter);

  const onCheckboxChange = useCallback(
    ev => {
      const checkbox = ev.target;

      dispatchFilter({
        type: 'SET',
        filterName: checkbox.name,
        value: checkbox.checked,
      });
    },
    [dispatchFilter]
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} className="mt-4">
          <div className="bg-light p-3 rounded">
            <h2 className="h5 mb-4">Filters</h2>
            <FilterCheckbox
              id="delivery"
              name="delivery"
              checked={filter.delivery}
              onChange={onCheckboxChange}
              label="Delivery"
            />
            <FilterCheckbox
              id="inStock"
              name="inStock"
              checked={filter.inStock}
              onChange={onCheckboxChange}
              label="In stock only"
            />
            <FilterCheckbox
              id="expensive"
              name="expensive"
              checked={filter.expensive}
              onChange={onCheckboxChange}
              label="Expensive (100+ USD)"
            />
            <div className="mt-4">
              <strong>Results:</strong> {filteredProducts.length} out of {products.length}
            </div>
          </div>
        </Col>
        <Col xs={12} md={9} className="mt-4">
          <h1 className="h3">{category.name}</h1>
          <Products products={filteredProducts} />
        </Col>
      </Row>
    </Container>
  );
};

const CategoryContainer = () => {
  const { id } = useParams();

  const category = categories.find(c => c.id === id);

  if (!category) {
    return <div>Category with id {id} does not exist</div>;
  }

  return <Category category={category} />;
};

export default CategoryContainer;
