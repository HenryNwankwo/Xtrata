import Link from 'next/link';
import {
  FaSquareFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='xtr-footer'>
      <article className='xtr-social-links'>
        <Link href='#'>
          <FaSquareFacebook className='xtr-social-icons' />
        </Link>
        <Link href='#'>
          <FaInstagram className='xtr-social-icons' />
        </Link>
        <Link href='#'>
          <FaTwitter className='xtr-social-icons' />
        </Link>
        <Link href='#'>
          <FaYoutube className='xtr-social-icons' />
        </Link>
      </article>
      <article className='xtr-foot-links'>
        <Link href='#'> Conditions of Use </Link>
        <Link href='#'> Privacy & Policy</Link>
      </article>
      <article className='xtr-copyright'>
        <p>
          <Link href='/' className='hover:underline'>
            Xtrata
          </Link>{' '}
          &copy; {`${currentYear}`}{' '}
        </p>
      </article>
    </footer>
  );
};

export default Footer;
