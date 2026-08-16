import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  FileSpreadsheet, 
  Download, 
  Search,
  Scale
} from 'lucide-react';

interface MedicalViewProps {
  onSelectEvidence: (evidenceId: string) => void;
  onSelectCase: (caseId: string) => void;
}

export const MedicalView: React.FC<MedicalViewProps> = ({ onSelectEvidence, onSelectCase }) => {
  const { evidence } = useData();
  const [activeTab, setActiveTab] = useState<'csf' | 'chronology' | 'restoration' | 'labs'>('csf');

  const medicalEvidence = evidence.filter((e) => e.category === 'Medical & Lab');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12 bg-white overflow-x-hidden">
      
      {/* Editorial Header */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="text-xs font-mono font-bold text-[#FF3B00] uppercase tracking-widest">
          Forensic Clinical Audit · Harborview Medical Center
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-black tracking-tight leading-[1.08]">
          Harborview CSF Spinal Tap & Medicalization Audit
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          A forensic medical audit exposing lab discrepancies, 95% neutrophil CSF counts, uncorroborated psychiatric holds, and the 2026 definitive restoration of trial competency.
        </p>
      </div>

      {/* Top Benchmark Summary Cards - 100% Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 border-2 border-black space-y-1">
          <span className="text-[11px] font-mono font-bold text-[#FF3B00] uppercase tracking-wider block">
            Harborview Lumbar Puncture
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-black text-black">95% Neutrophils</div>
          <p className="text-xs text-neutral-600 font-serif mt-1">
            Bacterial / trauma profile. Contradicts neurosyphilis lymphocytic norm.
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 border-2 border-black space-y-1">
          <span className="text-[11px] font-mono font-bold text-[#FF3B00] uppercase tracking-wider block">
            Involuntary Psychiatric Hold
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-black text-black">22 Days Held</div>
          <p className="text-xs text-neutral-600 font-serif mt-1">
            RCW 71.05 hold executed following Case 658959 dismissal.
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 border-2 border-black space-y-1">
          <span className="text-[11px] font-mono font-bold text-black uppercase tracking-wider block">
            Discharge Delay
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-black text-black">10 Days Unnecessary</div>
          <p className="text-xs text-neutral-600 font-serif mt-1">
            Subject held past clinical stabilization due to discharge coordination lapses.
          </p>
        </div>

        <div className="bg-[#FF3B00] text-white p-4 sm:p-5 border-2 border-black space-y-1">
          <span className="text-[11px] font-mono font-black text-white uppercase tracking-wider block">
            Competency Status (2026)
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-black text-white">100% Restored</div>
          <p className="text-xs text-white/90 font-serif mt-1">
            Dr. Leavey evaluation restores all trial competencies unconditionally.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-neutral-300 pb-2 overflow-x-auto text-xs font-mono">
        <span className="text-black font-bold uppercase text-[11px] tracking-wider whitespace-nowrap">Sections:</span>
        {[
          { id: 'csf', label: '1. CSF Analysis' },
          { id: 'chronology', label: '2. Hospitalization Chronology' },
          { id: 'restoration', label: '3. 2026 Competency Restoration' },
          { id: 'labs', label: `4. Lab Reports (${medicalEvidence.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 uppercase text-[11px] font-bold transition cursor-pointer border whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-black text-white border-black font-black'
                : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: CSF Spinal Tap Forensic Analysis */}
      {activeTab === 'csf' && (
        <div className="space-y-8">
          <div className="border-2 border-black bg-white p-5 sm:p-8 md:p-10 space-y-6 shadow-xs">
            <div className="border-b-2 border-black pb-4">
              <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FF3B00]">
                Harborview Lumbar Puncture Audit • March 2021
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-black mt-1">
                The 95% Neutrophilic Discrepancy in Cerebrospinal Fluid
              </h2>
            </div>

            <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-800 font-serif italic border-l-4 border-[#FF3B00] pl-4">
              “When hospital staff performed an emergency lumbar puncture at Harborview Medical Center in March 2021, the lab returned 95% neutrophils in the CSF differential. Despite zero corroborating viral or bacterial markers, this acute finding was diverted into an involuntary psychiatric holding protocol.”
            </blockquote>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-neutral-50 border-2 border-black space-y-3">
                <h3 className="font-mono text-xs font-black uppercase text-[#FF3B00]">
                  Standard Clinical Virology Norms
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-serif">
                  In central nervous system infections, autoimmune encephalitis, and neurosyphilis, the typical CSF cellular profile is <strong>lymphocytic</strong> (lymphocytes predominate). A 95% <strong>neutrophil</strong> predominance points specifically to acute bacterial insult, physical meningeal trauma, chemical irritation, or secondary inflammatory response.
                </p>
                <ul className="text-xs space-y-1.5 list-disc pl-4 font-mono text-neutral-800">
                  <li>Viral PCR (HSV 1 & 2, VZV, Enterovirus): Negative</li>
                  <li>Acid-Fast Bacilli (AFB / TB): Negative</li>
                  <li>Fungal & Cryptococcal Antigen: Negative</li>
                  <li>RPR / Syphilis Screen: Non-reactive / Negative</li>
                </ul>
              </div>

              <div className="p-5 bg-black text-white border-2 border-black space-y-3">
                <h3 className="font-mono text-xs font-black uppercase text-[#FF3B00]">
                  Diagnostic Substitution in Record
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                  Rather than treating the acute lumbar findings as possible traumatic or infectious insult sustained during arrest/custody, the hospital charted psychiatric symptom manifestation, creating the pretext for an involuntary RCW 71.05 hold.
                </p>
                <div className="p-3 bg-neutral-900 border border-neutral-700 text-xs font-mono text-[#FF3B00]">
                  Finding: Zero follow-up repeated spinal taps conducted prior to civil commitment hearing.
                </div>
              </div>
            </div>

            {/* Differential Cell Comparison Table */}
            <div className="pt-4 space-y-3">
              <h3 className="font-mono text-xs font-black uppercase text-black">
                Forensic CSF Differential Comparison
              </h3>
              <div className="overflow-x-auto border-2 border-black">
                <table className="w-full text-xs font-serif text-left min-w-[500px]">
                  <thead className="bg-black text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Test Parameter</th>
                      <th className="p-3">Harborview Patient Value</th>
                      <th className="p-3">Standard Reference Range</th>
                      <th className="p-3">Forensic Assessment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    <tr className="hover:bg-neutral-50">
                      <td className="p-3 font-mono font-bold text-black">CSF Neutrophils %</td>
                      <td className="p-3 font-mono font-black text-[#FF3B00]">95%</td>
                      <td className="p-3 font-mono text-neutral-600">0 – 6%</td>
                      <td className="p-3 text-neutral-900">Extreme neutrophilia. Points to trauma, hemorrhage, or acute bacterial insult.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-3 font-mono font-bold text-black">CSF Lymphocytes %</td>
                      <td className="p-3 font-mono text-black">3%</td>
                      <td className="p-3 font-mono text-neutral-600">60 – 80%</td>
                      <td className="p-3 text-neutral-900">Markedly depressed lymphocytic ratio. Rules out chronic indolent encephalitis.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-3 font-mono font-bold text-black">WBC Count (CSF)</td>
                      <td className="p-3 font-mono font-bold text-black">Elevated (18 /uL)</td>
                      <td className="p-3 font-mono text-neutral-600">0 – 5 /uL</td>
                      <td className="p-3 text-neutral-900">Pleocytosis confirmed. Hospital discharged without resolving source.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-3 font-mono font-bold text-black">Protein (CSF)</td>
                      <td className="p-3 font-mono font-bold text-black">Elevated</td>
                      <td className="p-3 font-mono text-neutral-600">15 – 45 mg/dL</td>
                      <td className="p-3 text-neutral-900">Blood-brain barrier compromise documented in official lab log.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Chronology */}
      {activeTab === 'chronology' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-black p-5 sm:p-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black">
              22-Day Involuntary Hospitalization Audit
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed">
              Timeline of involuntary civil detention under RCW 71.05 following the dismissal of municipal charges.
            </p>
            
            <div className="space-y-3 pt-2">
              {[
                {
                  day: 'Day 1 (March 15)',
                  title: 'Emergency Admission Post-Dismissal',
                  desc: 'Transferred directly from King County Correctional Facility to Harborview Emergency Department despite lack of active criminal holds.'
                },
                {
                  day: 'Day 3 (March 17)',
                  title: 'Lumbar Puncture Administered',
                  desc: 'Emergency spinal tap yields 95% neutrophils in CSF differential. Infectious disease workup initiated.'
                },
                {
                  day: 'Day 7 (March 21)',
                  title: 'Infectious Panels Return Negative',
                  desc: 'Viral PCR, syphilis, and fungal markers return negative. Patient medically cleared from acute neuro-insult, yet shifted to psych hold.'
                },
                {
                  day: 'Day 12 (March 26)',
                  title: 'Discharge Recommendations Delayed',
                  desc: 'Social work and institutional discharge coordination lapses lead to an unnecessary 10-day retention in inpatient psych unit.'
                },
                {
                  day: 'Day 22 (April 5)',
                  title: 'Final Unconditional Release',
                  desc: 'Discharged with zero outpatient psychiatric commitment orders; court finds no grounds for ongoing involuntary commitment.'
                }
              ].map((ev, i) => (
                <div key={i} className="p-4 bg-neutral-50 border-2 border-black space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#FF3B00] uppercase">{ev.day}</span>
                  </div>
                  <h4 className="font-serif font-black text-base text-black">{ev.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 2026 Restoration */}
      {activeTab === 'restoration' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-black p-5 sm:p-8 space-y-4">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FF3B00]">
              Forensic Evaluation • Dr. Leavey Report (2026)
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black">
              Definitive 2026 Restoration of Legal Competency
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed">
              Independent forensic psychiatric evaluation conclusively demonstrates trial competency, rational comprehension of legal dockets, and complete absence of incapacitating clinical deficits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-neutral-50 border-2 border-black space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">Legal Understanding</span>
                <div className="font-serif font-black text-lg text-black">100% Intact</div>
                <p className="text-xs text-neutral-700 font-serif">Demonstrates clear grasp of charges, roles of court officers, and plea consequences.</p>
              </div>

              <div className="p-4 bg-neutral-50 border-2 border-black space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">Capacity to Assist Counsel</span>
                <div className="font-serif font-black text-lg text-black">Fully Restored</div>
                <p className="text-xs text-neutral-700 font-serif">Able to formulate reasoned strategy and review documentary evidence systematically.</p>
              </div>

              <div className="p-4 bg-neutral-50 border-2 border-black space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-[#FF3B00]">Judicial Status</span>
                <div className="font-serif font-black text-lg text-black">Competent</div>
                <p className="text-xs text-neutral-700 font-serif">All past delays attributed to administrative backlog rather than genuine clinical incapacity.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Labs */}
      {activeTab === 'labs' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-black p-5 sm:p-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black">
              Medical & Lab Document Vault ({medicalEvidence.length} Records)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {medicalEvidence.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onSelectEvidence(doc.id)}
                  className="p-5 bg-neutral-50 hover:bg-neutral-100 border-2 border-black cursor-pointer transition flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#FF3B00] font-bold uppercase">{doc.classification}</span>
                      <span className="text-neutral-500">{doc.date}</span>
                    </div>
                    <h4 className="font-serif font-black text-base text-black group-hover:text-[#FF3B00] transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-neutral-700 font-serif line-clamp-2">
                      {doc.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-neutral-200 flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-500">{doc.entity}</span>
                    <span className="text-black font-bold group-hover:text-[#FF3B00] uppercase">
                      Inspect Lab →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
