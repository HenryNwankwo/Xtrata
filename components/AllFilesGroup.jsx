import { LuFileInput } from 'react-icons/lu';
import FileCard from './FileCard';
import FilesGroup from './FilesGroup';
import FilesGroupContainer from './FilesGroupContainer';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useXtrataContext } from '@/utils/XtrataContext';
import { imageConfig } from '@/utils/imageConfig';

function AllFilesGroup() {
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
    filteredLines,
    setFilteredLines,
    characterLimit,
    setCharacterLimit,
    groupFilteredLines,
    setGroupFilteredLines,
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
  const removeRejecte = (id) => {
    const newRejectedFiles = theRejectedFiles.filter(
      (file, index) => index !== id
    );
    setTheRejectedFiles(newRejectedFiles);
  };

  //extracting a single file
  const fileExtraction = (files, fileIndex) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      const lines = content.split('\n');
      const filteredLines = lines.filter(
        (line) => line.length <= characterLimit
      );
      setFilteredLines(filteredLines);
      console.log('Filterd lines => ', filteredLines.join('\n'));
    };
    reader.readAsText(files[fileIndex]);
  };

  //extracting all files
  const extractAllHandler = async (files) => {
    console.log('EXT FILES; ', files);

    //Handling each file reading
    const handleFile = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target.result;
          const lines = content.split('\n');
          const allFilteredLines = lines.filter(
            (line) => line.length <= characterLimit
          );

          resolve({ filename: file.name, fileContent: allFilteredLines });
        };
        reader.readAsText(file);
      });
    };
    //looping through and reading each file
    for (const file of files) {
      const result = await handleFile(file);
      setGroupFilteredLines((prevFiles) => [...prevFiles, result]);

      console.log('groupFilteredLines => ', groupFilteredLines);
    }
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
                    extractFile={() => fileExtraction(files, index)}
                  />
                );
              })}
              <button
                className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-40 md:rounded-full flex items-center justify-center'
                onClick={() => extractAllHandler(files)}
              >
                <LuFileInput className='mr-2' /> Extract All
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
