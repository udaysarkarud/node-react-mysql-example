import logo from './logo.svg';
import './App.scss';
import { Routes, Route, NavLink } from "react-router-dom";
import Header from './components/Header/Header';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import NewSchool from './components/School/NewSchool/NewSchool';
import Home from './components/Home/Home';
import SchoolList from './components/School/SchoolList/SchoolList';
import EditSchool from './components/School/EditSchool/EditSchool';

function App() {
  return (
    <>
      <Header />
      <Container className="my-3">
        <Row>
          <Col sm={3}>
            <ListGroup>
              <ListGroup.Item variant="primary">School
                <ListGroup>
                  <ListGroup.Item><NavLink to="/newschool">Add New School</NavLink></ListGroup.Item>
                  <ListGroup.Item><NavLink to="/schoollist">All Shool List</NavLink></ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>

              <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
              <ListGroup.Item variant="success">Success</ListGroup.Item>
              <ListGroup.Item variant="danger">Danger</ListGroup.Item>
              <ListGroup.Item variant="warning">Warning</ListGroup.Item>
              <ListGroup.Item variant="info">Info</ListGroup.Item>
              <ListGroup.Item variant="light">Light</ListGroup.Item>
              <ListGroup.Item variant="dark">Dark</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="newschool" element={<NewSchool />} />
              <Route path="schoollist" element={<SchoolList/>} />
              <Route path="editschool/:schoolid" element={<EditSchool/>} />
            </Routes>
            
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
