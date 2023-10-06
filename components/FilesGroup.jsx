'use client';
import { useXtrataContext } from '@/utils/XtrataContext';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { BsChevronDown, BsChevronUp, BsDownload } from 'react-icons/bs';
import { LuFileInput } from 'react-icons/lu';
import FilesGroupContainer from './FilesGroupContainer';
import FileCard from './FileCard';

function FilesGroup({ bgColor, titleColor, textColor }) {
  const fileGroupName = 'Accepted Files';
  const { isOpen, setIsOpen } = useXtrataContext();
  const fileName = 'Jason.jpg';

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
        <Box
          as='button'
          sx={toggleBtnStyles}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <BsChevronUp className='text-2xl'></BsChevronUp>
          ) : (
            <BsChevronDown className='text-2xl'></BsChevronDown>
          )}
        </Box>
      </Box>
      {isOpen ? (
        <FilesGroupContainer>
          <FileCard fileName={fileName} />
          <button className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-40 md:rounded-full flex items-center justify-center'>
            <LuFileInput className='mr-2' /> Extract All
          </button>
        </FilesGroupContainer>
      ) : null}
    </VStack>
  );
}

export default FilesGroup;
