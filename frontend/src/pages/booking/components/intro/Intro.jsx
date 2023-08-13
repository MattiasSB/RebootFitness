import styles from './Intro.module.scss'
import { Services, Classes, LocationsImg, LocationsText } from '../../../../data/booking'
import Button from '../../../../components/button'
import { useGsapImageAnim } from '../../../../lib/gsap/useGsapImageAnim';
import stylesBooking from '../../Booking.module.scss'

export default function Intro() {
  const imageRef = useGsapImageAnim('#js-image');
  return (
    <div 
      className={`wrapper ${stylesBooking.content}`}
      ref={imageRef}
    >
      {Services.map((item, index) => (
        <section className={styles.services} key={index}>
            <div className={styles.servicesHeading}>
              <h2>{item.heading}</h2>
              <Button text="Learn More" navigateTo={'/classes'} />
            </div>
            <div className={`${styles.image} ${styles.service}}`}>
              <picture>
                  <source 
                    media='(min-width: 380px)' 
                    srcSet={item.src}
                    id='js-image'
                  />
                  <img 
                    src={item.src_m} 
                    alt={item.heading} 
                    id='js-image'
                  />
              </picture>
            </div>
        </section>
      ))} 
      {Classes.map((item, index) => (
        <section className={styles.services} key={index}>
            <div className={styles.classesHeading}>
              <h2>{item.heading}</h2>
            </div>
            <div className={styles.classesDescription}>
              <h3>{item.heading2}</h3>
              <p>{item.description}</p>
              <Button text="Book" navigateTo={'/booking/book'}/>
            </div>
        </section>
      ))}
      {LocationsImg.map((item, index) => (
        <section key={index} className={styles.services}>
          <div className={`${styles.image} ${styles.locationImageFull}`}>
            <picture>
                <source 
                  media='(min-width: 380px)'
                  srcSet={item.src}
                  id='js-image'  
                />
                <img
                 src={item.src_m} 
                 alt={item.heading}
                 id='js-image' 
                />
            </picture>
          </div>
          <div className={styles.splitImageOne}>
              <picture>
                  <source 
                    media='(min-width: 380px)' 
                    srcSet={item.src_2}
                    id='js-image'
                  />
                  <img 
                    src={item.src_m2} 
                    alt={item.heading}
                    id='js-image'
                  />
              </picture>
            </div>
            <div className={styles.splitImageTwo}>
              <picture>
                  <source 
                    media='(min-width: 380px)' 
                    srcSet={item.src_2}
                    id='js-image'
                  />
                  <img 
                    src={item.src_m2} 
                    alt={item.heading} 
                    id='js-image'
                  />
              </picture>
            </div>
        </section>
      ))}
      {LocationsText.map((item, index) => (
        <section key={index} className={`${styles.services} ${styles.locationsText}`}>
          <div className={styles.textSpan}>
            <h2>{item.heading}</h2>
            <p>{item.description}</p>
          </div>
          <div className={styles.textColumn}>
            <div>
              <h4>{item.heading2}</h4>
              {item.description2.map((address, addressIndex) => (
                <p key={addressIndex}>{address}</p>
              ))}
            </div>
            <Button text="BOOK" navigateTo='/booking/book'/>
          </div>
          <div className={styles.textColumn2}>
            <div>
              <h4>{item.heading3}</h4>
              {item.description3.map((address, addressIndex) => (
                <p key={addressIndex}>{address}</p>
              ))}
            </div>
            <Button text='Book' navigateTo='/booking/book'/>
          </div>
        </section>
      ))}
    </div>
  )
}
