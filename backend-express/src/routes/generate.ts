import { Router } from 'express';
import multer from 'multer';
import generateController from '../controllers/generateController';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

/**
 * POST /generate
 * Expects:
 * - resume: PDF file (multipart field)
 * - jobDescription: string (form field)
 * - recruiterName: string (optional form field; if not provided or empty, defaults to "Hiring Manager")
 */
router.post('/', upload.single('resume'), generateController);

export default router;
