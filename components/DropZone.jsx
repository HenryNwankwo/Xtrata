import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p>Drag 'n' drop some files here, or click to select files</p>
          <button
            type='button'
            onClick={open}
            className='w-full md:w-fit py-2 px-4 bg-green-400'
          >
            Add files
          </button>
        </>
      )}
    </div>
  );
}
