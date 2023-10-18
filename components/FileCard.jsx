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
  downloadHandler,
  showDelete = true,
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
          minH: '60px',
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
        <HStack ml='auto'>
          {fileCategory === 'downloadable' ? (
            <button
              className='p-1 md:p-3 rounded-full hover:bg-slate-100 mr-1'
              onClick={downloadHandler}
            >
              <BsDownload className='text-lg md:text-xl' />
            </button>
          ) : null}
          {showDelete && (
            <CloseButton
              size={{ base: 'sm', md: 'md' }}
              sx={{
                p: { base: '10px', md: '20px' },
                ml: 'auto',
                borderRadius: '100%',
                ':hover': {
                  bg: 'gray.100',
                },
              }}
              onClick={removeFile}
            />
          )}
        </HStack>
      </HStack>
    </>
  );
}

export default FileCard;
