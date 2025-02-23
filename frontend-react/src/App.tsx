import React from 'react';
import { useCoverLetter } from './hooks/useCoverLetter';
import styles from './App.module.css';
import CoverLetterForm from "./components/CoverLetterForm/CoverLetterForm";
import CoverLetterActions from "./components/CoverLetterActions/CoverLetterActions";

const App: React.FC = () => {
    const { coverLetterText, pdfBase64, loading, error, generateCoverLetter } = useCoverLetter();

    return (
        <main className={styles.container}>
            <CoverLetterForm generateCoverLetter={generateCoverLetter} loading={loading} error={error} />
            {coverLetterText && pdfBase64 && (
                <CoverLetterActions coverLetterText={coverLetterText} pdfBase64={pdfBase64} />
            )}
        </main>
    );
};

export default App;
