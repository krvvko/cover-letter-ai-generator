import PDFDocument from 'pdfkit';

export const generatePDFBuffer = (content: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const chunks: Buffer[] = [];

            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            doc.font('Helvetica').fontSize(12).text(content, { align: 'left' });
            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
