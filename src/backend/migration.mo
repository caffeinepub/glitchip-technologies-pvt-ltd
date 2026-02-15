import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  // Old types
  type OldJobPosting = {
    jobId : Text;
    title : Text;
    description : Text;
    responsibilities : Text;
    salary : Text;
  };

  // New types with ExperienceRange
  type ExperienceRange = {
    minYears : Nat;
    maxYears : Nat;
  };

  type NewJobPosting = {
    jobId : Text;
    title : Text;
    description : Text;
    responsibilities : Text;
    salaryRange : Text;
    experienceRange : ExperienceRange;
  };

  type OldActor = {
    jobs : Map.Map<Text, OldJobPosting>;
    initialJobs : [OldJobPosting];
    // Other state fields (no changes needed)
  };

  type NewActor = {
    jobs : Map.Map<Text, NewJobPosting>;
    initialJobs : [NewJobPosting];
    // Other state fields (no changes needed)
  };

  public func run(old : OldActor) : NewActor {
    let newJobs = old.jobs.map<Text, OldJobPosting, NewJobPosting>(
      func(_jobId, oldJob) {
        {
          oldJob with
          salaryRange = oldJob.salary;
          experienceRange = {
            minYears = 0;
            maxYears = 5;
          };
        };
      }
    );
    let newInitialJobs = old.initialJobs.map<OldJobPosting, NewJobPosting>(
      func(oldJob) {
        {
          oldJob with
          salaryRange = oldJob.salary;
          experienceRange = {
            minYears = 0;
            maxYears = 5;
          };
        };
      }
    );
    { old with jobs = newJobs; initialJobs = newInitialJobs };
  };
};

