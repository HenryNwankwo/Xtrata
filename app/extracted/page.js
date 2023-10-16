'use client';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { LuFileInput } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';
import { imageConfig } from '@/utils/imageConfig';
import { useXtrataContext } from '@/utils/XtrataContext';
import FileCard from '@/components/FileCard';
import FilesGroupContainer from '@/components/FilesGroupContainer';

FilesGroupContainer;
function page() {
  const { extractedFiles, setExtractedFiles } = useXtrataContext();

  const imgArray = ['png', 'jpg', 'gif', 'svg', 'jpeg'];
  // individual file download or saving
  const downloadFile = (theFile, theName) => {
    saveAs(theFile, theName);
  };

  //Downloading all files
  const downloadAllFiles = () => {
    const zip = new JSZip();

    //converting the extracted files data URLs from local storage back to blob
    const blobs = extractedFiles.map((item) => ({
      name: item.name,
      file: item.file,
    }));

    blobs.forEach((extractedFile) => {
      zip.file(extractedFile.name, extractedFile.file);
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'xtr_files.zip');
    });
  };

  return (
    <section className='w-full h-auto flex flex-col justify-center items-center py-8 md:px-8'>
      <p className='w-full py-3 text-center text-2xl'>Extracted Files</p>

      <FilesGroupContainer>
        {extractedFiles?.length > 0 ? (
          <>
            {extractedFiles.map((file, index) => {
              const fileExtension = file.name.toLowerCase().split('.')[1];

              return (
                <FileCard
                  key={index}
                  fileName={file.name}
                  fileCategory={'downloadable'}
                  imageSrc={
                    imgArray.includes(fileExtension)
                      ? file.preview
                      : imageConfig[fileExtension] || imageConfig['default']
                  }
                  onLoadHandler={() => URL.revokeObjectURL(file?.preview)}
                  removeFile={() => removeAccepted(index)}
                  downloadHandler={() => downloadFile(file.file, file.name)}
                />
              );
            })}
            <button
              className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-44 md:rounded-full flex items-center justify-center'
              onClick={downloadAllFiles}
            >
              <BsDownload className='text-lg mr-2' /> Download All
            </button>
          </>
        ) : (
          <p className='text-sm text-center w-full py-2 px-4'>
            No extracted files yet
          </p>
        )}
      </FilesGroupContainer>
    </section>
  );
}

export default page;
