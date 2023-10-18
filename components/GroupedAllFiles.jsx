'use client';
import { AiOutlineFileSearch } from 'react-icons/ai';
import FileCard from './FileCard';
import FilesGroup from './FilesGroup';
import FilesGroupContainer from './FilesGroupContainer';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useXtrataContext } from '@/utils/XtrataContext';
import { imageConfig } from '@/utils/imageConfig';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

function GroupedAllFiles() {
  const router = useRouter();
  const uniqueId = uuidv4();
  const imgArray = ['png', 'jpg', 'gif', 'svg', 'jpeg'];
  const {
    partAFiles,
    setPartAFiles,
    partARejectedFiles,
    setPartARejectedFiles,
    partBFiles,
    setPartBFiles,
    partBRejectedFiles,
    setPartBRejectedFiles,
    allAcceptedOpen,
    setAllAcceptedOpen,
    allFiles,
    setAllFiles,
    allRejectedOpen,
    setAllRejectedOpen,
  } = useXtrataContext();

  //For removal of a file
  const removeFile = (fileIndex, fileArray, setFileArray) => {
    const newFileArray = fileArray.filter((file, index) => index !== fileIndex);
    setFileArray(newFileArray);
  };

  return (
    <>
      {/* Accepted files section */}
      <FilesGroup
        fileGroupName={'All Accepted Files'}
        bgColor={'green.300'}
        isOpen={allAcceptedOpen}
        toggleOpen={() => setAllAcceptedOpen((prev) => !prev)}
      >
        <FilesGroupContainer>
          {[...partAFiles, ...partBFiles].length > 0 ? (
            <>
              <div className='w-full h-auto flex flex-col md:flex-row justify-between items-center'>
                <article className='xtr-grouped-check-files'>
                  <h3 className='w-full -mb-0.5 rounded-t-full py-2 px-4 text-center text-white bg-orange-600'>
                    Files to be checked
                  </h3>
                  {partAFiles.map((file, index) => {
                    const fileExtension = file.name.toLowerCase().split('.')[1];

                    return (
                      <FileCard
                        key={index}
                        fileName={file.name}
                        fileCategory={'accepted'}
                        imageSrc={
                          imgArray.includes(fileExtension)
                            ? file.preview
                            : imageConfig[fileExtension] ||
                              imageConfig['default']
                        }
                        onLoadHandler={() => URL.revokeObjectURL(file?.preview)}
                        removeFile={() =>
                          removeFile(index, partAFiles, setPartAFiles)
                        }
                        downloadHandler={() =>
                          downloadFile(file.file, file.name)
                        }
                      />
                    );
                  })}
                </article>
                <article className='xtr-grouped-check-files mt-3 md:mt-0'>
                  <h3 className='w-full -mb-0.5 rounded-t-full py-2 px-4 text-center text-white bg-blue-950 '>
                    Files for searching
                  </h3>
                  {partBFiles.map((file, index) => {
                    const fileExtension = file.name.toLowerCase().split('.')[1];

                    return (
                      <FileCard
                        key={index}
                        fileName={file.name}
                        fileCategory={'accepted'}
                        imageSrc={
                          imgArray.includes(fileExtension)
                            ? file.preview
                            : imageConfig[fileExtension] ||
                              imageConfig['default']
                        }
                        onLoadHandler={() => URL.revokeObjectURL(file?.preview)}
                        removeFile={() =>
                          removeFile(index, partBFiles, setPartBFiles)
                        }
                        downloadHandler={() =>
                          downloadFile(file.file, file.name)
                        }
                      />
                    );
                  })}
                </article>
              </div>
              <button
                className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-52 md:rounded-full flex items-center justify-center'
                onClick={''}
              >
                <AiOutlineFileSearch className='mr-2' /> Search and check
              </button>
            </>
          ) : (
            <p className='text-sm text-center w-full py-2 px-4'>
              No files yet!
            </p>
          )}
        </FilesGroupContainer>
      </FilesGroup>

      {/* Rejected files section */}
      <FilesGroup
        fileGroupName={'All Rejected Files'}
        bgColor={'red.400'}
        textColor={'white'}
        titleColor={'white'}
        isOpen={allRejectedOpen}
        toggleOpen={() => setAllRejectedOpen((prev) => !prev)}
      >
        <FilesGroupContainer>
          {[...partARejectedFiles, ...partBRejectedFiles].length > 0 ? (
            <>
              {[...partARejectedFiles, ...partBRejectedFiles].map(
                ({ file, errors }, index) => {
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
                      showDelete={false}
                    />
                  );
                }
              )}
              <button
                className='mt-4 py-2 px-4 text-white w-full bg-red-500 hover:bg-red-400 md:w-40 md:rounded-full flex items-center justify-center'
                onClick={() => {
                  setPartARejectedFiles([]);
                  setPartBRejectedFiles([]);
                }}
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

export default GroupedAllFiles;
