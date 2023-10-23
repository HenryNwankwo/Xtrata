'use client';
import { useXtrataContext } from '@/utils/XtrataContext';
import { Link as ChakraLink, Box, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { RiMenu5Fill, RiCloseLine } from 'react-icons/ri';
import { imageConfig } from '@/utils/imageConfig';
import { FaFileExport } from 'react-icons/fa6';
import { AiOutlineFileSearch, AiOutlineFile } from 'react-icons/ai';
import { LuFileCheck, LuFileOutput, LuFileStack } from 'react-icons/lu';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

function Header() {
  const { isMenuOpen, setIsMenuOpen, filesOpen, setFilesOpen } =
    useXtrataContext();

  //Closes and opens menu
  const menuHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  //Stylings
  const asideStyles = {
    bg: 'blue.700',
    w: { base: '50px', md: '90px', lg: '220px' },
    h: '100vh',
    color: 'gray.600',
    py: '15px',
    backdropBlur: '18px',
    backdropFilter: 'blur',
    shadow: 'md',
    position: 'fixed',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    overflowY: 'auto',
  };
  const logoStyles = {
    fontSize: 25,
    color: 'blue.700',
    fontWeight: 'semibold',
    fontSize: { md: '1rem', lg: '2rem' },
    bg: 'whiteAlpha.900',
    w: '100%',
    p: '10px',
    ':hover': {
      textDecoration: 'none',
      bg: 'whiteAlpha.800',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const navLinkStyles = {
    px: '10px',
    py: '15px',
    textAlign: 'center',
    color: 'whiteAlpha.900',
    textAlign: 'center',
    display: 'flex',
    flexDirection: { base: 'column', lg: 'row' },
    justifyContent: 'center',
    alignItems: 'center',
    w: '100%',
    ':hover': {
      textDecoration: 'none',
      bg: 'whiteAlpha.200',
    },
  };
  const menuStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    w: { base: '100%' },
    h: 'fit-content',
    py: { base: 5 },
    marginTop: '20px',
  };

  return (
    <Box as='aside' sx={asideStyles}>
      <ChakraLink as={Link} href='/' sx={logoStyles}>
        <Image
          src={imageConfig.blueLogo}
          width={50}
          height={50}
          alt='Xtrata Logo'
          className='md:hidden lg:flex mr-2'
        />
        <p className='hidden md:flex'>Xtrata</p>
      </ChakraLink>
      <HStack as='nav' sx={menuStyles}>
        <ChakraLink as={Link} href='/' sx={navLinkStyles}>
          <Box
            sx={{
              display: 'flex',
              marginRight: { lg: '8px' },
              marginBottom: { base: '4px', lg: '0px' },
              w: '40px',
              fontSize: '0.7rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FaFileExport className='text-lg md:text-2xl text-white' />
            <AiOutlineFile className='text-lg md:text-2xl text-white -ml-1' />
          </Box>
          <p className='text-xs md:text-base'>Extract</p>
        </ChakraLink>
        <ChakraLink as={Link} href='checker' sx={navLinkStyles}>
          <AiOutlineFileSearch className='text-lg md:text-2xl text-white lg:mr-2 w-10 mb-1 lg:mb-0' />
          <p className='text-xs md:text-base'>Check</p>
        </ChakraLink>
        <VStack sx={{ w: '100%' }}>
          <HStack
            as='button'
            sx={navLinkStyles}
            onClick={() => setFilesOpen((prev) => !prev)}
          >
            <LuFileStack className='text-lg md:text-2xl text-white lg:mr-2 w-10 mb-1 lg:mb-0' />
            <p className='text-xs md:text-base'>Files</p>
            {filesOpen ? (
              <BsChevronUp className='text-lg md:text-2xl text-white lg:ml-2 w-10 mb-1 lg:mb-0' />
            ) : (
              <BsChevronDown className='text-lg md:text-2xl text-white lg:ml-2 w-10 mb-1 lg:mb-0' />
            )}
          </HStack>

          {/* Files Inner dropdowm */}
          {filesOpen ? (
            <VStack
              sx={{
                w: '100%',
                bg: 'blue.900',
                h: 'auto',
                py: '5px',
              }}
            >
              <ChakraLink as={Link} href='extracted' sx={navLinkStyles}>
                <LuFileOutput className='text-lg md:text-2xl text-white lg:mr-2 w-10 mb-1 lg:mb-0' />
                <p className='text-[0.5rem] md:text-base'>Extracted</p>
              </ChakraLink>
              <ChakraLink as={Link} href='missing-lines' sx={navLinkStyles}>
                <LuFileCheck className='text-lg md:text-2xl text-white lg:mr-2 w-10 mb-1 lg:mb-0' />
                <p className='text-[0.5rem] md:text-base'>Checked</p>
              </ChakraLink>
            </VStack>
          ) : null}
        </VStack>
      </HStack>
    </Box>
  );
}

export default Header;
