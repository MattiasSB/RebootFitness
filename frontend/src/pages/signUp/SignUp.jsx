import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { db } from '../../firebase.config'

import styles from '../signIn/SignIn.module.scss'
import LayoutAuth from '../../components/layout-auth/LayoutAuth'
import BannerAuth from '../../components/banner-auth/BannerAuth'
import ButtonAuth from '../../components/button-auth'

export default function SignUp() {
  const navigate = useNavigate()
  const [signUpError, setSignUpError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onChange = (e) => {

      if (e.target.id === 'password') {
        setSignUpError(e.target.value.length < 5);
      } else if (e.target.id === 'email') {
        const isValidEmail = emailRegex.test(e.target.value);
        setEmailError(!isValidEmail);
  
        if (!isValidEmail) {
          setTimeout(() => {
            setEmailError(false);
          }, 10000);
        }
      }

      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }

  const onSubmit = async (e) => {
    e.preventDefault()
 
    try {
      const auth = getAuth()



      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      if(!user) {
        throw new Error('Could not complete signup')
      }

      await updateProfile(auth.currentUser, {
        displayName: name
      })

        // copy everything that is in the data state  
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')

    } catch (error) {
        console.log(error)

        setEmailError(true)

        setTimeout(() => {
          setEmailError(false)
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
              type="name"
              placeholder="name*"  
              id="name"
              value={name}
              onChange={onChange}
            />
            <input 
              type="email"
              placeholder="email"  
              id="email"
              value={email}
              onChange={onChange}
              style={{
                borderBottom: `1.2px solid ${emailError ? '#f14343' : '#000000'}`
              }}
            />
            <input 
              type="password"
              placeholder="password*"  
              id="password"
              value={password}
              onChange={onChange}
              style={{
                borderBottom: `1.2px solid ${signUpError ? '#f14343' : '#000000'}`
              }}
            />
            <div className={styles.error}> 
              <div 
                className={styles.wrongPassword}
                style={{
                  opacity: signUpError || emailError ? 1 : 0
                }}  
              >
                <div>!</div>
                <p>{emailError ? 'Please enter a valid email' : 'Password should be at least 6 characters'}</p>
              </div>
            </div>

            <ButtonAuth />
          </form>
        </LayoutAuth>
    </section>
  </>
  )
}
