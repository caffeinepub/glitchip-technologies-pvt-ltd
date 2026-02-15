import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JobApplication {
    name: string;
    jobId: string;
    email: string;
    resumeLink: string;
    message?: string;
    phone: string;
}
export interface JobPosting {
    title: string;
    salary: string;
    responsibilities: string;
    jobId: string;
    description: string;
}
export interface ContactFormSubmission {
    name: string;
    email: string;
    company?: string;
    message: string;
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
