import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

export const generateCoverLetterText = async (
    greeting: string,
    resumeText: string,
    jobDescription: string,
    model: string
): Promise<string> => {
    const prompt = `
Write a clear and detailed cover letter using my resume as reference for this job description and keep it to 400 words based on the following information
It should be 350-400 words.
Start with the greeting: "${greeting}"
In the second paragraph say that Im confident that I will be a strong candidate for this role 
Say in the end that I can be reached by the phone or by email, also say that I dont require sponsorship or visa (Im US citizen)

Resume:
${resumeText}

Job Description:
${jobDescription}

Please provide a cover letter that highlights the candidate's skills and aligns with the job description.
  `;

    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                { role: 'system', content: 'You are a helpful assistant that writes professional cover letters.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
        });
        // @ts-ignore
        return response.choices[0].message.content.trim();
    } catch (error: any) {
        throw new Error(`Error generating cover letter: ${error.message}`);
    }
};
