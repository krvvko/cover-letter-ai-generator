import { CoverLetterRequest } from '../models/CoverLetterRequest';
import { CoverLetterResponse } from '../models/CoverLetterResponse';
import pdfParse from 'pdf-parse';
import { generatePDFBuffer } from '../utils/pdfGenerator';
import {generateCoverLetterText} from "./openaiService";

const coverLetterService = {
    generateCoverLetter: async (request: CoverLetterRequest): Promise<CoverLetterResponse> => {
        const resumeBuffer = request.resumeFile.buffer;
        const resumeData = await pdfParse(resumeBuffer);
        const resumeText = resumeData.text;

        const recruiterName =
            request.recruiterName && request.recruiterName.trim() !== ''
                ? request.recruiterName
                : 'Hiring Manager';
        const greeting = `Dear ${recruiterName},`;

        const coverLetterText = await generateCoverLetterText(
            greeting,
            resumeText,
            request.jobDescription,
            request.model
        );

        const pdfBuffer = await generatePDFBuffer(coverLetterText);
        const pdfBase64 = pdfBuffer.toString('base64');

        return {
            coverLetterText,
            pdfBase64,
        };
    },
};

export default coverLetterService;
