import { useState } from 'react'

import styles from './Class.module.scss';
import useClass from '../../../hooks/useClass';
import ClassFilter from './ClassFilter';
import Accordion from './Accordion';

export default function Class() {

    const { classes } = useClass()

    const [isClicked, setIsClicked] = useState('yoga')
 
    const data = classes.find((item) => item.name === isClicked)

    const {
        name,
        src,
        type
    } = data

  return (
    <>
        <div className={styles.classFilter}>
            <ClassFilter 
                filter={(isClicked) => setIsClicked(isClicked)}
            />
        </div>
        <div className={styles.classList}>
            <h2>{name}</h2>
            <img src={src} alt={`${name} image`} />
            <div className={styles.classItems}>
            {type.map((item, index) => (
               <Accordion 
                    key={index}
                    item={item} 
                />
            ))}
            </div>
        </div>
    </>
  )
}
