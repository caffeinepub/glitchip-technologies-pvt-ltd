import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { JobPosting, JobApplication, ContactFormSubmission } from '../backend';

export function useGetAllJobs() {
  const { actor, isFetching } = useActor();

  return useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const jobs = await actor.getAllJobs();
        return jobs;
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetJobById(jobId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<JobPosting | null>({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!actor || !jobId) return null;
      return actor.getJobById(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
  });
}

export function useSubmitJobApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: JobApplication) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addJobApplication(application);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (submission: ContactFormSubmission) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(submission);
    },
  });
}

export function useGetCompanyContacts() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['companyContacts'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCompanyContacts();
    },
    enabled: !!actor && !isFetching,
  });
}
