import React from "react"
import { Spinner } from "reactstrap"
import styled from "styled-components";
import withNavbar from "../hocs/withNavbar";

const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingScreen = () => {
    return <Container>
        <Spinner> Loading... </Spinner>
    </Container>
}

export default withNavbar(LoadingScreen)
