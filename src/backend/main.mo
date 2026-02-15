import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type JobPosting = {
    jobId : Text;
    title : Text;
    description : Text;
    responsibilities : Text;
    salary : Text;
  };

  public type JobApplication = {
    jobId : Text;
    name : Text;
    email : Text;
    phone : Text;
    resumeLink : Text;
    message : ?Text;
  };

  public type ContactFormSubmission = {
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
    company : ?Text;
  };

  let jobs = Map.empty<Text, JobPosting>();
  let jobApplications = Map.empty<Text, [JobApplication]>();
  let contactFormSubmissions = Map.empty<Nat, ContactFormSubmission>();
  var nextContactFormId = 1;
  let userProfiles = Map.empty<Principal, UserProfile>();

  let initialJobs : [JobPosting] = [
    {
      jobId = "1";
      title = "Frontend Developer";
      description = "Design and build web interfaces";
      responsibilities = "UI/UX design, testing, optimization";
      salary = "INR 5-7 LPA";
    },
    {
      jobId = "2";
      title = "Backend Developer";
      description = "Develop backend systems";
      responsibilities = "API design, data management, optimization";
      salary = "INR 7-9 LPA";
    },
    {
      jobId = "3";
      title = "Mobile App Developer";
      description = "Develop cross-platform mobile applications";
      responsibilities = "Mobile UI/UX design, testing, optimization";
      salary = "INR 6-8 LPA";
    },
  ];

  for (job in initialJobs.values()) {
    jobs.add(job.jobId, job);
  };

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public job listing endpoints (no auth required - anyone can browse jobs)
  public query ({ caller }) func getAllJobs() : async [JobPosting] {
    jobs.values().toArray();
  };

  public query ({ caller }) func getJobById(jobId : Text) : async ?JobPosting {
    jobs.get(jobId);
  };

  // Public job application endpoint (no auth required - anyone can apply)
  public shared ({ caller }) func addJobApplication(application : JobApplication) : async () {
    let jobExists = switch (jobs.get(application.jobId)) {
      case (null) { false };
      case (_) { true };
    };

    if (not jobExists) {
      Runtime.trap("Job does not exist : " # application.jobId);
    };

    let existingApplications = switch (jobApplications.get(application.jobId)) {
      case (null) { [] };
      case (?apps) { apps };
    };

    let newApplications = existingApplications.concat([application]);
    jobApplications.add(application.jobId, newApplications);
  };

  // Public contact form endpoint (no auth required - anyone can submit)
  public shared ({ caller }) func submitContactForm(submission : ContactFormSubmission) : async () {
    contactFormSubmissions.add(nextContactFormId, submission);
    nextContactFormId += 1;
  };

  // Admin-only endpoint to view all job applications
  public query ({ caller }) func getAllApplications() : async [(Text, [JobApplication])] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all applications");
    };
    let entriesIter = jobApplications.entries();
    let entriesArray = entriesIter.toArray();
    entriesArray;
  };

  // Admin-only endpoint to view all contact form submissions
  public query ({ caller }) func getAllContactFormSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact form submissions");
    };
    contactFormSubmissions.values().toArray();
  };

  // Public endpoint to get company contact information
  public query ({ caller }) func getCompanyContacts() : async {
    email : Text;
    phone : Text;
    address : Text;
  } {
    {
      email = "contact@glitchip.in";
      phone = "+91 99 9999 9999";
      address = "Bengaluru, India";
    };
  };
};
