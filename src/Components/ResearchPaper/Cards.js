import React, { useState, useEffect } from 'react';
import styles from './Cards.module.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

// Enable pdf.worker.js from pdfjs library
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Cards = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [error, setError] = useState('');
  const [token] = useCookies(['myToken']);

  useEffect(() => {
    const fetchResearchPapers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/researchpapers/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch research papers');
        }
        const data = await response.json();
        setResearchPapers(data);
      } catch (error) {
        setError('Error fetching research papers');
        console.error('Error fetching research papers:', error);
      }
    };

    fetchResearchPapers();
  }, [token.myToken]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {error && <p className={styles['error-message']}>{error}</p>}
        {researchPapers.map((researchPaper) => (
          <div className={styles['col-md-4']} key={researchPaper.id}>
            <div className={styles.card}>
              <div className={styles['card-body']}>
                <h5 className={styles['card-title']}>{researchPaper.title}</h5>
                <p className={styles['card-text']}>Topic: {researchPaper.Topic}</p>
                <p className={styles['card-text']}>{researchPaper.publication_date}</p>
                <div className={styles['pdf-preview']}>
                  <Document file={researchPaper.file}>
                    <Page pageNumber={1} width={350} height={400} renderTextLayer={false} />
                  </Document>
                </div>
                <div className={styles['view-pdf-button']}>
                  <Link to={researchPaper.file} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', fontWeight: 'bold', color:'#141f3d'}}>
                    Read The Research-Paper
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;