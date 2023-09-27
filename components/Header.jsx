'use client';
import { useXtrataContext } from '@/utils/XtrataContext';
import { Link as ChakraLink, Box, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { RiMenu5Fill, RiCloseLine } from 'react-icons/ri';

function Header() {
  const { isMenuOpen, setIsMenuOpen } = useXtrataContext();

  //Closes and opens menu
  const menuHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  //Stylings
  const headerStyles = {
    bg: 'blackAlpha.700',
    w: '100%',
    h: 12,
    color: 'white',
    px: { base: '20px', md: '50px' },
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
    textAlign: 'center',
    color: 'whiteAlpha.900',
    w: { base: '100%', md: 'fit-content' },
    ':hover': {
      borderBottom: '2px',
      borderStyle: 'solid',
      borderColor: 'gray.300',
      textDecoration: 'none',
      color: 'yellow.200',
    },
  };
  const menuStyles = {
    display: { base: `${isMenuOpen ? 'flex' : 'none'}`, md: 'flex' },
    flexDirection: { base: 'column', md: 'row' },
    justifyContent: 'center',
    alignItems: 'center',
    position: { base: 'absolute', md: 'relative' },
    top: { base: 12, md: 0 },
    left: 0,
    w: { base: '100%', md: 5 / 6 },
    h: 'fit-content',
    py: { base: 5 },
    bg: { base: 'blackAlpha.700', md: 'none' },
  };
  const menuBurgerStyles = {
    display: { base: 'flex', md: 'none' },
    w: 'fit-content',
    h: 'fit-content',
  };
  return (
    <Box as='header' sx={headerStyles}>
      <ChakraLink as={Link} href='/' sx={logoStyles}>
        Xtrata
      </ChakraLink>
      <HStack as='nav' sx={menuStyles}>
        <ChakraLink as={Link} href='#' sx={navLinkStyles}>
          Extract
        </ChakraLink>
        <ChakraLink as={Link} href='#' sx={navLinkStyles}>
          Check
        </ChakraLink>
      </HStack>
      <Box as='button' sx={menuBurgerStyles} onClick={menuHandler}>
        {isMenuOpen ? (
          <RiCloseLine className='text-white text-3xl hover:cursor-pointer' />
        ) : (
          <RiMenu5Fill className='text-white text-3xl hover:cursor-pointer' />
        )}
      </Box>
    </Box>
  );
}

export default Header;
