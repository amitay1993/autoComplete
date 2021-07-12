import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  & img {
    height: 25px;
    width: 25px;
  }
`;

export const Search = styled.div`
  position: relative;

  & input {
    height: 25px;
    text-indent: 35px;
  }
  > img {
    padding: 0.2rem;
    position: absolute;
    width: 24px;
    height: 24px;
  }
`;

export const CountryList = styled.ul`
  list-style-type: none;
`;

export const CountryListItem = styled.li`
  display: flex;
  border: 1px solid lightgray;
  padding: 0.5rem;

  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }

  &[data-selected="true"] {
    background-color: #7ab3b3;
  }

  &[data-focused="true"] {
    background-color: #deffff;
  }
`;
