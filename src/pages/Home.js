import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import categories from '../db/categories.json';
import "./Home.css";

const Home = () => {
  const numRows = 3;
  const numCols = 4;
  const numItems = numRows * numCols;
  const limitedCategories = categories.slice(0, numItems);

  return (
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} xl={4}>
        {limitedCategories.map((category) => (
          <Col key={category.id} className="mb-4">
            <Card className="h-100 border-0 shadow-sm card-hover">
              <Link to={`/category/${category.id}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                  className="card-img-top"
                />
              </Link>
              <CardBody>
                <h2 className="h5">
                  <Link to={`/category/${category.id}`} className="text-dark">
                    {category.name}
                  </Link>
                </h2>
                <p className="text-muted">{category.description}</p>
                <Link
                  to={`/category/${category.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Explore {category.name}
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
