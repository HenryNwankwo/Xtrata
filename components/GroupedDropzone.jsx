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
    <section>
      <MyDropzone
        dropzoneStyles={'xtr-dropzone'}
        setFiles={setPartAFiles}
        setTheRejectedFiles={setPartARejectedFiles}
      />
      <MyDropzone
        dropzoneStyles={'xtr-dropzone'}
        setFiles={setPartBFiles}
        setTheRejectedFiles={setPartBRejectedFiles}
      />
    </section>
  );
}

export default GroupedDropzone;
