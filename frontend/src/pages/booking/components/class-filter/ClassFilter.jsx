import { useEffect, useState } from 'react';

import styles from './ClassFilter.module.scss';

export default function ClassFilter({ filter, onActiveChange }) {
  const storedValue = localStorage.getItem('RebootClassType');
  const classNames = ['Yoga', 'Pilates', 'Cycle'];
  const [active, setActive] = useState(storedValue || 'Yoga'); // Set the initial state from local storage or 'Yoga'

  useEffect(() => {
    if (storedValue && active !== storedValue) {
      localStorage.setItem('RebootClassType', active);
    }
  }, [active, storedValue]); // Run this effect only when `active` changes

  const handleClick = (item) => {
    filter(item);
    setActive(item);
    onActiveChange(item); // Call the callback to notify the parent container
  };

  return (
    <>
      {classNames.map((item) => (
        <div
          key={item}
          className={styles.filter}
          style={{
            background: active === item ? '#000000' : '#ffffff',
            color: active === item ? '#ffffff' : '#858585',
          }}
          onClick={() => handleClick(item)}
        >
          {item}
        </div>
      ))}
    </>
  );
}
