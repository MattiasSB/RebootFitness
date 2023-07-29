import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../signIn/SignIn.module.scss'
import LayoutAuth from '../../components/layout-auth/LayoutAuth'
import BannerAuth from '../../components/banner-auth/BannerAuth'
import ButtonAuth from '../../components/button-auth'

export default function SignUp() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  })

  const { fname, lname, email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("form submitted")
  }

  return (
  <>
    <section>
      <BannerAuth />
       <LayoutAuth>
          <form 
            onSubmit={onSubmit}
            className={styles.form}
          >
            <input 
              type="fname"
              placeholder="first name*"  
              id="fname"
              value={fname}
              onChange={onChange}
            />
            <input 
              type="lname"
              placeholder="last name*"  
              id="lname"
              value={lname}
              onChange={onChange}
            />
            <input 
              type="email"
              placeholder="email or phone number*"  
              id="email"
              value={email}
              onChange={onChange}
            />
            <input 
              type="password"
              placeholder="password*"  
              id="password"
              value={password}
              onChange={onChange}
            />
            <ButtonAuth />
          </form>
        </LayoutAuth>
    </section>
  </>
  )
}
