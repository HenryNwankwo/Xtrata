'use client';
import { CloseButton, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { BsDownload } from 'react-icons/bs';
import { LuFileInput } from 'react-icons/lu';

function FileCard({ fileName }) {
  return (
    <>
      {/*Start of File Card */}
      <HStack
        as='article'
        sx={{
          w: '100%',
          bg: 'whiteAlpha.800',
          borderRadius: '10px',
          h: 'auto',
          px: '15px',
          py: '8px',
        }}
      >
        <Image src='' alt='' width={30} height={30} />
        <Text fontSize={'xs'} px='2'>
          {fileName}
        </Text>
        <HStack ml='auto'>
          <button className='p-1 md:p-3 rounded-full hover:bg-slate-100'>
            <LuFileInput />
          </button>
          <button className='p-1 md:p-3 rounded-full hover:bg-slate-100'>
            <BsDownload />
          </button>
        </HStack>
        <CloseButton
          size={'md'}
          sx={{
            p: { base: '10px', md: '20px' },
            ml: '0px',
            borderRadius: '100%',
            ':hover': {
              bg: 'gray.100',
            },
          }}
        />
      </HStack>
    </>
  );
}

export default FileCard;
