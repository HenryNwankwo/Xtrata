'use client';
import { useXtrataContext } from '@/utils/XtrataContext';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { BsChevronDown, BsChevronUp, BsDownload } from 'react-icons/bs';

function FilesGroup(props) {
  const {
    children,
    bgColor,
    titleColor,
    textColor,
    isOpen,
    fileGroupName,
    toggleOpen,
  } = props;
  //Styings
  const filesGroupStyles = {
    w: { base: '100%', md: '83.33%' },
    h: 'auto',
    mx: 'auto',
  };
  const groupHeaderStyles = {
    w: '100%',
    h: 10,
    px: '20px',
    py: '5px',
    mt: '20px',
    mx: 'auto',
    borderRadius: { md: '20px' },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bg: bgColor || 'whiteAlpha.700',
    backdropBlur: '12px',
    boxShadow: '2xl',
    color: textColor || 'blackAlpha.800',
  };
  const toggleBtnStyles = {
    w: 'fit-content',
    h: 'fit-content',
    borderRadius: '100%',
    p: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      bg: 'whiteAlpha.600',
    },
  };

  return (
    <VStack as={'section'} sx={filesGroupStyles}>
      <Box as='header' sx={groupHeaderStyles}>
        <Heading as='h6' size='sm' color={titleColor || 'blackAlpha.800'}>
          {fileGroupName}
        </Heading>
        <Box as='button' sx={toggleBtnStyles} onClick={toggleOpen}>
          {isOpen ? (
            <BsChevronUp className='text-2xl'></BsChevronUp>
          ) : (
            <BsChevronDown className='text-2xl'></BsChevronDown>
          )}
        </Box>
      </Box>
      {isOpen ? children : null}
    </VStack>
  );
}

export default FilesGroup;
