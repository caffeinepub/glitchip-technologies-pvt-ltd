import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface EducationEntry {
    startYear: bigint;
    endYear?: bigint;
    institution: string;
    degree: string;
    fieldOfStudy: string;
}
export interface ContactFormSubmission {
    name: string;
    email: string;
    company?: string;
    message: string;
}
export interface WorkExperience {
    startYear: bigint;
    endYear?: bigint;
    description: string;
    companyName: string;
    position: string;
}
export interface JobApplication {
    resume?: ExternalBlob;
    country: string;
    termsAccepted: boolean;
    education: Array<EducationEntry>;
    jobId: string;
    email: string;
    passoutYear: bigint;
    previousWorkplaces: Array<WorkExperience>;
    message?: string;
    address: string;
    expectedPay: string;
    currentLocation: string;
    phone: string;
    lastName: string;
    collegeUniversityName: string;
    totalWorkExperience: string;
    firstName: string;
}
export interface JobPosting {
    title: string;
    responsibilities: string;
    jobId: string;
    description: string;
    experienceRange: ExperienceRange;
    salaryRange: string;
}
export interface ExperienceRange {
    maxYears: bigint;
    minYears: bigint;
}
export interface UserProfile {
    name: string;
    email?: string;
    company?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addJobApplication(application: JobApplication): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllApplications(): Promise<Array<[string, Array<JobApplication>]>>;
    getAllContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    getAllJobs(): Promise<Array<JobPosting>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanyContacts(): Promise<{
        email: string;
        address: string;
        phone: string;
    }>;
    getJobById(jobId: string): Promise<JobPosting | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(submission: ContactFormSubmission): Promise<void>;
}
