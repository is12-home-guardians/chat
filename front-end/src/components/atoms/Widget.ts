import styled from "styled-components";

export default styled.div`
    box-shadow: 0px 0px 20px 4px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 1rem;
    border-radius: 8px;
    height: 60vh;
    width: 40vw;
    @media (max-width: 1020px) and (min-width: 768px) {
        height: 60vh;
        width: 80vw;
    }

    @media (max-width: 767px) {
        height: calc(100vh - 6rem);
        width: 100%;
        border-radius: 0;
    }
`;
