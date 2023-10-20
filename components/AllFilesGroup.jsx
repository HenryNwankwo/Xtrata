import { LuFileInput } from 'react-icons/lu';
import FileCard from './FileCard';
import FilesGroup from './FilesGroup';
import FilesGroupContainer from './FilesGroupContainer';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useXtrataContext } from '@/utils/XtrataContext';
import { imageConfig } from '@/utils/imageConfig';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import useLocalStorage from '@/utils/useLocalStorage';
import Spinner from './Spinner';

function AllFilesGroup() {
  const router = useRouter();
  const uniqueId = uuidv4();
  const imgArray = ['png', 'jpg', 'gif', 'svg', 'jpeg'];
  const {
    isAcceptedOpen,
    isRejectedOpen,
    setIsAcceptedOpen,
    setIsRejectedOpen,
    files,
    theRejectedFiles,
    setTheRejectedFiles,
    setFiles,
    characterLimit,
    extractedFiles,
    setExtractedFiles,
    setProgress,
    extracting,
    setExtracting,
    searching,
    setSearching,
  } = useXtrataContext();

  //Removing accepted files
  const removeAccepted = (id) => {
    const newFiles = files.filter((file, index) => index !== id);
    setFiles(newFiles);
  };

  //removing rejected files
  const removeRejected = (id) => {
    const newRejectedFiles = [...theRejectedFiles]; // Create a copy of the array
    newRejectedFiles.splice(id, 1); // Remove the item at the specified index
    setTheRejectedFiles(newRejectedFiles);
  };

  //A function that extract lines from a file
  const extractLines = (file, limit = 160) => {
    const lines = file.split('\n');
    const extractedLines = lines.filter((line) => line.length <= limit);
    return extractedLines.join('\n');
  };

  // individual file download or saving
  const downloadFile = (file, name) => {
    saveAs(file, name);
  };

  //Reading and extracting each files
  const extractAllHandler = (files, limit) => {
    setExtracting((prev) => (prev === false ? true : prev));
    const filesPromises = files.map((file) => {
      const theFileName = file.name.split('.')[0];
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setProgress(percent);
          }
        };
        reader.onload = () => {
          const extractedContent = extractLines(reader.result, limit);
          const extractedFile = new Blob([extractedContent], {
            type: 'text/plain',
          });
          const fileName = `${theFileName}_xtr${uniqueId}.txt`;
          resolve({
            file: extractedFile,
            name: fileName,
          });
        };

        reader.readAsText(file);
      });
    });

    Promise.all(filesPromises)
      .then((extractedData) => {
        setExtractedFiles(extractedData);
        setProgress(100);
        router.push('/extracted');
        setProgress(0);
        setExtracting((prev) => (prev === true ? false : prev));
      })
      .catch((err) => {
        console.log('Error extracting files: ', err);
        setProgress(0);
        setExtracting((prev) => (prev === true ? false : prev));
      });
  };

  return (
    <>
      {/* Accepted files section */}
      <FilesGroup
        fileGroupName={'Accepted Files'}
        bgColor={'green.300'}
        isOpen={isAcceptedOpen}
        toggleOpen={() => setIsAcceptedOpen((prev) => !prev)}
      >
        <FilesGroupContainer>
          {files.length > 0
            ? setIsAcceptedOpen((prev) => (prev === false ? true : prev))
            : null}
          {files.length > 0 ? (
            <>
              {files.map((file, index) => {
                const fileExtension = file.name.toLowerCase().split('.')[1];

                return (
                  <FileCard
                    key={index}
                    fileName={file.name}
                    fileCategory={'accepted'}
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
                className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-40 md:rounded-full flex items-center justify-center'
                onClick={() => extractAllHandler(files, characterLimit)}
                disabled={extracting}
              >
                {extracting ? (
                  <Spinner
                    colorValue={'white'}
                    loadingValue={extracting}
                    sizeValue={20}
                  />
                ) : (
                  <>
                    <LuFileInput className='mr-2' /> Extract All
                  </>
                )}
              </button>
            </>
          ) : (
            <p className='text-sm text-center w-full py-2 px-4'>
              No files for extraction yet!
            </p>
          )}
        </FilesGroupContainer>
      </FilesGroup>

      {/* Rejected files section */}
      <FilesGroup
        fileGroupName={'Rejected Files'}
        bgColor={'red.400'}
        textColor={'white'}
        titleColor={'white'}
        isOpen={isRejectedOpen}
        toggleOpen={() => setIsRejectedOpen((prev) => !prev)}
      >
        <FilesGroupContainer>
          {theRejectedFiles.length > 0
            ? setIsRejectedOpen((prev) => (prev === false ? true : prev))
            : null}
          {theRejectedFiles.length > 0 ? (
            <>
              {theRejectedFiles.map(({ file, errors }, index) => {
                const fileExtension = file.name.toLowerCase().split('.')[1];
                return (
                  <FileCard
                    key={index}
                    fileName={file.name}
                    imageSrc={
                      imgArray.includes(fileExtension)
                        ? file.preview
                        : imageConfig[fileExtension] || imageConfig['default']
                    }
                    onLoadHandler={() => URL.revokeObjectURL(file?.preview)}
                    fileCategory={'rejected'}
                    removeFile={() => removeRejected(index)}
                  />
                );
              })}
              <button
                className='mt-4 py-2 px-4 text-white w-full bg-red-500 hover:bg-red-400 md:w-40 md:rounded-full flex items-center justify-center'
                onClick={() => setTheRejectedFiles([])}
              >
                <RiDeleteBin5Line className='mr-2' />
                Clear All
              </button>
            </>
          ) : (
            <p className='text-sm text-center w-full py-2 px-4'>
              No Rejected files yet!
            </p>
          )}
        </FilesGroupContainer>
      </FilesGroup>
    </>
  );
}

export default AllFilesGroup;
