'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone({ dropzoneStyles }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
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
