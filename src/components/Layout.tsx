import { Container } from "@chakra-ui/react";
import Header from "./Header";

export default function Index() {
        return (
            <Container height="100vh!" bgImg={"top_image.png"} objectFit="cover" >
            <Header />
            </Container>
        )
}