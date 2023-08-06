
import styles from './Membership.module.scss'
import Banner from '../../components/banner'
import { membershipPlan, services } from '../../data/membership'
import Button from '../../components/button/Button'

export default function Membership() {

  return (
    <main>
      <Banner 
        title='COMMIT TO YOUR GOALS AND START TODAY'
        text='Experience quality training and state of the art equipment for better performance and build strong habits that produce results'
        navigateTo='/'
        linkText='Join Now'
      />
      <section className={styles.membership}>
        <div className={`wrapper ${styles.membership__plan}`}>
          <div className={styles.heading}>
            <span>membership</span>
            <h2>select a plan</h2>
          </div>
          <ul className={styles.planList}>
          {membershipPlan.map((item, index) => 
            <li key={index} className={styles.planListItems}>
              <div className={styles.content}>
                <div className={styles.planType}>
                  <h3>{item.name}</h3>
                  <div className={styles.planPrice}>
                    <h4>{item.price}</h4>
                    <p>bi-weekly</p>
                  </div>
                </div>
                <ul>
                  {item.benefits.map((list, listIndex) => (
                    <li key={listIndex}>{list}</li>
                  ))}
                </ul>
              </div>
              <Button text='select'/>
            </li>
          )}
          </ul>
        </div>
      </section>
      <section className={styles.benefits}>
        <div className={`wrapper ${styles.benefits__list}`}>
          <div className={styles.heading}>
            <h2>benefits</h2>
          </div>
            {services.map((item, index) => (
              <div 
                key={index}
                className={`${styles[`service_${index}`]}`}
              >
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
              </div>
            ))}
          <p>
          Unleash the best version of yourself! Join our gym community today and embark on a transformative fitness journey like no other. From building strength to improving endurance and overall well-being, our gym offers a wealth of benefits to explore
          </p>
        </div>
      </section>
      <section className={styles.offers}>
        <div className={`wrapper ${styles.offers__list}`}>
          <div className={styles.heading}>
            <h2>when you join</h2>
          </div>
          <div className={styles.content}>
            <ul>
              <li>
                get 25% off your first month
              </li>
              <li>
                enjoy free first-time trial classes with you plan
              </li>
              <li>
                gain access to multiple top class amenities and facilities
              </li>
              <li>
                train with experts 
              </li>
            </ul>
            <p>
              With flexible membership plans and a variety of invigorating classes, we cater to every fitness level and preference.
            </p>
          </div>
          <div className={styles.dumbbell_img}>
            <img 
              src="https://s3-alpha-sig.figma.com/img/bb80/1401/27421740c2907c3187d8419cac914b3d?Expires=1691366400&Signature=KU4H11JpcKW9q5ivTR2hsgBv~bmfRd0hBGSyBOCRFu6uJuFxO1V-vO6Mwc4-HEwlTWumI7gVvVyHT2S1dhAnoUnlxOP5W2-sfk9QgWqKzk7Iyx9cIbR-3~WblBD-LXv7LwvjLplgi1031lwYz3LaXrjMap24AdqLiiiveZjhhM6hbWrI7oA3o2-UtW4~2UsDY79mXVZ-eNOwCXZVJXmdBkh9LWsupO5GK2ENaIFDF9uTK5QH6urJ4De2rcCV0PVXpY-Z3T7RfZUh2zo0g~n7M6yMuovQQDM8kGTGkeokNDlnKj2kzalGx8GYLQ27TyHwBBQ4jxrN6vYB~44K3katSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" 
              alt="person holding black and silver dumbbell" 
            />
          </div>
          <div className={styles.exercise_img}>
              <img 
                src="https://s3-alpha-sig.figma.com/img/2dde/798b/d12137b836ec5f929eb16b3ae41ffdcc?Expires=1691366400&Signature=iFIp3kSr6ShE-dWg2HCoD4WqirYq7qPpLCUIUFfVzU~1dkm1KCnZWsWvSUTKC-FGfeiJWDAewGZwXi36-ULrSSfNKxEtfvWyGnFR~~dkZVg~ROoL3gQAWhM2loOXHRlSg~N3KRJVT5XxQ55bRb1Ya8IZylYbElbyG3uZfW9ETQUOTHCpzgsUHo~bv6AEyE6t1JIBDtmxTREO81AOoSOU-LxTeqDVa-T5e8k7Qc4BvzdpQsHttG-D2bDSl~CtOdWQ9eSrYnm~MvUGTAjEoIID8AjGyDME~BKQXR4AaDYrkykKCnNxcA-kh-omqMJBeTdPvUY1dwDM19HvKH3PGZCNJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" 
                alt="man exercising" 
              />
          </div>
          <div className={styles.joinReboot}>
            <p>
            Join Reboot and let's redefine fitness
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
