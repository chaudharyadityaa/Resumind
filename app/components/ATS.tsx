import React from 'react';

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass =
    score > 69 ? 'from-green-100'
      : score > 49 ? 'from-yellow-100'
        : 'from-red-100';

  // Determine icon based on score
  const iconSrc =
    score > 69 ? '/icons/ats-good.svg'
      : score > 49 ? '/icons/ats-warning.svg'
        : '/icons/ats-bad.svg';

  // Determine HR-style feedback based on score
  const hrSummary =
    score > 69
      ? "This candidate demonstrates strong alignment with role requirements and keywords. Likely to pass ATS screening and proceed to HR review."
      : score > 49
        ? "This candidate meets partial criteria but may require review for role-specific alignment and keyword match."
        : "This candidate has low alignment with job criteria and may not pass initial ATS or HR screening.";

  const subtitle =
    score > 69 ? 'High Fit'
      : score > 49 ? 'Moderate Fit'
        : 'Low Fit';

  const strengths = suggestions.filter(s => s.type === "good");
  const improvements = suggestions.filter(s => s.type === "improve");

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-lg w-full p-6 border border-gray-200`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score: {score}/100</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      {/* HR Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">HR Evaluation Summary</h3>
        <p className="text-gray-700">{hrSummary}</p>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="mb-5">
          <h4 className="text-md font-semibold text-green-700 mb-2">Candidate Strengths</h4>
          <div className="space-y-2">
            {strengths.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <img src="/icons/check.svg" alt="Check" className="w-5 h-5 mt-1" />
                <p className="text-green-700">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Areas for Improvement */}
      {improvements.length > 0 && (
        <div className="mb-5">
          <h4 className="text-md font-semibold text-amber-700 mb-2">Areas for Improvement</h4>
          <div className="space-y-2">
            {improvements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <img src="/icons/warning.svg" alt="Warning" className="w-5 h-5 mt-1" />
                <p className="text-amber-700">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer message */}
      <p className="text-gray-600 italic">
        This ATS analysis provides HR professionals with insights to assess applicant fit and shortlist qualified candidates effectively.
      </p>
    </div>
  );
};

export default ATS;
