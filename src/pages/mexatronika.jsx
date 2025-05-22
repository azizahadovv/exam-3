import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import docxFile from '../assets/Mexatronika_test.docx';

function Mexatronika() {
  const [rawJSON, setRawJSON] = useState(null);
  useEffect(() => {
    const loadDocxAndParse = async () => {
      try {
        const response = await fetch(docxFile);
        const arrayBuffer = await response.arrayBuffer();

        // Word fayldan oddiy matn (plain text) olish
        const result = await mammoth.extractRawText({ arrayBuffer });
        const plainText = result.value;

        // ++++ bo‘yicha bo‘limlarga bo‘lish
        const blocks = plainText.split('++++').map(block => block.trim()).filter(Boolean);

        const jsonData = blocks.map(block => {
          const parts = block.split('====').map(p => p.trim()).filter(Boolean);
          const question = parts[0];
          const correctLine = parts.find(line => line.startsWith('#'));
          const value = correctLine ? correctLine.replace(/^#/, '').trim() : '';

          return { question, value };
        });

        setRawJSON(jsonData);
      } catch (err) {
        console.error('Xatolik DOCX o‘qishda:', err);
      }
    };

    loadDocxAndParse();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📄 Mexatronika test savollari (Word fayldan)</h2>

      <h3>🧾 JSON natija:</h3>
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>
        {rawJSON ? JSON.stringify(rawJSON, null, 2) : 'JSON tayyorlanmoqda...'}
      </pre>
    </div>
  );
}

export default Mexatronika;
