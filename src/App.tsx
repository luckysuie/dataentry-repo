import React, { useState, useMemo } from 'react';
import { 
  User, 
  BookOpen, 
  Users, 
  Briefcase, 
  Calendar, 
  PauseCircle, 
  CheckCircle, 
  Save, 
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TECHNOLOGIES, 
  VISA_TYPES, 
  COUNTRIES, 
  PROGRAM_TYPES, 
  CANDIDATE_STATUSES, 
  TRAINERS, 
  STAFF_NAMES 
} from './constants';
import { CandidateFormData } from './types';

const INITIAL_STATE: CandidateFormData = {
  fullName: '',
  gmail: '',
  phNumber: '',
  city: '',
  gender: '',
  visaType: '',
  field: '',
  experience: '',
  targetCountry: '',
  homeCountry: '',
  programType: '',
  technology: '',
  candidateStatus: '',
  batchNo: '',
  timingsEST: '',
  trainingDL: '',
  trainer: '',
  trainingCoordinator: '',
  mentoringDL: '',
  mentoringML: '',
  mentoringTL: '',
  mentoringExpNum: '',
  resumeDL: '',
  resumeRMTL: '',
  resumeRMSpecialist: '',
  signUpDate: '',
  trainingStartDate: '',
  trainingEndDate: '',
  bootcampStartDate: '',
  bootcampEndDate: '',
  marketingStartDate: '',
  marketingEndDate: '',
  quitDate: '',
  pauseCount: 0,
  parkingCount: 0,
  pauseParkingStartDate: '',
  pauseParkingEndDate: '',
  placementCount: 0,
  placementCompany: '',
  placementSalary: '',
  placementCurrency: '',
  placementJobType: '',
  placementOfferDate: '',
  placementJoiningDate: '',
};

export default function App() {
  const [formData, setFormData] = useState<CandidateFormData>(INITIAL_STATE);
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sections = [
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'training', title: 'Training Team', icon: BookOpen },
    { id: 'mentoring', title: 'Mentoring Team', icon: Users },
    { id: 'marketing', title: 'Resume Marketing', icon: Briefcase },
    { id: 'dates', title: 'Key Dates', icon: Calendar },
    { id: 'status', title: 'Pause & Placement', icon: PauseCircle },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const isPauseMandatory = formData.pauseCount > 0 || formData.parkingCount > 0;
  const isPlacementMandatory = formData.placementCount > 0;

  const renderField = (label: string, name: keyof CandidateFormData, type: string = 'text', options?: string[], required: boolean = false) => {
    const commonClasses = "w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-md text-sm focus:outline-none focus:border-[#555] transition-colors text-white";
    
    return (
      <div className="space-y-1.5" id={`field-${name}`}>
        <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {options ? (
          <select 
            name={name} 
            value={formData[name] as string} 
            onChange={handleInputChange}
            className={commonClasses}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input 
            type={type} 
            name={name} 
            value={formData[name] as string | number} 
            onChange={handleInputChange}
            className={commonClasses}
            required={required}
            placeholder={`Enter ${label}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">CD</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white uppercase">Candidate Data Entry</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Internal Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <button 
              onClick={handleSubmit}
              className="bg-white text-black px-4 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Save size={14} />
              {isSubmitted ? 'Saved' : 'Submit Data'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar Navigation */}
        <aside className="space-y-8">
          <nav className="space-y-1">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-left ${
                  activeSection === index 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'
                }`}
              >
                <section.icon size={18} className={activeSection === index ? 'text-white' : 'text-gray-600'} />
                <span className="text-[13px] font-medium">{section.title}</span>
                {activeSection === index && (
                  <motion.div layoutId="active-indicator" className="ml-auto w-1 h-4 bg-white rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 bg-[#111] rounded-2xl border border-[#1A1A1A] space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Info size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">System Info</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Ensure all mandatory fields marked with an asterisk (*) are completed before submission. 
              Pause and Placement sections have conditional requirements based on counts.
            </p>
          </div>
        </aside>

        {/* Form Content */}
        <div className="space-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-[#1A1A1A] flex items-center justify-between">
                <h2 className="text-lg font-bold text-white tracking-tight">{sections[activeSection].title}</h2>
                <span className="text-[10px] text-gray-500 font-mono">SECTION 0{activeSection + 1} / 06</span>
              </div>

              <div className="p-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {activeSection === 0 && (
                    <>
                      {renderField("Full Name", "fullName", "text", undefined, true)}
                      {renderField("Gmail", "gmail", "email", undefined, true)}
                      {renderField("Ph Number", "phNumber", "tel", undefined, true)}
                      {renderField("City", "city", "text", undefined, true)}
                      {renderField("Gender", "gender", "select", ["Male", "Female"], true)}
                      {renderField("Visa Type", "visaType", "select", VISA_TYPES, true)}
                      {renderField("Field", "field", "select", ["IT", "Non-IT"], true)}
                      {renderField("Experience", "experience", "select", ["Experienced", "Fresher"], true)}
                      {renderField("Target Country", "targetCountry", "select", COUNTRIES, true)}
                      {renderField("Home Country", "homeCountry", "select", COUNTRIES, true)}
                      {renderField("Program Type", "programType", "select", PROGRAM_TYPES, true)}
                      {renderField("Technology", "technology", "select", TECHNOLOGIES, true)}
                      <div className="md:col-span-2">
                        {renderField("Candidate Status", "candidateStatus", "select", CANDIDATE_STATUSES, true)}
                      </div>
                    </>
                  )}

                  {activeSection === 1 && (
                    <>
                      {renderField("Batch No", "batchNo")}
                      {renderField("Timings EST", "timingsEST")}
                      {renderField("Training DL", "trainingDL", "select", STAFF_NAMES)}
                      {renderField("Trainer", "trainer", "select", TRAINERS)}
                      {renderField("Training Co-ordinator", "trainingCoordinator", "select", STAFF_NAMES)}
                    </>
                  )}

                  {activeSection === 2 && (
                    <>
                      {renderField("Mentoring DL", "mentoringDL", "select", STAFF_NAMES)}
                      {renderField("Mentoring ML", "mentoringML", "select", STAFF_NAMES)}
                      {renderField("Mentoring TL", "mentoringTL", "select", STAFF_NAMES)}
                      {renderField("Experience (Num)", "mentoringExpNum", "number")}
                    </>
                  )}

                  {activeSection === 3 && (
                    <>
                      {renderField("Resume DL", "resumeDL", "select", STAFF_NAMES)}
                      {renderField("RM TL", "resumeRMTL", "select", STAFF_NAMES)}
                      {renderField("RM Specialist", "resumeRMSpecialist", "select", STAFF_NAMES)}
                    </>
                  )}

                  {activeSection === 4 && (
                    <>
                      {renderField("Sign Up Date", "signUpDate", "date")}
                      {renderField("Training Start Date", "trainingStartDate", "date")}
                      {renderField("Training End Date", "trainingEndDate", "date")}
                      {renderField("Bootcamp Start Date", "bootcampStartDate", "date")}
                      {renderField("Bootcamp End Date", "bootcampEndDate", "date")}
                      {renderField("Marketing Start Date", "marketingStartDate", "date")}
                      {renderField("Marketing End Date", "marketingEndDate", "date")}
                      {renderField("Quit Date", "quitDate", "date")}
                    </>
                  )}

                  {activeSection === 5 && (
                    <>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A] mb-4">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                            <PauseCircle size={14} className="text-yellow-500" />
                            Pause & Parking
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {renderField("Pause Count", "pauseCount", "number")}
                            {renderField("Parking Count", "parkingCount", "number")}
                          </div>
                          {isPauseMandatory && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="grid grid-cols-2 gap-4 pt-2"
                            >
                              {renderField("Start Date", "pauseParkingStartDate", "date", undefined, true)}
                              {renderField("End Date", "pauseParkingEndDate", "date", undefined, true)}
                            </motion.div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-500" />
                            Placement
                          </h3>
                          {renderField("Placement Count", "placementCount", "number")}
                          {isPlacementMandatory && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="space-y-4 pt-2"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                {renderField("Company", "placementCompany", "text", undefined, true)}
                                {renderField("Salary", "placementSalary", "text", undefined, true)}
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {renderField("Currency", "placementCurrency", "text", undefined, true)}
                                {renderField("Job Type", "placementJobType", "select", ["Full time", "Contract"], true)}
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {renderField("Offer Date", "placementOfferDate", "date", undefined, true)}
                                {renderField("Joining Date", "placementJoiningDate", "date", undefined, true)}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>

              <div className="px-8 py-6 bg-[#151515] border-t border-[#1A1A1A] flex items-center justify-between">
                <button 
                  disabled={activeSection === 0}
                  onClick={() => setActiveSection(prev => prev - 1)}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous Section
                </button>
                
                {activeSection < sections.length - 1 ? (
                  <button 
                    onClick={() => setActiveSection(prev => prev + 1)}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
                  >
                    Next Section
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="bg-white text-black px-6 py-2 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Final Submit
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-600 font-bold">
              <span>Completion Progress</span>
              <span>{Math.round(((activeSection + 1) / sections.length) * 100)}%</span>
            </div>
            <div className="h-1 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-[100]"
          >
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-sm font-bold uppercase tracking-wider">Data submitted successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
