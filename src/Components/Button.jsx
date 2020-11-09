import React from "react";
import styled from "styled-components";

function Button({ text, color, bgColor, border, icon, ...props }) {
  return (
    <Container
      type="button"
      color={color}
      bgColor={bgColor}
      border={border}
      {...props}
    >
      {icon && icon}
      {text}
    </Container>
  );
}

Button.defaultProps = {
  text: "",
  color: "silver",
  bgColor: "black",
  border: false,
  icon: null,
};

export default Button;

const Container = styled.button`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  padding: 9px;
  border: ${(props) => (props.border ? `1px solid ${props.color}` : "none")};
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }

  svg {
    margin-right: 8px;
  }
`;
