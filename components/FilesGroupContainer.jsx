'use client';
import { VStack } from '@chakra-ui/react';

function FilesGroupContainer({ children }) {
  const filesGroupContainerStyles = {
    w: '100%',
    h: 'auto',
    maxHeight: 'fit-content',
    px: '15px',
    py: '25px',
    bg: 'whiteAlpha.700',
    backdropBlur: '12px',
    borderRadius: '20px',
  };
  return (
    <VStack as={'aside'} sx={filesGroupContainerStyles}>
      {children}
    </VStack>
  );
}

export default FilesGroupContainer;
