import { useEffect, useState } from 'react'

import { Add, Minus } from 'iconsax-react';
import { motion } from 'framer-motion'


import styles from './Accordion.module.scss'

export default function Accordion({item, index}) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [item])
    
  return (
    <>
       <div
            key={index} 
            className={styles.accordion}
        >
            <div 
                className={styles.accordion__class}
                onClick={e => setIsOpen((prev) => !prev)}
                >
                <h3 className='h4'>{item.class}</h3>
                {isOpen ? 
                    <Minus
                    size= {window.innerWidth >= 1040 ? "32" : "20"}
                    color="#000000"
                    />
                   :
                   <Add
                   size= {window.innerWidth >= 1040 ? "32" : "20"}
                   color="#000000"/> 
                }
            </div>
            { isOpen && 
            <motion.div
                layout
                initial={{ 
                    height: '0',
                    y: '-3px'
                }}
                animate={{
                    height: '100%',
                   y: '0%'
                }}
                transition={{
                  layout: { 
                    duration: 0.3,
                    ease: "easeInOut" 
                }
                }}
                // style={{ 
                //     opacity: !isOpen ? "0" : "1",
                //     visibility: !isOpen ? "0" : "1",
                // }}
            >
                <p>
                    {item.desc}
                </p>
            </motion.div> 
            }
        </div>
    </>
  )
}
