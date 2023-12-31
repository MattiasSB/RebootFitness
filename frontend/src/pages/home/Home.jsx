
import { Link } from 'react-router-dom'

import { ArrowDown } from 'iconsax-react'

import styles from './Home.module.scss'
import Button from '../../components/button'
import { home } from '../../data/home'
import { useGsapImageAnim } from '../../lib/gsap/useGsapImageAnim'

export default function Home() {
  const imageRef = useGsapImageAnim('#js-image');

  return (
    <main
    ref={imageRef}
    >
      <div className={styles.banner}>
          <div className={styles.heading}>
            <h1>Fitness <br />Redesigned</h1>
            <ul>
              <li>
                train
              </li>
              <li>
                sweat
              </li>
              <li>
                learn
              </li>
            </ul>
            <Button 
              navigateTo='/membership'
              text="join today"
            />
            <div className={styles.scroll}>
                <p>Scroll</p>
                <ArrowDown
                  size="27"
                  color="#ffffff"
                />
            </div>
          </div>
      </div>
       <div className={`${styles.home}`}>
      {home.map((item, index) => (
        <section 
          key={index}
        >
          <div className={`wrapper ${styles.content}`}>
            <div className={styles.heading}>
              <span>{item.subheading}</span>
              <h2>
                {item.heading}
              </h2>
            </div>
            <div className={styles.description}>
              <p>
                {item.desc}
              </p>
              { item.contact && 
              <Link
                to={item.navigateTo}
                className={styles.contact}
              >
                {item.contact}
              </Link>
              }
              <Button 
                navigateTo={item.navigateTo}
                text={item.btnText}
              />
            </div>
          </div>
          <div 
            className={styles.image}

          >
            { 
              item.src && item.src_2 ? (
              <div className={styles.imageContainer}>
                <picture>
                  <source 
                    media='(min-width: 768px)' 
                    srcSet={item.src}
                    id='js-image'
                  />
                  <img 
                    src={item.src_m} 
                    alt={item.heading} 
                    id='js-image'
                  />
                </picture>
                <picture>
                  <source 
                    media='(min-width: 768px)'
                    srcSet={item.src_2}
                    id='js-image'
                  />
                  <img
                    id='js-image' 
                    src={item.src_m_2} 
                    alt={item.heading} 
                  />
                </picture>
              </div>
              ) : (
              <picture>
              <source 
                id='js-image'
                media='(min-width: 768px)' 
                srcSet={item.src}
              />
              <img 
                id='js-image'
                src={item.src_m} 
                alt={item.heading} 
              />
              </picture>
              ) 
            }
            </div>
        </section>
      ))}
      </div>
    </main>
  )
}
