import { Request, Response } from 'express';
import coverLetterService from '../services/coverLetterService';
import { CoverLetterRequest } from '../models/CoverLetterRequest';
import { CoverLetterResponse } from '../models/CoverLetterResponse';

const generateController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Resume file is required' });
        }
        const jobDescription: string = req.body.jobDescription;
        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }
        const recruiterName: string | undefined = req.body.recruiterName;
        const model: string = req.body.model || 'gpt-4o';

        const coverLetterRequest: CoverLetterRequest = {
            resumeFile: req.file,
            jobDescription,
            recruiterName,
            model,
        };

        const result: CoverLetterResponse = await coverLetterService.generateCoverLetter(coverLetterRequest);
        res.status(200).json(result);
    } catch (error: any) {
        console.error('Error in generateController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default generateController;