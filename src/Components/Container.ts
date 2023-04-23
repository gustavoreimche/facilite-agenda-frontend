import styled from 'styled-components';


type ContainerProps = {
    hardColor: string;
    weakColor: string;
}

export const Container = styled.div<ContainerProps>`
  padding: 0 5px 0 5px;
  max-width: 900px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${props => props.hardColor};

  .header{
    background-color: ${props => props.hardColor};
  }

  
  .total-valor{
    background-color: ${props => props.weakColor};

  }
  .despesas-valor, .valor-entradas{
    background-color: ${props => props.hardColor};
  }

  .footer label{
    color: ${props => props.hardColor};
  }

  .chk input:checked + span {
    background-color: ${props => props.hardColor};
  }

  .chk span {
    width: 8px;
    height: 8px;
    display: block;
    background-color: #fff;
    border: 1px solid ${props => props.hardColor};
    border-radius: 10px;
    margin-left: 14px;
    margin-right: 11px;
    margin-top: 7px;
  }

  .body .row{
    border-bottom: 1px solid ${props => props.weakColor};
  }

  @media screen and (max-width: 985px) {
      margin-right: 10px;
      margin-left: 10px;
    }
  
`;