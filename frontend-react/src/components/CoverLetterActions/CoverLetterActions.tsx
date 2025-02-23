import styles from './index.module.css';
import React from 'react';

interface CoverLetterActionsProps {
    coverLetterText: string;
    pdfBase64: string;
}

const CoverLetterActions: React.FC<CoverLetterActionsProps> = ({ coverLetterText, pdfBase64 }) => {
    const downloadPDF = () => {
        if (!pdfBase64) {
            alert('No PDF available to download');
            return;
        }
        const now = new Date();
        const timestamp = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
        const filename = `cover_letter_${timestamp}.pdf`;
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfBase64}`;
        link.download = filename;
        link.click();
    };

    const viewText = () => {
        if (coverLetterText) {
            alert(coverLetterText);
        } else {
            alert('No cover letter text available to view');
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={downloadPDF} className={styles.button}>
                Download PDF
            </button>
            <button onClick={viewText} className={styles.button}>
                View Text
            </button>
        </div>
    );
};

export default CoverLetterActions;
