'use client'; // This directive ensures the file is treated as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Client, Account } from 'appwrite';
import styles from './Login.module.css'; // Import CSS module for styling
import Navbar from '../components/Navbar';

// Initialize Appwrite client and account here
const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66b0747b001cea147dd4');

const account = new Account(client);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  console.log('Project ID:', process.env.NEXT_PUBLIC_PROJECT_ID); // Debugging line
  

  const handleLogin = (event) => {
    event.preventDefault();

    account.createEmailPasswordSession(email, password)
      .then((response) => {
        console.log(response); // Success
        router.push('/dashboard');
      })
      .catch((err) => {
        console.error('Login error:', err); // Log detailed error
        setError('Login failed. Please check your credentials.');
        console.log(email, password, process.env.NEXT_PUBLIC_PROJECT_ID);
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Login</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </>
  );
}
