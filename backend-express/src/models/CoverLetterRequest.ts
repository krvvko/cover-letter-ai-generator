import { Express } from 'express';

export interface CoverLetterRequest {
    resumeFile: Express.Multer.File;
    jobDescription: string;
    recruiterName?: string;
    model: string;
}
