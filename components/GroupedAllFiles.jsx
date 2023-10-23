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
import Spinner from './Spinner';

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
    setSearchedData,
    allRejectedOpen,
    setAllRejectedOpen,
    setProgress,
    searching,
    setSearching,
  } = useXtrataContext();

  //For removal of a file
  const removeFile = (fileIndex, fileArray, setFileArray) => {
    const newFileArray = fileArray.filter((file, index) => index !== fileIndex);
    setFileArray(newFileArray);
  };

  //Extracting parts of each line in a file and checking if its found in the overall files
  const extractedParts = (file, overallFiles) => {
    const lines = file.split('\n');
    const extractedLines = [];

    for (const line of lines) {
      const firstPart = line.slice(0, 16);
      const secondPart = line.slice(46, 58);
      let thirdPart = line.slice(135, 138);

      //Keeping track of the portions found in the overall files
      let matchFound = false;

      if (thirdPart.charAt(thirdPart.length - 1) === ')') {
        thirdPart = thirdPart.slice(0, -1);
      } else {
        thirdPart = line.slice(135, 138);
      }

      //Looping through the overall transaction files
      for (const eachfile of overallFiles) {
        const reader = new FileReader();

        reader.onload = (evt) => {
          const overallFilesContent = evt.target.result;
          const overallFilesLines = overallFilesContent.split('\n');
          for (const eachLine of overallFilesLines) {
            if (
              eachLine.includes(firstPart) &&
              eachLine.includes(secondPart) &&
              eachLine.includes(thirdPart)
            ) {
              matchFound = true;
              break;
            }
          }
        };
        reader.readAsText(eachfile);
        if (matchFound) {
          break;
        }
      }
      //If the portions are not found in any of the overall files, push them to an array
      if (!matchFound) {
        extractedLines.push(line);
      }
    }

    return extractedLines.join('\n');
  };

  //Searching the extracted files in the overall transaction files
  const searchAndCheck = (responseFiles, overallFiles) => {
    setSearching((prev) => (prev === false ? true : prev));
    const filePromises = responseFiles.map((file) => {
      const theFileName = file.name.split('.')[0];
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onprogress = (evt) => {
          if (evt.lengthComputable) {
            const percent = (evt.loaded / evt.total) * 100;
            setProgress(percent);
          }
        };
        reader.onload = () => {
          const extractedContent = extractedParts(reader.result, overallFiles);
          const extractedFile = new Blob([extractedContent], {
            type: 'text/plain',
          });
          const fileName = `${theFileName}_LinesNotFound`;
          resolve({ file: extractedFile, name: fileName });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(filePromises)
      .then((data) => {
        setSearchedData(data);        
        setProgress(100);
        router.push('/missing-lines')
        setSearching((prev) => (prev === true ? false : prev));
        setProgress(0);
      })
      .catch((err) => {
        console.log('Error extracting and searching data: ', err);
        setProgress(0);
        setSearching((prev) => (prev === true ? false : prev));
      });
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
          {[...partAFiles, ...partBFiles].length > 0
            ? setAllAcceptedOpen((prev) => (prev === false ? true : prev))
            : null}
          {[...partAFiles, ...partBFiles].length > 0 ? (
            <>
              <div className='w-full h-auto flex flex-col md:flex-row justify-between items-center'>
                <article className='xtr-grouped-check-files'>
                  {partAFiles.length > 0 ? (
                    <h3 className='w-full -mb-0.5 rounded-t-full py-2 px-4 text-center text-white bg-orange-600'>
                      Files to be checked
                    </h3>
                  ) : null}
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
                  {partBFiles.length > 0 ? (
                    <h3 className='w-full -mb-0.5 rounded-t-full py-2 px-4 text-center text-white bg-blue-950 '>
                      Files for searching
                    </h3>
                  ) : null}
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
                onClick={() => searchAndCheck(partAFiles, partBFiles)}
                disabled={searching}
              >
                {searching ? (
                  <Spinner
                    colorValue={'white'}
                    loadingValue={searching}
                    sizeValue={20}
                  />
                ) : (
                  <>
                    <AiOutlineFileSearch className='mr-2' /> Search and check
                  </>
                )}
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
          {[...partARejectedFiles, ...partBRejectedFiles].length > 0
            ? setAllRejectedOpen((prev) => (prev === false ? true : prev))
            : null}
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
