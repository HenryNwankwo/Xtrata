'use client';
import ProgressBar from '@/components/ProgressBar';
import MyDropzone from '@/components/DropZone';
import AllFilesGroup from '@/components/AllFilesGroup';
import { useXtrataContext } from '@/utils/XtrataContext';

export default function Home() {
  const { setFiles, setTheRejectedFiles } = useXtrataContext();
  return (
    <section className='w-full h-auto flex flex-col justify-center items-center py-8 md:px-8'>
      <MyDropzone
        dropzoneStyles={'xtr-dropzone'}
        setFiles={setFiles}
        setTheRejectedFiles={setTheRejectedFiles}
      ></MyDropzone>
      <AllFilesGroup></AllFilesGroup>
    </section>
  );
}
