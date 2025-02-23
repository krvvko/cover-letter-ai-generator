import { useState } from 'react';
import { generateCoverLetterService, CoverLetterResponse } from '../services/coverLetterService';
import axios from "axios";

interface GenerateParams {
    jobDescription: string;
    recruiterName?: string;
    resumeFile: File;
    model: string;
}

export const useCoverLetter = () => {
    const [coverLetterText, setCoverLetterText] = useState<string>('');
    const [pdfBase64, setPdfBase64] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const generateCoverLetter = async (data: GenerateParams) => {
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('jobDescription', data.jobDescription);
        formData.append('recruiterName', data.recruiterName || '');
        formData.append('resume', data.resumeFile);
        formData.append('model', data.model);

        try {
            const result: CoverLetterResponse = await generateCoverLetterService(formData);
            setCoverLetterText(result.coverLetterText);
            setPdfBase64(result.pdfBase64);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message || 'Error generating cover letter');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return { coverLetterText, pdfBase64, loading, error, generateCoverLetter };
};
