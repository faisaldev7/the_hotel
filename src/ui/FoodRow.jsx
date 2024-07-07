import styled, { css } from "styled-components";

const FoodRow = styled.div`
  /* display: flex; */

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

FoodRow.defaultProps = {
  type: "vertical",
};

export default FoodRow;
