import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Call, ArrowUp2 } from 'iconsax-react';

export default function Footer() {
  return (
    <footer>
      <div className={styles.scrollTopContainer}>
        <ArrowUp2 />
        <p>Scroll to Top</p>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.footerDesktopContainer}>
          <div>
            <div className={styles.logo}>
                <Link to='/'>
                  Reboot
                </Link>
            </div>
            <ul className={styles.verticalLinkList}>
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
          <div className={styles.footerContainer}>
            <div className={styles.footerRight}>
              <div className={styles.emailNewsLetterSignUp}>
                <h3>Stay Connected</h3>
                <input className={styles.stayConnected} placeholder='Email Address' type="text" />
                <button><span>Subscribe</span></button>
              </div>
              <ul className={styles.socialLinks}>
                <li>
                  <Link to='/'>
                    <Facebook />
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <Instagram />
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <Call />
                  </Link>
                </li>
              </ul>
            </div>
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
