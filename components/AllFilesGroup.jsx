import { LuFileInput } from 'react-icons/lu';
import FileCard from './FileCard';
import FilesGroup from './FilesGroup';
import FilesGroupContainer from './FilesGroupContainer';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useXtrataContext } from '@/utils/XtrataContext';

function AllFilesGroup() {
  const fileName = 'Jason.jpg';
  const {
    isAcceptedOpen,
    isRejectedOpen,
    setIsAcceptedOpen,
    setIsRejectedOpen,
  } = useXtrataContext();
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
          <FileCard fileName={fileName} fileCategory={'accepted'} />
          <button className='mt-4 py-2 px-4 text-white w-full bg-green-500 hover:bg-green-400 md:w-40 md:rounded-full flex items-center justify-center'>
            <LuFileInput className='mr-2' /> Extract All
          </button>
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
          <FileCard fileName={fileName} fileCategory={'rejected'} />
          <button className='mt-4 py-2 px-4 text-white w-full bg-red-500 hover:bg-red-400 md:w-40 md:rounded-full flex items-center justify-center'>
            <RiDeleteBin5Line className='mr-2' /> Clear All
          </button>
        </FilesGroupContainer>
      </FilesGroup>
    </>
  );
}

export default AllFilesGroup;
