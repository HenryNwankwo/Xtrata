import './globals.css';
import { Inter } from 'next/font/google';
import { ChakraProviders } from '@/utils/ChakraProviders';
import { poppins } from '@/utils/fonts';
import { XtrataProvider } from '@/utils/XtrataContext';
import Aside from '@/components/Aside';
import MainBody from '@/components/MainBody';
import ProgressGroup from '@/components/ProgressGroup';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Xtrata',
  description: 'For searching and extraction of some lines in a file',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${
          poppins.className || inter.className
        } bg-[url("/assets/img/bg2.jpg")] bg-cover bg-center bg-opacity-70`}
      >
        <main className='xtr-main'>
          <XtrataProvider>
            <ChakraProviders>
              <ProgressGroup />
              <Aside />
              <MainBody>{children}</MainBody>
            </ChakraProviders>
          </XtrataProvider>
        </main>
      </body>
    </html>
  );
}
