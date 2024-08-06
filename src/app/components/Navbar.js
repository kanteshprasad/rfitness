'use client'; // This directive ensures the file is treated as a client component

import { useState, useEffect } from 'react';
import { Client, Account } from 'appwrite';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css'; // Import CSS module for styling

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;


// Initialize Appwrite client and account here
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const account = new Account(client);

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (err) {
        setUser(null); // No session found
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Log out current session
      router.replace('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <a href="/home" className={styles.brandName}>Rfitness</a>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <a href="/home" className={styles.navLink}>Home</a>
        </li>
        {user ? (
          <>
            <li className={styles.navItem}>
              <a href="/dashboard" className={styles.navLink}>Dashboard</a>
            </li>
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <a href="/login" className={styles.navLink}>Login</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
