'use client';
import { CloseButton, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { BsDownload } from 'react-icons/bs';
import { LuFileInput } from 'react-icons/lu';

function FileCard({
  imageSrc,
  fileName,
  fileCategory,
  onLoadHandler,
  removeFile,
}) {
  return (
    <>
      {/*Start of File Card */}
      <HStack
        as='article'
        sx={{
          w: '100%',
          bg: 'whiteAlpha.800',
          borderRadius: { sm: '10px' },
          h: 'auto',
          px: '15px',
          py: '8px',
        }}
      >
        <Image
          src={imageSrc}
          alt={fileName}
          width={30}
          height={30}
          onLoad={onLoadHandler}
        />
        <Text
          sx={{
            fontSize: 'xs',
            px: '2px',
            mr: '6px',
            w: { sm: 'fit-content' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {fileName}
        </Text>
        {fileCategory === 'accepted' ? (
          <HStack ml='auto'>
            <button className='p-1 md:p-3 rounded-full hover:bg-slate-100'>
              <LuFileInput className='text-lg md:text-2xl' />
            </button>
            <button className='p-1 md:p-3 rounded-full hover:bg-slate-100'>
              <BsDownload className='text-lg md:text-2xl' />
            </button>
          </HStack>
        ) : null}
        <CloseButton
          size={{ base: 'sm', md: 'md' }}
          sx={{
            p: { base: '10px', md: '20px' },
            ml: fileCategory === 'accepted' ? '0px' : 'auto',
            borderRadius: '100%',
            ':hover': {
              bg: 'gray.100',
            },
          }}
          onClick={removeFile}
        />
      </HStack>
    </>
  );
}

export default FileCard;
