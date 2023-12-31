import { Link } from 'react-router-dom'

import { SearchNormal1, ArrowRight } from 'iconsax-react'

import styles from './About.module.scss'
import Banner from '../../components/banner'
import { about } from '../../data/about'
import Button from '../../components/button'
import { useGsapImageAnim } from '../../lib/gsap/useGsapImageAnim'

export default function About() {
  const imageRef = useGsapImageAnim('#js-image');

  return (
    <main
      ref={imageRef}
    >
      <Banner
        title='transform your body, transform life'
        text="Our mission is to empower you to make positive changes in your life, both physically and mentally, as you uncover the incredible potential within yourself."
        navigateTo='/membership'
        linkText='Join Now'
      />
      <section className={`${styles.about}`}>
      {about.map((item, index) => (
        <section 
          key={index}
        >
          <div className={`wrapper ${styles.content}`}>
            <div className={styles.heading}>
              <h2>
                {item.heading}
              </h2>
            </div>
            <div className={styles.description}>
              <p>
                {item.desc}
              </p>
              {item.btn && 
                <Button 
                  navigateTo='/membership'
                  text='Join Now'
                />
              }
            </div>
          </div>
          <div className={styles.image}>
            { 
              item.src && item.src_2 ? (
              <div className={styles.imageContainer}>
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
                <picture>
                  <source 
                    id='js-image' 
                    media='(min-width: 768px)' 
                    srcSet={item.src_2}
                  />
                  <img 
                    id='js-image'
                    src={item.src_m_2} 
                    alt={item.heading} 
                  />
                </picture>
              </div>
              ) : item.src ? (
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
              ) : (
                <div className={`wrapper ${styles.findGym}`}>
                  <div className={`${styles.inputField}`}>
                    <SearchNormal1 
                      size= {window.innerWidth >= 1040 ? "25" : "15"}
                      color="#646464"
                    />
                    <input 
                      type="text" 
                      placeholder='Find your home gym'
                    />
                  </div>
                  <ul className={styles.location}>
                    <li>
                      <Link to='/booking'>
                        <p>Burnaby Northgate</p>
                        <ArrowRight 
                          size= {window.innerWidth >= 1040 ? "32" : "20"}
                          color="#000000"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to='/booking'>
                        <p>Downtown Robson</p>
                        <ArrowRight 
                          size= {window.innerWidth >= 1040 ? "32" : "20"}
                          color="#000000"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to='/booking'>
                        <p>Surrey Central</p>
                        <ArrowRight 
                          size= {window.innerWidth >= 1040 ? "32" : "20"}
                          color="#000000"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to='/booking'>
                        <p>Coquitlam Center</p>
                        <ArrowRight 
                          size= {window.innerWidth >= 1040 ? "32" : "20"}
                          color="#000000"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              )
            }
            </div>
        </section>
      ))}
      </section>
    </main>
  )
}
