import GroupedAllFiles from '@/components/GroupedAllFiles';
import GroupedDropzone from '@/components/GroupedDropzone';

function page() {
  return (
    <section className='w-full h-auto flex flex-col justify-center items-center py-8 md:px-8'>
      <GroupedDropzone></GroupedDropzone>
      <GroupedAllFiles></GroupedAllFiles>
    </section>
  );
}

export default page;
