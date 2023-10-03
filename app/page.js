import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  return (
    <section className='w-full flex justify-center items-center'>
      <ProgressBar progressText={'processing...'} progressValue={4} />
    </section>
  );
}
