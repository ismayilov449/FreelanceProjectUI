import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import api from "../../Redux/api";
import { Button, Card, Form, Grid, Col, Row, ListGroup } from "react-bootstrap";
import RULES from "../../Redux/Constants/Rules";
import AGES from "../../Redux/Constants/Ages";
import SALARIES from "../../Redux/Constants/Salaries";
import EXPERIENCE from "../../Redux/Constants/Experience";

function Job(jobModel) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [opacityCard, setOpacityCard] = useState(0.2);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [education, setEducation] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    _getCities();
    _getCategories();
    _getEducation();
    _getCurrentUser();
  }, {});

  function _confirm(e) {
    e.preventDefault();
    console.log(data);
    setOpacityCard(1);
    setToggleSubmit(true);
  }

  async function _getCities() {
    const { list, totalCount } = await api.city.getall();
    setCities(list);
  }

  async function _getCategories() {
    const { list, totalCount } = await api.category.getall();
    setCategories(list);
  }

  async function _getEducation() {
    const { list, totalCount } = await api.education.getall();
    setEducation(list);
  }

  async function _getCurrentUser() {
    const recruiter = await api.auth.getCurrentUser();
    setData({ ...data, recruiterId: recruiter.id });
  }

  async function _onSave(e) {
    e.preventDefault();
    await api.jobs.post(data);
    console.log(data);
  }

  return (
    <Container>
      <Leftside>
        <Card border="danger" style={{ padding: "20px", margin: "20px" }}>
          <Card.Header
            style={{
              background: "#f0dfdf",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Əlaqə
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <Form>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Telefon</Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Phone"
                    onChange={(e) => {
                      setData({ ...data, phone: e.target.value });
                    }}
                  />
                </Form.Group>

                <Button variant="primary" onClick={(e) => _confirm(e)}>
                  Davam et
                </Button>
              </Form>
            </blockquote>
          </Card.Body>
        </Card>

        <Card
          border="danger"
          style={{ padding: "20px", margin: "20px", opacity: opacityCard }}
        >
          <Card.Header
            style={{
              background: "#f0dfdf",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Elan
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <Form>
                <Form.Group controlId="category">
                  <Form.Label>Kateqoriya</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      setData({ ...data, categoryId: e.target.value });
                    }}
                  >
                    <option disabled selected>
                      Seçin
                    </option>
                    {categories.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="position">
                  <Form.Label>Vəzifə</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vəzifə"
                    onChange={(e) => {
                      setData({ ...data, position: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label>Şəhər</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      setData({ ...data, cityId: e.target.value });
                    }}
                  >
                    <option disabled selected>
                      Seçin
                    </option>
                    {cities.map((city) => (
                      <option value={city.id}>{city.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Form.Label>Maaş</Form.Label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Form.Label>minimum</Form.Label>
                    <Form.Group controlId="salaryMin">
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          setData({ ...data, salaryMin: e.target.value });
                        }}
                      >
                        <option disabled selected>
                          Seçin
                        </option>
                        {SALARIES.map((salary) => (
                          <option>{salary}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Form.Label>maximum</Form.Label>
                    <Form.Group
                      controlId="salaryMax"
                      onChange={(e) => {
                        setData({ ...data, salaryMax: e.target.value });
                      }}
                    >
                      <Form.Control as="select">
                        <option disabled selected>
                          Seçin
                        </option>
                        {SALARIES.map((salary) => (
                          <option>{salary}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Form.Label>Yaş </Form.Label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginLeft: "15px",
                    }}
                  >
                    <Form.Label>minimum</Form.Label>
                    <Form.Group controlId="ageMin">
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          setData({ ...data, ageMin: e.target.value });
                        }}
                      >
                        <option disabled selected>
                          Seçin
                        </option>
                        {AGES.map((age) => (
                          <option>{age}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Form.Label>maximum</Form.Label>
                    <Form.Group controlId="ageMax">
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          setData({ ...data, ageMax: e.target.value });
                        }}
                      >
                        <option disabled selected>
                          Seçin
                        </option>
                        {AGES.map((age) => (
                          <option>{age}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>

                <Row>
                  <Col xs={6}>
                    <div
                      style={{
                        alignItems: "baseline",
                      }}
                      id="educationDiv"
                    >
                      <Form.Label>Təhsil</Form.Label>
                      <Form.Group controlId="education">
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            setData({ ...data, educationId: e.target.value });
                          }}
                        >
                          <option selected disabled>
                            Seçin
                          </option>
                          {education.map((edu) => (
                            <option value={edu.id}>{edu.name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div
                      style={{
                        alignItems: "baseline",
                      }}
                    >
                      <Form.Label>İş təcrübəsi</Form.Label>
                      <Form.Group controlId="experience">
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            setData({ ...data, experience: e.target.value });
                          }}
                        >
                          <option>Seçin</option>
                          {EXPERIENCE.map((exp) => (
                            <option>{exp}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <div
                  style={{
                    //justifyContent: "space-between",
                    display: "grid",
                    alignItems: "baseline",
                    marginTop: "20px",
                  }}
                >
                  <Form.Label>Namizədə tələblər</Form.Label>
                  <textarea
                    id="requirements"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      setData({ ...data, requirements: e.target.value });
                    }}
                  ></textarea>
                </div>
                <div
                  style={{
                    //justifyContent: "space-between",
                    display: "grid",
                    alignItems: "baseline",
                    marginTop: "20px",
                  }}
                >
                  <Form.Label>İş barədə məlumat</Form.Label>
                  <textarea
                    id="description"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      setData({ ...data, description: e.target.value });
                    }}
                  ></textarea>
                </div>
                <Form.Group
                  controlId="companyName"
                  style={{ marginTop: "20px" }}
                >
                  <Form.Label>Şirkət adı</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Şirkət adı"
                    onChange={(e) => {
                      setData({ ...data, companyName: e.target.value });
                    }}
                  />
                </Form.Group>

                {toggleSubmit ? (
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      _onSave(e);
                    }}
                    onSubmit={(e) => {}}
                  >
                    Yerləşdirin
                  </Button>
                ) : (
                  ""
                )}
              </Form>
            </blockquote>
          </Card.Body>
        </Card>
      </Leftside>
      <Rightside>
        <ListGroup variant="flush">
          {RULES.map((rule, j, { i = 1 }) => (
            <ListGroup.Item
              style={{ fontFamily: "segoe ui", fontSize: "18px" }}
            >
              {(j = i + j++)} - {rule}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Rightside>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  marginleft: 20%;
  width: 100%;
`;

const Leftside = styled.div`
  flex: 1;
  margin: 10px;
`;

const Rightside = styled.div`
  flex: 1;
  margin: 50px;
`;

const Input = styled.input`
  margin: 20px;
  border-radius: 5px;
`;

Job.defaultProps = {};

export default Job;
