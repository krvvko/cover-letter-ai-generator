import styles from './index.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import React from "react";

interface CoverLetterFormInputs {
    jobDescription: string;
    recruiterName?: string;
    resume: FileList;
    model: string;
}

interface CoverLetterFormProps {
    generateCoverLetter: (data: {
        jobDescription: string;
        recruiterName?: string;
        resumeFile: File;
        model: string;
    }) => Promise<void>;
    loading: boolean;
    error: string;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ generateCoverLetter, loading, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CoverLetterFormInputs>({
        defaultValues: { model: 'gpt-4o' },
    });

    const onSubmit: SubmitHandler<CoverLetterFormInputs> = async (data) => {
        if (data.resume && data.resume.length > 0) {
            await generateCoverLetter({
                jobDescription: data.jobDescription,
                recruiterName: data.recruiterName,
                resumeFile: data.resume[0],
                model: data.model,
            });
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.input}>
                <label>Recruiter Name:</label>
                <input
                    className={styles.inputText}
                    type="text"
                    {...register('recruiterName')}
                    placeholder="Enter recruiter name"
                />
            </div>
            <div className={styles.input}>
                <label>Job Description*:</label>
                <textarea
                    className={styles.inputText}
                    {...register('jobDescription', { required: 'Job description is required' })}
                    rows={5}
                    cols={50}
                />
                {errors.jobDescription && <span className={styles.error}>{errors.jobDescription.message}</span>}
            </div>
            <div className={styles.input}>
                <label>Resume PDF*:</label>
                <input
                    className={styles.inputText}
                    type="file"
                    accept="application/pdf"
                    {...register('resume', { required: 'Resume file is required' })}
                />
                {errors.resume && <span className={styles.error}>{errors.resume.message}</span>}
            </div>
            <div className={styles.input}>
                <label>Choose Model:</label>
                <select {...register('model')} className={styles.inputText}>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
            </div>
            <button type="submit" disabled={loading} className={styles.submit}>
                {loading ? 'Generating...' : 'Generate Cover Letter'}
            </button>
            {error && <div className={styles.error}>{error}</div>}
        </form>
    );
};

export default CoverLetterForm;
