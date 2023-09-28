import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MainBody from '@/components/MainBody';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='xtr-main'>
      <Header></Header>
      <MainBody></MainBody>
      <Footer></Footer>
    </main>
  );
}
