import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import docxFile from '../assets/MBBT_2-sem talaba.docx';

function Mbbt() {
    const [qaData, setQaData] = useState([]);

    useEffect(() => {
        const loadDocxAndParse = async () => {
            try {
                const response = await fetch(docxFile);
                const arrayBuffer = await response.arrayBuffer();

                const result = await mammoth.extractRawText({ arrayBuffer });
                const text = result.value;

                // Har bir qatorni ajratamiz
                const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

                const parsedQA = [];
                let currentQuestion = null;
                let currentAnswers = [];

                lines.forEach(line => {
                    if (line.startsWith('+')) {
                        // Oldingi savolni qo‘shamiz
                        if (currentQuestion) {
                            parsedQA.push({
                                question: currentQuestion,
                                answers: currentAnswers
                            });
                        }

                        // Yangi savol
                        currentQuestion = line.slice(1).trim(); // `+` belgisi olib tashlanadi
                        currentAnswers = [];
                    } else if (line.startsWith('=')) {
                        const answer = line.slice(1).trim(); // `=` belgisi olib tashlanadi
                        if (currentQuestion && answer) {
                            currentAnswers.push(answer);
                        }
                    }
                    // Boshqa qatorlarni e'tiborga olmaymiz
                });

                // Oxirgi savolni qo‘shamiz
                if (currentQuestion) {
                    parsedQA.push({
                        question: currentQuestion,
                        answers: currentAnswers
                    });
                }

                setQaData(parsedQA);
            } catch (err) {
                console.error('❌ DOCX faylni o‘qishda xatolik:', err);
            }
        };

        loadDocxAndParse();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>📄 MBBT Savol-Javoblar</h2>
            <h3>🧾 JSON natija:</h3>
            <pre style={{ background: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
                {qaData.length > 0 ? JSON.stringify(qaData, null, 2) : 'JSON tayyorlanmoqda...'}
            </pre>
        </div>
    );
}

export default Mbbt;
