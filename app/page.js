'use client';
import ProgressBar from '@/components/ProgressBar';
import MyDropzone from '@/components/DropZone';
import AllFilesGroup from '@/components/AllFilesGroup';

export default function Home() {
  return (
    <section className='w-full h-auto flex flex-col justify-center items-center py-8 md:px-8'>
      <MyDropzone dropzoneStyles={'xtr-dropzone'}></MyDropzone>
      <AllFilesGroup></AllFilesGroup>
    </section>
  );
}
