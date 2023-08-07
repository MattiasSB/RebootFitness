

import styles from './Classes.module.scss'
import { ClassProvider } from '../../context/ClassContext'
import Class from './components/Class'
import Banner from '../../components/banner'

export default function Classes() {


  return (
    <main>
      <ClassProvider>
        <Banner 
          title='discover the joy of movement'
          text="Explore thrilling group fitness classes for all levels. From heart-pumping cycles to mind-body yoga and dance-inspired fun, there's something for everyone!"
          navigateTo='/'
          linkText='Join Now'
        />
        <section>
          <div className={`wrapper ${styles.classes}`}>
              <div className={styles.chooseAClass}>
                <h2>choose a class you want to explore</h2>
              </div>
              <Class/>
          </div>
        </section>
      </ClassProvider>
    </main>
  )
}
