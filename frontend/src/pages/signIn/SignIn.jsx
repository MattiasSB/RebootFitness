import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

import styles from '../signIn/SignIn.module.scss'
import LayoutAuth from '../../components/layout-auth/LayoutAuth'
import BannerAuth from '../../components/banner-auth/BannerAuth'
import ButtonAuth from '../../components/button-auth'

export default function SignUp() {

  const navigate = useNavigate()
  const [signInError, setSignInError] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {

      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
      if(userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      setSignInError(true)

      setTimeout(() => {
        setSignInError(false)
      }, 5000)
    }


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
              type="email"
              placeholder="email or phone number*"  
              id="email"
              value={email}
              onChange={onChange}
              style={{
                borderBottom: `1.2px solid ${signInError ? '#f14343' : '#000000'}`
              }}
            />
            <input 
              type="password"
              placeholder="password*"  
              id="password"
              value={password}
              onChange={onChange}
              style={{
                borderBottom: `1.2px solid ${signInError ? '#f14343' : '#000000'}`
              }}
            />
           
            <div className={styles.error}> 
              <div 
                className={styles.wrongPassword}
                style={{
                  opacity: signInError ? 1 : 0
                }}  
              >
                <div>!</div>
                <p>Wrong Email or Password. Try again.</p>
              </div>
              <Link
                to="/"
                className={styles.forgotPassword}
              >
                Forgot password?
              </Link>
            </div>

            <ButtonAuth />
          </form>
        </LayoutAuth>
    </section>
  </>
  )
}
