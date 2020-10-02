import styled from 'styled-components';

const HomeStyle = styled.div`
    padding: 125px 260px;
    height: calc(100vh - 210px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
    text-align: center;
    margin-bottom: 75px;
    }
    .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .basics {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .checkboxField {
    display: flex;

    height: 40px;
    div {
    display: flex;
    align-items: center;
    justify-content: center;
    }
    input {
    height: 20px;
    width: 20px;
    }
    #manual {
    margin-left: 20px;
    }
    }
    }
    .cordinates-config {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }

    .divRow {
    display: flex;
    .divField {
    width: 90%;
    margin: 0px 0px 30px 0px;
    display: flex;
    flex-direction: column;
    }
    }
    .divField {
    width: 90%;
    margin: 0px 0px 30px 0px;
    display: flex;
    flex-direction: column;
    label {
    margin-bottom: 15px;
    display: flex;
    flex-direction:column;
    }

    select {
    height: 30px;
    min-width: 290px;
    width: 290px;
    margin-top: 10px;
    }
    input {
    width: 90%;
    height: 30px;
    margin-top: 10px;

    }
    }
    }
    .run {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    width: 300px;
    margin: 50px auto;
    height: 50px;
    cursor: pointer;
    }

    @media screen and (max-width: 1550px) {
    padding: 100px 120px;
    }

    @media screen and (max-width: 1050px) {
    padding: 100px 40px;
    }

    @media screen and (max-width: 850px) {
    padding: 30px 40px;
    height: 100%;

    h1 {
    margin-bottom: 30px;
    }

    .wrapper {
    margin: 100px 0px 10px 0px;
    height: 100%;
    flex-direction: column;
    .basics,
    .cordinates-config {
    width: 100%;
    }
    }
    }

    @media screen and (max-width: 850px) {
    padding: 30px 10px;
    height: 100%;

    .run {
    margin: 5px 0px;
    }
    }
    `;

export default HomeStyle;
