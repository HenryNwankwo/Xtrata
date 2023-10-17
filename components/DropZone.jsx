'use client';
import { useXtrataContext } from '@/utils/XtrataContext';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone({ dropzoneStyles, setFiles, setTheRejectedFiles }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    // rejected files
    if (rejectedFiles?.length) {
      setTheRejectedFiles((prevFiles) => [
        ...prevFiles,
        ...rejectedFiles.map(({ file, errors }) => ({
          file: Object.assign(file, { preview: URL.createObjectURL(file) }),
          errors: errors,
        })),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'text/*': [],
    },
  });

  return (
    <div {...getRootProps({ className: dropzoneStyles })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='text-sm text-center'>Drop the files here ...</p>
      ) : (
        <>
          <p className='text-sm text-center'>
            Drag 'n' drop some files here, or click to select files
          </p>
          <button
            type='button'
            onClick={open}
            className='w-5/6 md:w-fit py-2 px-4 mt-3 rounded-3xl bg-green-500 hover:bg-green-400 text-white'
          >
            Select files
          </button>
        </>
      )}
    </div>
  );
}

export default MyDropzone;
