import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import Header from './Header'


export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100vh"
    bgClip="text"
    bgImg={'url(https://bit.ly/2Z4KKcF)'}
  >

    <Heading textColor={'black'} fontSize="6vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Start your journey for free',
}
