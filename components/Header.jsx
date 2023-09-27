'use client';
import { Link as ChakraLink, Box, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { RiMenu5Fill } from 'react-icons/ri';

function Header() {
  const headerStyles = {
    bg: 'blackAlpha.700',
    w: '100%',
    h: 72,
    color: 'white',
    px: '50px',
    py: '15px',
    backdropBlur: '18px',
    backdropFilter: 'blur',
    shadow: 'md',
    position: 'fixed',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
  };
  const logoStyles = {
    fontSize: 25,
    fontWeight: 'semibold',
    ':hover': {
      color: 'yellow.200',
      textDecoration: 'none',
    },
  };
  const navLinkStyles = {
    px: '10px',
    color: 'whiteAlpha.900',

    ':hover': {
      borderBottom: '2px',
      borderStyle: 'solid',
      borderColor: 'gray.300',
      textDecoration: 'none',
      color: 'yellow.200',
    },
  };
  return (
    <Box as='header' sx={headerStyles}>
      <ChakraLink as={Link} href='/' sx={logoStyles}>
        Xtrata
      </ChakraLink>
      <HStack
        as='nav'
        sx={{
          display: 'flex',
          flexDirection: { base: 'column', md: 'row' },
          position: 'absolute',
          top: 72,
        }}
      >
        <ChakraLink as={Link} href='#' sx={navLinkStyles}>
          Extract
        </ChakraLink>
        <ChakraLink as={Link} href='#' sx={navLinkStyles}>
          Check
        </ChakraLink>
      </HStack>
      <RiMenu5Fill className='text-white text-3xl hover:cursor-pointer' />
    </Box>
  );
}

export default Header;
