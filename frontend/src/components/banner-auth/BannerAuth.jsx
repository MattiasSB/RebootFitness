
import styles from './BannerAuth.module.scss'
import banner from '../../assets/images/banner.jpg'

export default function BannerAuth() {
  return (
    <div className={styles.banner}>
        <img 
        src={banner} alt="Reboot fitness banner" />
    </div>
  )
}
