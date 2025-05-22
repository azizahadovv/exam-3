import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import docxFile from '../assets/ATIV kechki 3-kurs.docx'; 

function Ativ() {
    const [qaList, setQaList] = useState([]);
  
    useEffect(() => {
      const loadDocx = async () => {
        try {
          const response = await fetch(docxFile);
          const arrayBuffer = await response.arrayBuffer();
  
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const html = result.value;
  
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const table = doc.querySelector('table');
  
          if (!table) {
            console.warn('Jadval topilmadi');
            return;
          }
  
          const rows = Array.from(table.querySelectorAll('tr'));
          const data = rows.map(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 2) {
              return {
                question: cells[0].textContent.trim(),
                value: cells[1].textContent.trim()
              };
            }
            return null;
          }).filter(item => item !== null);
  
          setQaList(data);
        } catch (err) {
          console.error("Xatolik DOCX o‘qishda:", err);
        }
      };
  
      loadDocx();
    }, []);
  
    return (
      <div style={{ padding: '20px' }}>
        <h2>📄 Tashkiliy jihatlar va O‘quv adabiyotlari</h2>
        <pre style={{ background: '#f9f9f9', padding: '10px', borderRadius: '6px' }}>
          {qaList.length ? JSON.stringify(qaList, null, 2) : 'Yuklanmoqda...'}
        </pre>
      </div>
    );
  }

export default Ativ