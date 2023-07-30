
import { useState } from 'react'

import styles from './ClassFilter.module.scss'
import useClass from '../../../hooks/useClass'

export default function ClassFilter({filter}) {

    const { classNames } = useClass()
    const [active, setActive] =useState('yoga')

    const handleClick =(item) => {

        filter(item)
        setActive(item)
    }
    
  return (
    <>
    {classNames.map(item => (
        <div 
        key={item}
        className={styles.filter}
        style={{
            background: active === item ? '#000000' : '#ffffff',
            color: active === item ? '#ffffff' : '#000000'
        }}
        onClick={() => handleClick(item)}
        >
            {item}
        </div>
    ))}
    </>
  )
}
