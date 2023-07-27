import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Call } from 'iconsax-react';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className={styles.footer}>
          <div>
            <ul className={styles.verticalLinkList}>
              <li className={styles.logo}>
                <Link to='/'>
                  Reboot
                </Link>
              </li>
              <li>
                <Link to='/about' >
                  About
                </Link>
              </li>
              <li>
                <Link to='/booking' >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to='/booking' >
                  Book a Class
                </Link>
              </li>
              <li>
                <Link to='/booking'>
                  Find a gym
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerRight}>
            <h3>Stay Connected</h3>
            <input className={styles.stayConnected} placeholder='Email Address' type="text" />
            <button>Subscribe</button>
            <ul className={styles.socialLinks}>
              <li>
                <Link to='/'>
                  <Facebook size='32' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <Instagram size='32' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <Call size='32' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <ul className={styles.horizontalLinkList}>
              <li>
                <Link to='/'>
                  Terms and Conditions | 
                </Link>
              </li>
              <li>
                <Link to='/'>
                  Privacy Policy | 
                </Link>
              </li>
              <li>
                <Link to='/'>
                  Sitemap
                </Link>
              </li>
            </ul>
        </div>
    </footer>
  )
}
