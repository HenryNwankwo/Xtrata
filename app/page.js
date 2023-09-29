import Footer from '@/components/Footer';
import Aside from '@/components/Aside';
import MainBody from '@/components/MainBody';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='xtr-main'>
      <Aside></Aside>
      <MainBody></MainBody>
      <Footer></Footer>
    </main>
  );
}
