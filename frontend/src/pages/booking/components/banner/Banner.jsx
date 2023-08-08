import styles from './Banner.module.scss'
import Button from '../../../../components/button'


export default function Banner() {
  const bookingButtonStyle= {
    color: 'black',
    background: 'white',
    minHeight: '1em',
  }
  return (
    <section className={styles.banner}>
        <div className={styles.heading}>
          <h1>
          Explore new possibilities and limits
          </h1>
          <Button text='Book' style={bookingButtonStyle} navigateTo='/booking/book'/>

        </div>
     </section>
  )
}
