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
import Spinner from '@/components/Spinner';

function page() {
    const [downloading, setDownloading] = useState(false);
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const {
    searchedData,
    setSearchedData,
    setProgress,
  } = useXtrataContext();

  const imgArray = ['png', 'jpg', 'gif', 'svg', 'jpeg'];
  // individual file download or saving
  const downloadFile = (theFile, theName) => {
    saveAs(theFile, theName);
  };

  //Downloading all files
  const downloadAllFiles = () => {
    const zip = new JSZip();
    setDownloading((prev) => (prev === false ? true : prev));

    //converting the extracted files data URLs from local storage back to blob
    const blobs = searchedData.map((item) => ({
      name: item.name,
      file: item.file,
    }));

    blobs.forEach((searchedFile) => {
      zip.file(searchedFile.name, searchedFile.file);
    });

    zip
      .generateAsync({ type: 'blob' }, ({ percent }) => setProgress(percent))
      .then((content) => {
        setProgress(0);
        setDownloading((prev) => (prev === true ? false : prev));
        saveAs(content, `xtr-searched-files-${hours}_${minutes}_${seconds}.zip`);
      });
  };

  //Removing an extracted file
  const removeSearchedFile = (id) => {
    const newSearchedData = searchedData.filter(
      (file, index) => id !== index
    );
    setSearchedData(newSearchedData);
  };
  return (
    <section className='w-full h-auto flex flex-col justify-center items-center py-8 md:px-8'>
      <p className='w-full py-3 text-center text-2xl'>Missing Lines in Files</p>

      <FilesGroupContainer>
        {searchedData?.length > 0 ? (
          <>
            {searchedData.map((file, index) => {
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
                  removeFile={() => removeSearchedFile(index)}
                  downloadHandler={() => downloadFile(file.file, file.name)}
                />
              );
            })}
            {searchedData?.length > 1 ? (
              <button
                className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-44 md:rounded-full flex items-center justify-center'
                onClick={downloadAllFiles}
                disabled={downloading}
              >
                {downloading ? (
                  <Spinner
                    colorValue={'white'}
                    loadingValue={downloading}
                    sizeValue={20}
                  />
                ) : (
                  <>
                    <BsDownload className='text-lg mr-2' /> Download All
                  </>
                )}
              </button>
            ) : null}
          </>
        ) : (
          <p className='text-sm text-center w-full py-2 px-4'>
            No files yet
          </p>
        )}
      </FilesGroupContainer>
    </section>
  );
}

export default page;
