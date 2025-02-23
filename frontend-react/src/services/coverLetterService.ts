import axios from 'axios';

export interface CoverLetterResponse {
    coverLetterText: string;
    pdfBase64: string;
}

export const generateCoverLetterService = async (
    formData: FormData
): Promise<CoverLetterResponse> => {
    const response = await axios.post<CoverLetterResponse>('http://localhost:3000/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
