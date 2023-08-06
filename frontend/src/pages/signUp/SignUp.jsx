import { useState } from 'react'
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData

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
