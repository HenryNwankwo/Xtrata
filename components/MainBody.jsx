'use client';
import { HStack } from '@chakra-ui/react';
import Footer from './Footer';

function MainBody({ children }) {
  return (
    <HStack
      as='main'
      sx={{
        w: '100%',
        h: '100%',
        pl: { base: '50px', md: '90px', lg: '220px' },
        bg: 'whiteAlpha.800',
        backdropBlur: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
      }}
    >
      {children}
      <Footer></Footer>
    </HStack>
  );
}

export default MainBody;
