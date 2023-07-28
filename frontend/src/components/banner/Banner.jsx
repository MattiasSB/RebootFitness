import { Link } from "react-router-dom"

import styles from './Banner.module.scss'
import {ArrowRight} from 'iconsax-react'

export default function Banner({
    title, 
    text, 
    navigateTo, 
    linkText
}) {
  return (
    <>
        <section className={styles.banner}>
            <div className={styles.heading}>
            <h1>
                {title}
            </h1>
            <p>
                {text}
            </p>
            <Link 
                to={navigateTo}
            >
                {linkText}
                <ArrowRight
                    size="25"
                    color="#ffffff"
                />
            </Link >
            </div>
        </section>
    </>
  )
}
