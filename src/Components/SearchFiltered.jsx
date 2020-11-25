import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import $ from "jquery";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Form,
  Button,
} from "semantic-ui-react";
import api from "../Redux/api";
import SALARIES from "../Redux/Constants/Salaries";
import EXPERIENCE from "../Redux/Constants/Experience";

function SearchFiltered({
  setjobs,
  setOperation,
  setFilters,
  setSubscribedFilters,
  ...props
}) {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperiende] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [data, setData] = useState({
    category: "",
    city: "",
    education: "",
    salary: 0,
    offset: 0,
    limit: 100,
  });
  const [subscribedFilter, setSubscribedFilter] = useState({});
  const [mainList, setList] = useState({});

  useEffect(() => {
    _getCities();
    _getCategories();
    _getEducation();
    _getExperience();
    _getSalaries();
  }, {});

  async function _getCities() {
    const { list, totalCount } = await api.city.getall();
    var tmpList = [];

    list.map((city) => {
      tmpList.push({
        key: city.id,
        text: city.name,
        value: city.name,
      });
    });

    setCities(tmpList);
  }

  const _getSalaries = () => {
    var tmpList = [];
    SALARIES.map((salary) =>
      tmpList.push({ key: salary, text: salary, value: salary })
    );

    setSalaries(tmpList);
  };

  const _getExperience = () => {
    var tmpList = [];
    EXPERIENCE.map((experience) =>
      tmpList.push({ key: experience, text: experience, value: experience })
    );

    setExperiende(tmpList);
  };

  async function _getCategories() {
    const { list, totalCount } = await api.category.getall();

    var tmpList = [];

    list.map((category) => {
      tmpList.push({
        key: category.id,
        text: category.name,
        value: category.name,
      });
    });

    setCategories(tmpList);
  }

  async function _getEducation() {
    const { list, totalCount } = await api.education.getall();
    var tmpList = [];

    list.map((edu) => {
      tmpList.push({
        key: edu.id,
        text: edu.name,
        value: edu.name,
      });
    });

    setEducation(tmpList);
  }

  async function _search(e) {
    e.preventDefault();

    var item = {
      categoryId: categories.find((i) => i.value == data.category).key,
      cityId: cities.find((i) => i.value == data.city).key,
      educationId: education.find((i) => i.value == data.education).key,
      salary: salaries.find((i) => i.value == data.salary).key,
    };

    const filteredJobs = await api.jobs.fullSearch(data);
    setjobs(filteredJobs.data.list);
    setOperation("search");
    setFilters(data);
    setSubscribedFilters(item);
  }

  async function _reset(e) {
    e.preventDefault();

    console.log(subscribedFilter);

    setData({
      category: "",
      city: "",
      education: "",
      salary: 0,
      offset: 0,
      limit: 100,
    });
    setOperation("all");
  }

  return (
    <Dropdown text="Filter Jobs " multiple icon="search">
      <Dropdown.Menu>
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <br></br>
          <div>
            <Dropdown
              style={{ marginRight: "10px" }}
              selection
              name="categoryId"
              placeholder="Category"
              value={data.category}
              options={categories}
              onChange={(e, { name, value }) => {
                setData({ ...data, category: value });
              }}
            />
            <Dropdown
              style={{ marginRight: "10px" }}
              placeholder="City"
              selection
              name="cityId"
              value={data.city}
              options={cities}
              onChange={(e, { name, value }) => {
                setData({ ...data, city: value });
                console.log(data);
              }}
            />
            {/* <Dropdown
              placeholder="Experience"
              selection
              name="experience"
              options={experience}
              onChange={(e, { name, value }) => {
                setData({ ...data, experience: value });
                console.log(data);
              }}
            /> */}
          </div>
          <Dropdown.Divider />
          <br></br>
          <div>
            <Dropdown
              style={{ marginRight: "10px" }}
              placeholder="Education"
              selection
              name="educationId"
              value={data.education}
              options={education}
              onChange={(e, { name, value }) => {
                setData({ ...data, education: value });
              }}
            />
            <Dropdown
              placeholder="Salary"
              selection
              name="salary"
              value={data.salary}
              options={salaries}
              onChange={(e, { name, value }) => {
                setData({ ...data, salary: value });
              }}
            />
          </div>
          <Dropdown.Divider />
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="orange"
              fluid
              style={{ marginRight: "10px" }}
              onClick={(e) => _reset(e)}
            >
              Reset
            </Button>
            <Button
              color="red"
              style={{ marginRight: "10px" }}
              fluid
              onClick={(e) => _search(e)}
            >
              Search
            </Button>
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
