import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import validator from "validator";
//actions
import { signIn } from "../../Redux/Slicers/user.slice";
//components
import Button from "../../Components/Button";
//image

function AuthPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function _onChange(e) {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  async function _onClick(e) {
    // setLoading(true);
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(signIn(data));
        history.push("/home");
      } catch (err) {
        console.log(err);
        setErrors({
          email: "Server side error",
        });
      } finally {
        // setLoading(false);
      }
    } else {
      //setLoading(false);
    }
  }

  function validate(data) {
    const errors = {};
    if (!validator.isLength(data.password, { min: 8, max: 64 }))
      errors.password = "Şifrə minimum 8 simvol olmalıdır.";
    if (!validator.isLength(data.email, { min: 3, max: 64 }))
      errors.email =
        "İsitfadəçi adı minimum 8 simvol olmalıdır və bir böyük hərif tutmalıdır.";
    return errors;
  }

  return (
    <Container>
      <FormWrap>
        <Header>
          <h2>Giriş</h2>
        </Header>
        <Form>
          <label htmlFor="text">
            <span>Email</span>
            <input
              type="text"
              id="text"
              name="email"
              onChange={_onChange}
              value={data.email}
              required={true}
              autoComplete="off"
            />
          </label>

          <label htmlFor="password">
            <span>Şifrə</span>
            <input
              type="password"
              id="password"
              name="password"
              onChange={_onChange}
              value={data.password}
              required={true}
              autoComplete="off"
            />
          </label>

          <Inline>
            <Button
              text="Log in"
              color="white"
              bgColor="#084A62"
              onClick={_onClick}
              //disabled={loading}
            />
            {errors.email && <span>{errors.email}</span>}
            {errors.password && <span>{errors.password}</span>}
            {/* {loading ? <img src={loadingSvg} alt="loader-svg" /> : null} */}
          </Inline>
        </Form>
      </FormWrap>
    </Container>
  );
}

AuthPage.defaultProps = {};

export default AuthPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  filter: blur(8px);
  background-image: ${(
    props
  ) => `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
   url(${props.bgImage})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const FormWrap = styled.div`
  width: 550px;
  background-color: white;
`;

const Header = styled.div`
  padding: 20px;
  height: 70px;
  background-color: #084a62;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: white;
  }
`;

const Form = styled.form`
  padding: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    width: 100%;
    span {
      margin-bottom: 8px;
      font-weight: bold;
      font-size: 18px;
    }
    input {
      padding: 20px;
      border: 1px solid silver;
      border-radius: 5px;
    }
  }
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  label {
    flex-direction: row !important;
    align-items: center;
    input {
      width: 22px;
      height: 22px;
    }
    span {
      margin: 0 0 0 8px;
    }
  }

  button {
    padding: 15px;
  }
`;
