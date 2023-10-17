'use client';
import { useXtrataContext } from '@/utils/XtrataContext';
import MyDropzone from './DropZone';

function GroupedDropzone() {
  const {
    setPartAFiles,
    setPartARejectedFiles,
    setPartBFiles,
    setPartBRejectedFiles,
  } = useXtrataContext();
  return (
    <section className='w-full h-auto flex flex-col md:flex-row items-center justify-between'>
      <article className='md:w-6/12'>
        <h3 className='w-full md:w-1/2 md:ml-auto -mb-0.5 md:rounded-tl-full py-2 px-4 text-center text-white bg-orange-600'>
          Files to be checked
        </h3>
        <MyDropzone
          dropzoneStyles={'xtr-dropzone '}
          setFiles={setPartAFiles}
          setTheRejectedFiles={setPartARejectedFiles}
        />
      </article>
      <article className='md:w-6/12 mt-4 md:mt-0'>
        <h3 className='w-full md:w-1/2 -mb-0.5 md:rounded-tr-full py-2 px-4 text-center text-white bg-blue-950 '>
          Files for searching
        </h3>
        <MyDropzone
          dropzoneStyles={'xtr-dropzone'}
          setFiles={setPartBFiles}
          setTheRejectedFiles={setPartBRejectedFiles}
        />
      </article>
    </section>
  );
}

export default GroupedDropzone;
