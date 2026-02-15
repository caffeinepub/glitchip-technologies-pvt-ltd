import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

module {
  // Type definitions from main actor
  type ExperienceRange = {
    minYears : Nat;
    maxYears : Nat;
  };

  type JobPosting = {
    jobId : Text;
    title : Text;
    description : Text;
    responsibilities : Text;
    salaryRange : Text;
    experienceRange : ExperienceRange;
  };

  // Actor type from main actor
  type OldActor = {
    jobs : Map.Map<Text, JobPosting>;
  };

  type NewActor = {
    jobs : Map.Map<Text, JobPosting>;
  };

  // Removes postings by title if present
  public func removeNonPlaceholderJobs(old : OldActor) : Map.Map<Text, JobPosting> {
    old.jobs.filter(
      func(_id, career) {
        (career.title != "Frontend Developer" and
        career.title != "Backend Developer" and
        career.title != "Mobile App Developer");
      }
    );
  };

  // Migration function called by the main actor via the with-clause
  public func run(old : OldActor) : NewActor {
    {
      old with
      jobs = removeNonPlaceholderJobs(old);
    };
  };
};
