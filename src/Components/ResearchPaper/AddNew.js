import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../HomeScreen/Header'


import styles from './AddNew.module.css';

const AddNew = () => {
  const [token] = useCookies(['myToken']);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);
  const [citation, setCitation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('Topic', topic);
      formData.append('file', file);
      formData.append('citation', citation);
  
      await fetch('http://127.0.0.1:8000/api/researchpapers/', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token.myToken}`,
          },
        body: formData,
      });
  
      setSuccessMessage('Research paper added successfully.');
      setTitle('');
      setTopic('');
      setFile(null);
      setCitation('');
    } catch (error) {
      setErrorMessage('Failed to add research paper. Please try again later.');
    }
  };
  

  return (
    <div>
      <Header />
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Research Paper</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="citation">Citation:</label>
          <textarea
            id="citation"
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            required
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>Add Research Paper</button>
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddNew;
