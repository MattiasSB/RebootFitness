import { useState } from 'react'

import styles from './InputField.module.scss'

export default function InputField() {

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
    
  return (
    <>
        <input 
            type="email"
            className={styles.inputField}
            placeholder="email or phone number*"  
            id="email"
            value={email}
            onChange={onChange}
            />
        <input 
            type="password"
            className={styles.inputField}
            placeholder="password*"  
            id="password"
            value={password}
            onChange={onChange}
        />
    </>
  )
}
