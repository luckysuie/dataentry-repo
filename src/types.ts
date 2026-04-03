export interface CandidateFormData {
  // Personal Information
  fullName: string;
  gmail: string;
  phNumber: string;
  city: string;
  gender: "Female" | "Male" | "";
  visaType: string;
  field: "IT" | "Non-IT" | "";
  experience: "Experienced" | "Fresher" | "";
  targetCountry: string;
  homeCountry: string;
  programType: string;
  technology: string;
  candidateStatus: string;

  // Training Team
  batchNo: string;
  timingsEST: string;
  trainingDL: string;
  trainer: string;
  trainingCoordinator: string;

  // Mentoring Team
  mentoringDL: string;
  mentoringML: string;
  mentoringTL: string;
  mentoringExpNum: string;

  // Resume MKT
  resumeDL: string;
  resumeRMTL: string;
  resumeRMSpecialist: string;

  // Dates
  signUpDate: string;
  trainingStartDate: string;
  trainingEndDate: string;
  bootcampStartDate: string;
  bootcampEndDate: string;
  marketingStartDate: string;
  marketingEndDate: string;
  quitDate: string;

  // Pause/Parking
  pauseCount: number;
  parkingCount: number;
  pauseParkingStartDate: string;
  pauseParkingEndDate: string;

  // Placement
  placementCount: number;
  placementCompany: string;
  placementSalary: string;
  placementCurrency: string;
  placementJobType: "Full time" | "Contract" | "";
  placementOfferDate: string;
  placementJoiningDate: string;
}
