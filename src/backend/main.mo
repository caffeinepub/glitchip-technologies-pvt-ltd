import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type ExperienceRange = {
    minYears : Nat;
    maxYears : Nat;
  };

  public type JobPosting = {
    jobId : Text;
    title : Text;
    description : Text;
    responsibilities : Text;
    salaryRange : Text;
    experienceRange : ExperienceRange;
  };

  public type EducationEntry = {
    institution : Text;
    degree : Text;
    fieldOfStudy : Text;
    startYear : Nat;
    endYear : ?Nat;
  };

  public type WorkExperience = {
    companyName : Text;
    position : Text;
    startYear : Nat;
    endYear : ?Nat;
    description : Text;
  };

  public type JobApplication = {
    jobId : Text;
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
    country : Text;
    address : Text;
    currentLocation : Text;
    expectedPay : Text;
    collegeUniversityName : Text;
    passoutYear : Nat;
    totalWorkExperience : Text;
    education : [EducationEntry];
    previousWorkplaces : [WorkExperience];
    resume : ?Storage.ExternalBlob;
    message : ?Text;
    termsAccepted : Bool;
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
      jobId = "CM41AS2";
      title = "Physical Design Engineer";
      description = "Responsible for synthesizing and implementing digital circuit designs into physical layouts. Key tasks include floorplanning, clock tree synthesis, place and route, and timing optimization.";
      responsibilities = "Synthesize and place digital circuit designs, optimize layouts for power and efficiency, perform timing analysis, collaborate with cross-functional teams";
      salaryRange = "INR 4–20 LPA";
      experienceRange = {
        minYears = 0;
        maxYears = 5;
      };
    },
    {
      jobId = "G5P2R8M";
      title = "Design Verification Engineer";
      description = "Responsible for testing and verifying digital designs to ensure they meet specifications. Involves developing verification plans, writing test cases, and executing simulations.";
      responsibilities = "Develop and execute verification plans, write testbenches and assertions, debug verification failures, work with design teams";
      salaryRange = "INR 4–20 LPA";
      experienceRange = {
        minYears = 0;
        maxYears = 5;
      };
    },
    {
      jobId = "D3Q9W1Z";
      title = "DFT Engineer";
      description = "Focuses on designing and implementing design-for-test (DFT) methodologies. Includes scan insertion, test pattern development, and generating test strategies for digital circuits.";
      responsibilities = "Implement scan insertion and pattern generation, develop test strategies, analyze test coverage data, collaborate with design teams";
      salaryRange = "INR 4–20 LPA";
      experienceRange = {
        minYears = 0;
        maxYears = 5;
      };
    },
    {
      jobId = "A2X8V9G";
      title = "AI Automation Engineer";
      description = "Leverages artificial intelligence and machine learning to automate design and verification processes. Guides automation tool selection, workflow development, and machine learning algorithms.";
      responsibilities = "Implement AI automation tools, optimize workflows, use machine learning for design automation, collaborate with R&D teams";
      salaryRange = "INR 4–20 LPA";
      experienceRange = {
        minYears = 0;
        maxYears = 5;
      };
    },
  ];

  for (job in initialJobs.values()) {
    jobs.add(job.jobId, job);
  };

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

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

  // Public job listing endpoints
  public query ({ caller }) func getAllJobs() : async [JobPosting] {
    let allJobs = jobs.values().toArray();
    allJobs.filter<JobPosting>(
      func(job : JobPosting) : Bool {
        job.title != "Frontend Developer" and
        job.title != "Backend Developer" and
        job.title != "Mobile App Developer"
      }
    );
  };

  public query ({ caller }) func getJobById(jobId : Text) : async ?JobPosting {
    jobs.get(jobId);
  };

  // Public job application endpoint
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

  // Public contact form endpoint
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
      email = "hr@glitchip.in";
      phone = "+91 99 9999 9999";
      address = "Bengaluru, India";
    };
  };
};
