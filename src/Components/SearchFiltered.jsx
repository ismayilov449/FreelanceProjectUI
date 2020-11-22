import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import $ from "jquery";
import { Dropdown, Input, Form ,Button} from "semantic-ui-react";
import api from "../Redux/api";

function SearchFiltered() {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    _getCities();
    _getCategories();
    _getEducation();
  }, {});

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

  return (
    <Dropdown text="Filter Jobs " multiple icon="search">
      <Dropdown.Menu>
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          {" "}
          <br></br>
          <div >
            <Dropdown style={{ marginRight:"10px" }}
              placeholder="Category"
              search
              selection
              options={categories}
            />
            <Dropdown 
              placeholder="Experience"
              search
              selection
              options={categories}
            />
          </div>
          
          <Dropdown.Divider />
          <br></br>
          <div>
            <Dropdown style={{ marginRight:"10px" }}
              placeholder="Education"
              search
              selection
              options={education}
            />
            <Dropdown
              placeholder="Salary"
              search
              selection
              options={categories}
            />
          </div>
          <Dropdown.Divider />
          <br></br>
          <div>
            <Dropdown style={{ marginRight:"10px" }} placeholder="City" search selection options={cities} />
            <Button color='red'>Search</Button>

            <br></br>
          </div>
          <Dropdown.Divider />
          <br></br>
        </div>
        {/* <Input icon='search' iconPosition='left' className='search' />
      <Dropdown.Divider />
      <Dropdown.Header icon='tags' content='Tag Label' />
      <Dropdown.Menu scrolling>
        {tagOptions.map((option) => (
          <Dropdown.Item key={option.value} {...option} />
        ))}
      </Dropdown.Menu> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

SearchFiltered.defaultProps = {};

export default SearchFiltered;
