import React from 'react';
import PropTypes from 'prop-types';
import { HambergerMenu, CloseCircle } from 'iconsax-react';
import styles from '../../header/Header.module.scss';

export default function MenuToggle({ isOpen, toggleMenu }) {
  return isOpen ? (
            <CloseCircle size='32' className={styles.hamburgerMenu} onClick={toggleMenu} />
        ) : (
            <HambergerMenu size='32' className={styles.hamburgerMenu} onClick={toggleMenu} />
        );
}

MenuToggle.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  };