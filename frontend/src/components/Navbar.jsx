import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={'1440px'}>
      <Flex
        h={16}
        flexDirection={{
          base: 'column',
          sm: 'row',
        }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text
          fontSize={{
            base: '22',
            sm: 28,
          }}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textTransform="uppercase"
          textAlign="center"
          fontWeight="bold"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={3} alignItems="center">
          <Button>
            <Link to={'/create'}>
            <PlusSquareIcon fontSize="20"/>
            </Link>
            
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
