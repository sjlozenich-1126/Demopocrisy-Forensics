import { CaseStudy, TimelineEvent, NetworkNode, NetworkEdge, EvidenceDocument, Article, UserSubmission, PublicComment, SiteSettings } from '../types';

export const initialSiteSettings: SiteSettings = {
  siteTitle: 'DEMOPOCRISY',
  tagline: 'A Forensic Repository for Legal Systemic Mapping & Procedural Justice',
  announcement: 'FORENSIC AUDIT UPDATE: 2026 Competency Restoration formally concludes 5-year administrative substitution sequence. All 8 case dossiers published for public review.',
  contactEmail: 'demopocrisyrepository@gmail.com',
  authorName: 'Shane Jonathan Lozenich',
  authorOrg: 'Jonathan Shane Concepts / Techhumano',
  authorEmail: 'shane@jonathanshaneconcepts.com',
  majoratCorridorName: 'Seattle-Bremerton Sovereign Security Corridor',
  authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
};

export const initialCases: CaseStudy[] = [
  {
    id: '658931',
    caseNumber: '658931',
    title: 'The City of Seattle vs. Shane Lozenich',
    court: 'Seattle Municipal Court',
    cause: 'Violation of Domestic Violence No-Contact Order',
    judge: 'Catherine McDowall',
    incarcerationDates: '03/07/2021 – 03/08/2021',
    incarcerationDuration: '24 hours',
    disposition: 'Dismissed Without Prejudice — No Complaint Filed',
    status: 'Dismissed',
    year: 2021,
    headlineQuote: '"Data Breach Exposes 1.6 Million WA State Residents Who Filed Unemployment Claims in 2020"',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    executiveSummary: 'Case No. 658931 represents a textbook case study for institutional collapse during the COVID-19 pandemic. Originating from an arrest on March 7, 2021 regarding an alleged violation of a domestic violence no-contact order, the case was dismissed without prejudice because the prosecution failed to file a formal criminal complaint. An individual was subjected to physical arrest, custodial booking, and overnight jail detention without any formal legal charge ever submitted to the court.',
    contextualOrigins: 'The conflict emerged during the heightened isolation of pandemic lockdowns within a deteriorating rental relationship between Lozenich and a roommate (a high school music teacher). This domestic instability was compounded by the massive Washington State Auditor’s Office (SAO) Accellion data breach that exposed personal data for 1.6 million residents, including Lozenich. Following this breach, the subject experienced digital stalking, hacked email/cloud accounts, and threatening messages from unknown parties referencing his real-time location. Attempts to file reports with Seattle Police Department were turned away due to COVID precinct closures.',
    backgroundSummary: 'A complex intersection of rental housing strain, identity theft vulnerabilities from state data leaks, and pandemic-era institutional backlogs. While the roommate successfully obtained a temporary protective order via the Sheriff’s Department, Lozenich’s multiple prior 911 calls reporting roommate physical abuse went unfiled. When Lozenich returned briefly to collect clothing under his rental lease, police executed an arrest without verifying the underlying factual context.',
    narrativeSummary: 'On the morning of March 7, 2021, two Seattle Police Department officers entered Lozenich’s bedroom while he was asleep, pulled him from his bed, and handcuffed him. He spent the night in King County Jail (Booking #221002695). At the in-custody arraignment the next morning, Judge Catherine McDowall dismissed the case because the City Attorney’s Office filed no complaint. However, the arrest entry persisted in state databases without automated expungement.',
    proceduralCollapse: 'The procedural collapse occurred through a total breakdown in coordination between the police department and the prosecuting attorney’s office: Arrest → In-custody arraignment → No complaint filed → Dismissal → Release. The carceral system functioned only in its capacity to detain and process, yet failed to meet the constitutional threshold of justifying detention with a formal charge.',
    proceduralBreach: [
      'Warrantless seizure and bedroom entry without active emergency',
      'Failure to file criminal complaint within statutory post-arrest window',
      'Non-documentation of defendant’s prior 911 reports of roommate physical battery',
      'Failure to investigate concurrent 1.6M Accellion data breach and spoofed stalking vectors'
    ],
    evidenceAndInfo: [
      'Seattle Municipal Court docket sheet for Case 658931 showing "NO COMPLAINT FILED"',
      'King County Jail booking logs from March 7–8, 2021 (BA# 221002695)',
      'Washington State Auditor’s Office official Accellion breach notification letter',
      'Documentation of unresolved neighbor disappearance and identity substitutions on Midvale Ave N'
    ],
    constitutionalViolations: [
      {
        amendment: 'Fourth Amendment',
        violation: 'Unreasonable seizure and custodial detention without a valid, active criminal complaint.'
      },
      {
        amendment: 'Fourteenth Amendment',
        violation: 'Deprivation of liberty without due process of law.'
      },
      {
        amendment: 'Prosecutorial Duty',
        violation: 'Failure of prosecuting attorneys to file formal charges within statutory timelines post-booking.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Lack of Automated Tracking',
        manifestation: 'Absence of integrated digital workflows linking police bookings directly to prosecutor intake queues.'
      },
      {
        vector: 'Administrative Non-Responsiveness',
        manifestation: 'Pandemic-era protocols utilized to justify institutional silence, failing to document reported cyberstalking.'
      },
      {
        vector: 'Low-Threshold Protective Orders',
        manifestation: 'Civil protective orders weaponized as automatic criminal arrest triggers without context verification.'
      }
    ],
    interactionModel: 'Decoupled capturing system where police act as an autonomous arrest node, feeding individuals into jail custody without confirmation loops from the prosecuting node, breaking checks and balances.',
    proposedReforms: [
      'Implement mandatory real-time digital tracking linking jail bookings directly to prosecutor intake queues with auto-alerts.',
      'Establish automatic immediate release triggers if a formal complaint is not filed within 24 hours.',
      'Integrate digital forensics training for responding officers handling cyber-stalking claims.',
      'Require mandatory investigation of domestic abuse counter-claims that cannot be waived during pandemics.'
    ],
    systemicVariables: {
      primaryTechnology: 'E-Meter / Audio-Visual Switchboards / High-Frequency Devices',
      targetedPhenomena: 'Voice-to-Skull (V2K) Auditory Intrusion & Digital Stalking',
      dataContext: 'Washington State Auditor Accellion Data Breach (1.6M residents)',
      triggerMechanism: 'Unverified Protection Order Flag',
      tacticalDeployment: 'Bedroom Extraction'
    },
    associatedDocs: [
      {
        id: 'doc-658931-1',
        title: 'Court Docket & Dismissal Notice (Case 658931)',
        type: 'docket',
        date: '2021-03-08',
        fileSize: '340 KB',
        summary: 'Official Seattle Municipal Court sheet recording "NO COMPLAINT FILED" and dismissal without prejudice.'
      },
      {
        id: 'doc-658931-2',
        title: 'Washington State Auditor Accellion Breach Advisory',
        type: 'filing',
        date: '2021-02-01',
        fileSize: '1.2 MB',
        summary: 'Official SAO notification confirming compromised PII for WA unemployment recipients 2017-2020.'
      }
    ],
    tags: ['No Complaint Filed', 'Arrest Without Charge', 'COVID Compression', 'Data Breach', '4th Amendment']
  },
  {
    id: '658959',
    caseNumber: '658959',
    title: 'The City of Seattle vs. Shane Lozenich',
    court: 'Seattle Municipal Court',
    cause: 'Violation of No-Contact Order, Theft',
    judge: 'Catherine McDowall & Damon Shadid',
    attorney: 'Elizabeth Mustin (Stand-in Public Defender)',
    incarcerationDates: '03/10/2021 – 03/24/2021 (Jail) | 03/24/2021 – 04/15/2021 (Hospital)',
    incarcerationDuration: '14 Days Jail + 22 Days Involuntary Psychiatric Hold',
    disposition: 'Dismissed Without Prejudice (Reason of Incompetency / 71.05 Referral)',
    status: 'Dismissed w/o Prejudice',
    year: 2021,
    headlineQuote: '"World TB Day: King County Officials Warn of 100,000 Latent Cases"',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    executiveSummary: 'Case No. 658959 demonstrates a severe transition from criminal-legal processing into medicalized coercion. Initiated on March 10, 2021 over an alleged NCO violation and borrowing $40 for food with roommate consent, the case saw a stand-in public defender invoke competency to bypass factual review. Upon dismissal on March 24, Lozenich was subjected to an undocumented inter-agency transfer to Harborview Medical Center for 22 days of involuntary hold, forced antipsychotics (Haloperidol, Risperdal), leather restraints, and an invasive spinal tap.',
    contextualOrigins: 'King County was experiencing converging public health crises: a record surge in syphilis and neurosyphilis alongside a 15% resurgence in tuberculosis cases. When Lozenich was transferred from jail, hospital staff immediately initiated speculative infectious-disease protocols (TB chest X-rays and neurosyphilis spinal taps) and psychiatric chemical restraints, despite lab panels showing 95% neutrophils (contradicting neurosyphilis) and negative viral panels.',
    backgroundSummary: 'Following his March 8 release, Lozenich returned on March 10 to collect belongings and check on his missing neighbor Toby. An unfamiliar woman answered the door claiming to be Toby. After receiving $40 from his roommate upstairs with permission, Lozenich was arrested one block away by three officers—including an unidentified individual in full military camouflage gear—and detained in an undisclosed fenced lot for an hour prior to booking.',
    narrativeSummary: 'At the March 11 arraignment, a stand-in defender raised RCW 10.77 competency rather than evaluating the consent evidence. The competency hearing was cancelled on March 22. On March 24, charges were dismissed for incompetency and referred for 71.05 evaluation. Immediately upon jail release in street clothes, police handcuffed him, drove him in a windowless animal-control style vehicle to Harborview ER, where nurses and officers forcibly injected him with Haloperidol and strapped him into leather restraints, causing a severe 2-hour dystonic muscle reaction. Apple Health ordered his release on April 5, but the hospital detained him until April 15.',
    proceduralCollapse: 'Competency was utilized as an administrative bypass: by substituting mental fitness evaluations for factual inquiry, the judiciary avoided investigating data breaches, electronic surveillance hardware, or unverified 911 calls. The subsequent undocumented transfer to Harborview lacked any written judicial transfer order in the release paperwork.',
    proceduralBreach: [
      'Arrest involving unidentified individual in military camouflage',
      'Undocumented 1-hour detention at fenced vehicle lot prior to booking',
      'Competency bypass invoked by stand-in counsel without client consultation',
      'Undocumented inter-agency medical transfer post-dismissal without court order',
      'Forced medication (Haloperidol, Risperdal) and physical leather restraints without informed consent',
      'Involuntary hold extended 10 days beyond insurance provider (Apple Health) discharge order'
    ],
    evidenceAndInfo: [
      'Harborview Medical Center CSF panel: FTA-ABS Reactive, VDRL Positive 1:4 with lab warning on blood contamination',
      'CSF Cell Count showing 87 nucleated cells (95% neutrophils, inconsistent with neurosyphilis lymphocytic norm)',
      'Negative infectious disease panels: Varicella PCR, HSV-1/2 PCR, TB PCR, AFB cultures, COVID PCR (x2)',
      'Apple Health denial of medical necessity and release recommendation dated April 5, 2021',
      'Order to redact competency evaluation dated March 22, 2021 obtained via e-services'
    ],
    constitutionalViolations: [
      {
        amendment: 'Fourth Amendment',
        violation: 'Transfer and detention to psychiatric facility without documented court order.'
      },
      {
        amendment: 'Medical Battery & Due Process',
        violation: 'Forced administration of psychotropic medication and physical restraint without informed consent or Sell v. United States judicial scrutiny.'
      },
      {
        amendment: 'Sixth Amendment',
        violation: 'Complete deprivation of legal counsel during critical transport, medical restraint, and commitment phases.'
      },
      {
        amendment: 'Fourteenth Amendment',
        violation: 'Arbitrary deprivation of liberty extending 10 days past Apple Health’s formal release recommendation.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Competency Bypass Mechanism',
        manifestation: 'Public defender invoked mental health evaluations to avoid investigating exculpatory facts.'
      },
      {
        vector: 'Unreviewable Inter-Agency Transfers',
        manifestation: 'Lack of mandatory cross-agency documentation allowing jail-to-hospital handoffs without judicial signatures.'
      },
      {
        vector: 'Diagnostic Inflation',
        manifestation: 'Severe psychiatric and infectious diagnoses (AIDS, Neurosyphilis, Sepsis) assigned without confirmatory lab testing.'
      }
    ],
    interactionModel: 'Closed top-down institutional hierarchy where legal inquiries were abruptly shifted into clinical dominance, rendering the citizen a passive compliance object while diagnostic labels replaced constitutional review.',
    proposedReforms: [
      'Require documented, reviewable judicial signatures for all post-dismissal medical transfers.',
      'Enforce strict legal thresholds and independent hearings before chemical or physical restraint in hospitals.',
      'Prohibit competency declarations from halting necessary evidentiary discovery in criminal proceedings.',
      'Establish independent forensic reviews for claims of technological harassment rather than immediate psychiatric dismissal.'
    ],
    systemicVariables: {
      arrestModality: 'Unidentified Camouflage Personnel + Fenced Lot Gap',
      clinicalNarrative: 'Speculative Neurosyphilis & Involuntary Antipsychotic Regimen',
      competencyStatus: 'Competency Invoked to Dismiss Without Trial',
      dataContext: 'Regional TB & Neurosyphilis Crisis Overlap',
      primaryTechnology: 'Electrometer (E-Meter) & Frequency Hardware',
      targetedPhenomena: 'V2K Intrusions & Microchip Examination Claim'
    },
    associatedDocs: [
      {
        id: 'doc-658959-1',
        title: 'Harborview CSF Spinal Tap Lab Report (March 27-April 7, 2021)',
        type: 'medical',
        date: '2021-04-07',
        fileSize: '890 KB',
        summary: 'Complete CSF panel displaying 95% neutrophil count, reactive FTA-ABS, and negative TB/viral panels.'
      },
      {
        id: 'doc-658959-2',
        title: 'Seattle Municipal Court Dismissal & 71.05 Order',
        type: 'docket',
        date: '2021-03-24',
        fileSize: '410 KB',
        summary: 'Dismissal by reason of incompetency and referral for 72-hour evaluation.'
      },
      {
        id: 'doc-658959-3',
        title: 'Apple Health Discharge Directive',
        type: 'filing',
        date: '2021-04-05',
        fileSize: '280 KB',
        summary: 'Official insurer recommendation stating hospitalization was no longer medically necessary.'
      }
    ],
    tags: ['Medical Battery', 'Competency Bypass', 'Harborview', 'Forced Medication', 'Spinal Tap', 'Due Process']
  },
  {
    id: '660121',
    caseNumber: '660121',
    title: 'The City of Seattle vs. Shane Lozenich',
    court: 'Seattle Municipal Court',
    cause: 'Violation of No Contact Order',
    judge: 'Faye Chess',
    attorney: 'Elizabeth Mustin',
    incarcerationDates: '05/15/2021 – 05/17/2021',
    incarcerationDuration: '2 Days',
    disposition: 'Case Dismissed — Unexecuted Dismiss & Refer to Mental Health Court',
    status: 'Dismissed',
    year: 2021,
    headlineQuote: '"Seattle Police Union Files Grievance to Block January 6 Investigation Records"',
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    executiveSummary: 'Case No. 660121 illustrates how technical database synchronization failures can produce unlawful custodial actions. On May 15, 2021, Lozenich was arrested after walking to his former residence to retrieve important mail following a text message invitation from the homeowner. The arrest was executed because an expired protective order was erroneously flagged as active in state databases. The court dismissed the case but issued a "Dismiss and Refer" order to Mental Health Court that was never executed.',
    contextualOrigins: 'Occurring during Seattle’s remote court operations, database synchronization lags between municipal and county systems generated false warrant alerts. Simultaneously, six off-duty Seattle Police Department officers who attended the January 6 DC rally were under investigation by the Office of Police Accountability (OPA), while SPOG filed grievances and sued to conceal officer identities—forming a stark contrast with the hyper-visibility and tactical pursuits faced by civilians.',
    backgroundSummary: 'Lozenich received a text message from his former roommate stating important mail had arrived in the mailbox. Upon finding the mailbox empty and no answer at the doors, Lozenich walked toward the bus stop. An officer pulled alongside; suffering trauma from prior arrests, Lozenich ran into a hotel parking lot. Multiple police cruisers surrounded him with emergency lights in a high-speed containment maneuver.',
    narrativeSummary: 'The arresting officers cited a 911 call from a "neighbor," even though the actual homeowners had been missing for months. Although Lozenich had the homeowner’s text message in hand, officers arrested him on an expired order. At the May 17 hearing, parties re-used the redacted competency evaluation from March 2021 (Case 658959) without new evaluation, issuing a "Dismiss and Refer" disposition that was never carried out.',
    proceduralCollapse: 'Automated database execution replaced human verification. Officers deployed tactical containment for a non-violent misdemeanor without verifying order status or exculpatory text invitations. Post-release, the referral was never scheduled, leaving an active arrest trace in public repositories.',
    proceduralBreach: [
      'Arrest executed on expired, misclassified order without human confirmation',
      'Unverified 911 caller identity; failure to investigate missing homeowner reports',
      'Tactical escalation and multi-vehicle pursuit disproportionate under Graham v. Connor',
      'Re-use of outdated competency evaluation to avoid examining text message proof',
      'Administrative failure: Mental Health Court referral never executed, leaving defendant in limbo'
    ],
    evidenceAndInfo: [
      'Text message log from former roommate inviting Lozenich to retrieve mail',
      'Seattle Municipal Court case disposition: Dismissed without prejudice under prior competency',
      'Records of OPA investigation into Jan 6 SPD officers and SPOG public disclosure lawsuits',
      'Database logs demonstrating delayed synchronization between municipal and county dockets'
    ],
    constitutionalViolations: [
      {
        amendment: 'Fourth Amendment',
        violation: 'Unlawful arrest and custodial seizure based entirely on a clerical database error.'
      },
      {
        amendment: 'Equal Protection',
        violation: 'Automatic psychiatric redirection of valid factual defenses and disparate enforcement.'
      },
      {
        amendment: 'Record Integrity',
        violation: 'Persistence of false criminal arrest records in state repositories following dismissal.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Automated Custodial Triggers',
        manifestation: 'Executing high-stakes tactical arrests based on automated database flags without human-in-the-loop review.'
      },
      {
        vector: 'Data Sync Vulnerabilities',
        manifestation: 'Cross-database lag between municipal courts and police dispatch causing expired orders to show active.'
      },
      {
        vector: 'Administrative Limbo',
        manifestation: 'Entering "Dismiss & Refer" orders that are never executed, leaving permanent administrative residue.'
      }
    ],
    interactionModel: 'Automated trigger deployment: an unverified database flag initiated immediate tactical force, misinterpreting trauma-induced flight as criminal non-compliance.',
    proposedReforms: [
      'Mandate human-in-the-loop verification before executing arrests on automated protective order flags.',
      'Enforce quarterly cross-checks and instant synchronization between municipal and county court databases.',
      'Require automatic public release of body-worn camera footage and dispatch logs for all dismissed cases.',
      'Establish a Digital Rights Ombudsman to investigate database error harms.'
    ],
    systemicVariables: {
      triggerMechanism: 'Database Misclassification of Expired Protective Order',
      tacticalDeployment: 'Multi-Vehicle Containment Maneuver',
      dataContext: 'OPA Investigation of SPD Officers / SPOG Anonymity Lawsuits',
      competencyStatus: 'Competency Evaluation Reused from Previous Case',
      targetedPhenomena: 'Voice-to-Skull (V2K) Physical Harm & Auditory Distress'
    },
    associatedDocs: [
      {
        id: 'doc-660121-1',
        title: 'Police Incident & Booking Report (Case 660121)',
        type: 'police_report',
        date: '2021-05-15',
        fileSize: '520 KB',
        summary: 'Incident report detailing tactical containment and 911 call from unidentified neighbor.'
      },
      {
        id: 'doc-660121-2',
        title: 'Exculpatory Text Message Invitation Record',
        type: 'filing',
        date: '2021-05-14',
        fileSize: '190 KB',
        summary: 'Verified text message from property owner instructing Lozenich to retrieve mail.'
      }
    ],
    tags: ['Database Error', 'Tactical Escalation', 'SPOG Jan 6 Context', 'Dismiss & Refer Limbo', '4th Amendment']
  },
  {
    id: '21-1-04347-2',
    caseNumber: '21-1-04347-2 SEA',
    title: 'The State of Washington vs. Shane Lozenich',
    court: 'King County Superior Court',
    cause: 'Felony Harassment, Felony Telephone Harassment (Cyberstalking), Felony Threats to Bomb or Injure Property',
    judge: 'Karen Donohue (primary); Melinda Young (restoration order)',
    attorney: 'Amy Parker (Public Defender)',
    incarcerationDates: '07/23/2021 – 01/05/2022 (and ongoing to 2026)',
    incarcerationDuration: '5.5 Months Incarceration + Inpatient Restoration',
    disposition: 'Case Pending — Competency Restored February 2026 (Dr. Jamie Leavey)',
    status: 'Case Pending',
    year: 2021,
    headlineQuote: '"Seattle Officers Seek Anonymity in Supreme Court Case Tied to Jan. 6 Rally Attendance"',
    coverImage: 'https://images.unsplash.com/photo-1697237089826-331838962a04?q=80&w=377&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    executiveSummary: 'Case No. 21-1-04347-2 SEA represents one of the most structurally revealing entries in the archive. Originating from a July 23, 2021 arrest by unidentified agents in unmarked vehicles in downtown Seattle, the case escalated into felony harassment and cyberstalking charges. On September 13, 2021, Judge Melinda Young issued a 45-day inpatient restoration order without a competency evaluation and without defense counsel present. By February 2026, forensic evaluator Dr. Jamie Leavey determined competency was restored, completely reversing the state’s multi-year clinical narrative.',
    contextualOrigins: 'The case unfolded amidst national security instability: a 56% rise in US explosive incidents (1,876 bomb threats in 2021) and a 50% global surge in cyberattacks. Locally, Lozenich’s personal accounts were compromised in the WA State unemployment data breach. While Seattle police officers sought Supreme Court protection to shield their identities following the Jan. 6 Capitol rally, Lozenich was arrested by unmarked agents without badges—a structural inversion where state actors claimed anonymity while the citizen was subjected to hyper-visibility.',
    backgroundSummary: 'While walking to a friend’s house near Columbia St & 4th Ave, two unmarked vehicles pulled up. Agents grabbed Lozenich, took his backpack, administered no Miranda warnings, and pulled a photocopy of an older stranger’s passport and Social Security card from their pockets, claiming it was found in his bag. His phone was seized without a search warrant. The Motion for Probable Cause listed then-Mayor Jenny Durkan’s office and Detective Ryan Ellis as protected parties.',
    narrativeSummary: 'Public defender Amy Parker advised raising competency rather than proceeding to trial. On Sept 13, 2021, an inpatient restoration order was signed by Judge Young referencing a phantom evaluation on August 31 with no defense signature ("approved on record"). In November 2021, Lozenich was transferred to Western State Hospital, forcibly given a COVID booster and 20mg olanzapine based on an administrative 2017 food stamp interview. He completed the program early and was declared restored in January 2022, yet the case remained stalled until 2026.',
    proceduralCollapse: 'Clinical framing was systematically substituted for evidentiary adjudication. Competency proceedings replaced probable cause scrutiny, search warrant requirements, and constitutional challenges. Research documenting institutional vulnerabilities was categorized as "delusional themes" or "grandiosity" in a diagnostic loop designed to protect institutional actors.',
    proceduralBreach: [
      'Arrest executed by unidentified agents with no badges in unmarked vehicles',
      'No Miranda rights administered at any stage (Fifth Amendment breach)',
      'Warrantless seizure and forensic extraction of mobile phone',
      'Fabricated/misattributed personal documents (passport photocopy) introduced into evidence',
      '45-day restoration order issued without formal hearing, counsel, or completed evaluation',
      'Revolving-door public defenders preventing continuous adversarial defense'
    ],
    evidenceAndInfo: [
      'Dr. Jamie Leavey Forensic Competency Evaluation (February 2026) declaring competency restored',
      'Motion for Probable Cause listing Seattle Mayor’s Office & Det. Ryan Ellis as protected parties',
      'Court order signed by Judge Melinda Young with "approved on record" in place of defense signature',
      'Western State Hospital clinical intake citing 2017 DSHS food stamp appointment as psychiatric justification',
      'Device traceroutes showing unauthorized network routing across international nodes'
    ],
    constitutionalViolations: [
      {
        amendment: 'Fourth Amendment',
        violation: 'Unlawful arrest by unidentified agents and warrantless seizure of personal digital devices.'
      },
      {
        amendment: 'Fifth Amendment',
        violation: 'Failure to administer Miranda rights during custodial interrogation.'
      },
      {
        amendment: 'Sixth Amendment',
        violation: 'Absence of defense counsel during restoration order issuance; multi-year denial of speedy trial.'
      },
      {
        amendment: 'Fourteenth Amendment',
        violation: 'Restoration order issued without hearing, clinical evaluation, or statutory compliance.'
      },
      {
        amendment: 'Evidence Integrity',
        violation: 'Introduction of third-party passport documents defendant never possessed.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Administrative Substitution',
        manifestation: 'Repurposing competency proceedings to systematically suspend constitutional protections.'
      },
      {
        vector: 'Narrative Inversion',
        manifestation: 'Reframing institutional opacity and security vulnerabilities as personal threats attributed to defendant.'
      },
      {
        vector: 'Diagnostic Looping',
        manifestation: 'Archival research into public data breaches reinterpreted by state evaluators as "grandiosity".'
      },
      {
        vector: 'Anonymity Privilege Asymmetry',
        manifestation: 'State actors invoke judicial anonymity while the accused is rendered hyper-visible.'
      }
    ],
    interactionModel: 'Unilateral institutional authority: state actors imposed psychiatric labels while structurally excluding all factual counter-evidence, maintaining equilibrium through administrative delay.',
    proposedReforms: [
      'Codify arrest transparency standards: prohibit unidentified arresting agents and unmarked vehicle felony seizures.',
      'Mandate search warrants for all digital device extractions and chain-of-custody audits for personal documents.',
      'Prohibit pre-signing of judicial restoration orders and require defense counsel presence at all hearings.',
      'Establish public continuance registries to prevent cases exceeding one year from remaining in silent limbo.'
    ],
    systemicVariables: {
      arrestModality: 'Unidentified Agents / Unmarked Vehicles',
      evidenceStatus: 'Warrantless Device Seizure & Document Misattribution',
      restorationOrder: 'Signed Without Hearing or Defense Signature',
      clinicalNarrative: 'Retroactive Justification → Provisional Diagnosis → Restored Competency (2026)',
      competencyStatus: 'Competency Restored Feb 2026',
      dataContext: 'WA State Unemployment Breach & Jan 6 Officer Anonymity Contrast'
    },
    associatedDocs: [
      {
        id: 'doc-211-1',
        title: 'Forensic Competency Evaluation (Dr. Jamie Leavey, Feb 2026)',
        type: 'medical',
        date: '2026-02-11',
        fileSize: '1.4 MB',
        summary: 'Official psychiatric evaluation finding Lozenich competent, highly engaged, and ready for trial.'
      },
      {
        id: 'doc-211-2',
        title: 'Restoration Commitment Order (Judge Melinda Young)',
        type: 'docket',
        date: '2021-09-13',
        fileSize: '620 KB',
        summary: 'Court order issued without defense counsel signature or formal hearing.'
      }
    ],
    tags: ['Felony Case', 'Competency Restored 2026', 'Unidentified Agents', 'Western State Hospital', 'Jan 6 Anonymity']
  },
  {
    id: '22-1-04242-3',
    caseNumber: '22-1-04242-3 SEA',
    title: 'The State of Washington vs. Shane Lozenich',
    court: 'King County Superior Court',
    cause: 'Felony Threats Against The Governor (Jay Inslee)',
    judge: 'Michael Scott',
    attorney: 'Jordan Murov-Goodman (and multiple rotations)',
    incarcerationDates: '08/10/2022 – 05/05/2023',
    incarcerationDuration: '10 Months Pretrial Incarceration Without Trial',
    disposition: 'Case Pending — Conditional Release / OCRP (Competency Restored Feb 2026)',
    status: 'Case Pending',
    year: 2022,
    headlineQuote: '"Inslee is Incompetent and Not Running for Re-election"',
    coverImage: 'https://images.unsplash.com/photo-1581309558346-f325181f9df6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    executiveSummary: 'Case No. 22-1-04242-3 SEA stands as a primary example of how political sensitivity, psychiatric overreach, and administrative churn can suspend a defendant in extended legal limbo for over three years without a trial, conviction, or plea. The charge was based on an alleged threatening voicemail left for Governor Jay Inslee. Throughout years of litigation, the prosecution has never produced the central piece of evidence—the voicemail recording or verified transcription.',
    contextualOrigins: 'The prosecution of an ambiguous voicemail to a public official stood in sharp contrast to concurrent events: on January 6, 2021, 100-125 protesters broke through the Governor’s Mansion perimeter fence in Olympia with zero arrests made on scene. This asymmetry reveals a political double standard: remote speech was aggressively prosecuted as a felony while physical breach of executive property went unpunished.',
    backgroundSummary: 'On August 10, 2022, a man claiming to be a county social worker knocked on Lozenich’s apartment door. When Lozenich stepped into the hallway 20 minutes later, he was ambushed by men in mixed police and military attire who handcuffed him without showing a warrant or administering Miranda warnings, interrogating him in the public hallway before driving him to jail.',
    narrativeSummary: 'During his 10 months in jail, Lozenich fell ill from contaminated water and was brutally assaulted by an ex-Marine cellmate, suffering a fractured nose and head injuries. The jail placed Lozenich in solitary confinement but never pressed charges against the attacker. Public defenders rotated continuously, raising competency issues whenever trial approached. On May 5, 2023, he was released on credit for time served—serving a full sentence without trial—while the case remained pending.',
    proceduralCollapse: 'Procedural machinery operated administratively rather than judicially: arrest → arraignment → competency order → restoration → continuances → no trial. By framing environmental trauma as psychiatric symptoms, the state bypassed speedy trial mandates and suppressed discovery production.',
    proceduralBreach: [
      'Ambush arrest by mixed police/military units without warrant or Miranda warning',
      'Unlawful interrogation in apartment building hallway without counsel',
      'Pre-signed 45-day restoration order dated before the scheduled hearing',
      'Non-production of central voicemail evidence/transcription across 3+ years',
      'Severe Eighth Amendment violations: contaminated jail water and unaddressed violent assault in cell'
    ],
    evidenceAndInfo: [
      'Absence of voicemail audio recording or certified transcript in discovery',
      'King County Jail medical incident report documenting fractured nose from cellmate assault',
      'Washington State Patrol public records regarding Governor’s Mansion Jan 6 non-arrest policy',
      'Dr. Jamie Leavey February 2026 evaluation confirming full trial competence'
    ],
    constitutionalViolations: [
      {
        amendment: 'Sixth Amendment',
        violation: 'Deprivation of right to a speedy trial; 10 months pretrial detention and 3+ years open case without trial.'
      },
      {
        amendment: 'Eighth Amendment',
        violation: 'Cruel and unusual punishment: exposure to contaminated jail water and unaddressed physical battery resulting in broken nose.'
      },
      {
        amendment: 'Equal Protection',
        violation: 'Selective prosecution of phone speech vs. complete non-enforcement at Governor’s Mansion fence breach.'
      },
      {
        amendment: 'Fifth Amendment',
        violation: 'Custodial interrogation in public hallway without Miranda warnings.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Representation Instability',
        manifestation: 'Revolving door of public defenders preventing any continuous adversarial defense.'
      },
      {
        vector: 'Information Asymmetry',
        manifestation: 'Sustaining felony charges while withholding foundational audio evidence.'
      },
      {
        vector: 'Labor-Detention Overlap',
        manifestation: 'Detention windows coinciding with King County Corrections Guild collective bargaining cycles.'
      }
    ],
    interactionModel: 'Closed-loop administrative stalling: treating unproven accusations as permanent baseline truth while ignoring defense discovery requests and cycling through competency reviews.',
    proposedReforms: [
      'Enforce hard 90-day statutory limits on pretrial competency delays, requiring dismissal if audio evidence is withheld.',
      'Ban pre-signing of judicial orders prior to open court hearings.',
      'Special counsel review for prosecutions involving high-ranking state officials to prevent selective enforcement.',
      'Mandatory health and safety audits for detention facilities under extended pretrial confinement.'
    ],
    systemicVariables: {
      arrestModality: 'Mixed Police/Military Hallway Ambush',
      evidenceStatus: 'Central Voicemail Transcription Unproduced',
      restorationOrder: 'Pre-Signed Restoration Order Prior to Hearing',
      competencyStatus: 'Competency Restored 2026 (Dr. Leavey)',
      tacticalDeployment: 'Militarized Arrest in Private Apartment Building',
      dataContext: 'Governor Mansion Jan 6 Breach Selective Enforcement'
    },
    associatedDocs: [
      {
        id: 'doc-221-1',
        title: 'King County Jail Incident Report (Cellmate Assault & Fractured Nose)',
        type: 'medical',
        date: '2022-11-14',
        fileSize: '780 KB',
        summary: 'Medical record documenting facial trauma, fractured nose, and solitary confinement assignment.'
      },
      {
        id: 'doc-221-2',
        title: 'Washington State Patrol Jan 6 Governor Mansion Incident Brief',
        type: 'filing',
        date: '2021-01-07',
        fileSize: '450 KB',
        summary: 'WSP official statement detailing non-arrest decision during executive mansion perimeter breach.'
      }
    ],
    tags: ['Governor Threat Charge', 'Missing Evidence', 'Speedy Trial Breach', 'Jail Assault', 'Equal Protection']
  },
  {
    id: '22-1-04247-3',
    caseNumber: '22-1-04247-3 SEA',
    title: 'The State of Washington vs. Shane Lozenich',
    court: 'King County Superior Court',
    cause: 'Alleged Criminal Threat — Disputed Communication',
    judge: 'Michael Scott',
    incarcerationDates: '08/10/2022 – 05/05/2023',
    incarcerationDuration: 'Part of 2022 Threat-Case Cluster',
    disposition: 'Prolonged Administrative Limbo — No Trial, Plea, or Dismissal',
    status: 'Case Pending',
    year: 2022,
    headlineQuote: '"Administrative Momentum Replacing Constitutional Due Process"',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    executiveSummary: 'Case No. 22-1-04247-3 SEA reflects the same structural logic as its companion cases, functioning as another node in the system’s pattern of converting low-threshold, context-dependent speech into administratively sustained criminal exposure without corroborating evidence or a clearly identified victim.',
    contextualOrigins: 'Within the Demopocrisy architecture, this case reinforces the systemic logic where politically sensitive or inconvenient speech is redirected into psychiatric channels, allowing the state to maintain control without meeting evidentiary burdens.',
    backgroundSummary: 'Originating from the same 2022 enforcement window, the matter was characterized by public defender turnover, incomplete discovery, and early clinical framing that prevented any meaningful adjudication on the merits.',
    narrativeSummary: 'The narrative follows a familiar trajectory: a single ambiguous statement was elevated to a criminal threat allegation without corroborating evidence; the case immediately shifted into procedural stalling mechanisms; competency concerns were raised despite no documented behavioral instability.',
    proceduralCollapse: 'The system substituted process for proof, delay for adjudication, and clinical narrative for constitutional analysis.',
    proceduralBreach: [
      'Elevation of ambiguous statement into felony charges without corroborating proof',
      'Delayed discovery and refusal to provide audio recordings',
      'Use of continuous administrative resets to avoid trial'
    ],
    evidenceAndInfo: [
      'Superior Court docket showing repeated continuance orders',
      'Notice of non-production of electronic communications discovery'
    ],
    constitutionalViolations: [
      {
        amendment: 'Sixth Amendment',
        violation: 'Denial of right to speedy trial and stable defense representation.'
      },
      {
        amendment: 'Fourteenth Amendment',
        violation: 'Sustaining criminal exposure over multiple years without factual proof.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Continuance Inflation',
        manifestation: 'Using serial court continuances to maintain an open case without evidentiary burden.'
      },
      {
        vector: 'Psychiatric Redirection',
        manifestation: 'Funneling low-threshold speech into psychiatric containment models.'
      }
    ],
    interactionModel: 'One-directional flow of authority where prosecutors and court acted on unverified interpretations while client explanations were excluded.',
    proposedReforms: [
      'Mandatory evidence production within 30 days of filing.',
      'Public registry for continuances exceeding one year.'
    ],
    systemicVariables: {
      clinicalNarrative: 'Speech Reframed as Psychiatric Symptom',
      competencyStatus: 'Handled under omnibus competency calendars'
    },
    associatedDocs: [
      {
        id: 'doc-22147-1',
        title: 'King County Superior Court Docket Extract (22-1-04247-3)',
        type: 'docket',
        date: '2024-12-03',
        fileSize: '310 KB',
        summary: 'Omnibus calendar entries and continuance records.'
      }
    ],
    tags: ['Threat Cluster', 'Administrative Delay', 'Due Process Vacuum', 'Continuances']
  },
  {
    id: '25-2-17456-5',
    caseNumber: '25-2-17456-5 SEA',
    title: 'SCIDpda Bush Residential, LLC vs. Shane Lozenich',
    court: 'King County Superior Court (Housing/Civil)',
    cause: 'Unlawful Detainer / Eviction',
    judge: 'Jennifer Petersen',
    incarcerationDates: 'N/A (Eviction Proceeding following 10-mo incarceration)',
    incarcerationDuration: 'Civil Eviction Action',
    disposition: 'Full Satisfaction of Judgment Filed January 7, 2026 (Case Closed)',
    status: 'Judgement Satisfied',
    year: 2025,
    headlineQuote: '"Retaliatory Eviction Served 8 Days After KIRO News Safety Broadcast"',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    executiveSummary: 'Case No. 25-2-17456-5 SEA illustrates the convergence of housing instability, administrative noncooperation, and retaliatory timing within a mixed-income affordable housing Public Development Authority (SCIDpda). Following a 10-month incarceration gap, rent arrears accumulated. Third-party aid from Telecare Corp. was actively blocked by management refusing to provide invoices. After Lozenich appeared in a KIRO News interview advocating for nighttime neighborhood security, eviction paperwork was served within 8 days.',
    contextualOrigins: 'The defendant occupied an affordable housing unit at the historic Bush Hotel under SCIDpda oversight. The property was bound by the Seattle-Bremerton Majorat Covenant, a recorded real estate instrument providing ancestral rights and prohibiting arbitrary governmental interference. The case reveals how public housing authorities can use expedited summary eviction courts to bypass tenant protections.',
    backgroundSummary: 'While in jail, Telecare Corp. approached Lozenich to pay off back rent. Upon release in May 2023, the building manager refused to provide an invoice or accept Telecare’s funds. Lozenich paid rent plus $250/month independently, saving all money order receipts. Management ignored receipts, issued a rent-increase notice (typically indicating lease renewal), and abruptly served an unlawful detainer after the televised KIRO News safety interview.',
    narrativeSummary: 'Lozenich filed pro se motions under CR 60(b) for Relief from Default Judgment citing excusable neglect due to incarceration, lack of statutory notice, and retaliatory motives. He also filed a Motion to Stay and Injunction based on Majorat Covenant authority. The matter formally concluded on January 7, 2026 when a Full Satisfaction of Judgment was filed.',
    proceduralCollapse: 'Unlawful Detainer courts operate as expedited summary proceedings insulated from tenant counter-claims, sidelining landlord bad faith, refusal of rental relief funds, and underlying land covenant claims.',
    proceduralBreach: [
      'Refusal of certified third-party emergency rental relief funds (Telecare Corp)',
      'Returning valid money orders and fabricating non-payment status',
      'Issuing misleading rent-increase notice as pretext before eviction filing',
      'Retaliatory eviction timing: served 8 days after KIRO News public safety interview',
      'Systemic evasion of recorded Seattle-Bremerton Majorat Covenant terms'
    ],
    evidenceAndInfo: [
      'Receipts for all monthly money orders submitted under repayment plan',
      'Telecare Corp correspondence confirming building management refused billing invoices',
      'Transcript and video record of KIRO News neighborhood security broadcast (June 3, 2024)',
      'Recorded Seattle-Bremerton Majorat Covenant and ancestral lineage trust filings',
      'Full Satisfaction of Judgment document filed January 7, 2026'
    ],
    constitutionalViolations: [
      {
        amendment: 'First Amendment / Tenant Rights',
        violation: 'Retaliatory eviction following protected public speech regarding community safety.'
      },
      {
        amendment: 'Fair Housing Mandates',
        violation: 'Breach of HUD affordable housing requirements by blocking third-party rental assistance.'
      },
      {
        amendment: 'Duty to Mitigate',
        violation: 'Landlord’s refusal to accept third-party aid constitutes failure to mitigate damages.'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'PDA Governance Gap',
        manifestation: 'Public Development Authorities operating with quasi-governmental power but avoiding discovery lines.'
      },
      {
        vector: 'Carceral Reproduction Loop',
        manifestation: 'Incarceration causes job loss → rent arrears → landlord blocks aid → eviction → homelessness.'
      }
    ],
    interactionModel: 'Administrative obstruction: management refused dialogue, returned payments, and leveraged expedited court mechanisms to displace tenant before counter-evidence could be evaluated.',
    proposedReforms: [
      'Bar Public Development Authorities from summary Unlawful Detainer without administrative fact-finding hearings.',
      'Mandate acceptance of certified third-party agency assistance funds with civil penalties for refusal.',
      'Establish mandatory public disclosure logs for all PDA operations and accounts.',
      'Strengthen anti-retaliation protections following media engagement or public testimony.'
    ],
    systemicVariables: {
      retaliatoryTrigger: 'KIRO News Broadcast on CID Safety (June 3, 2024)',
      landStatus: 'Seattle-Bremerton Majorat Covenant / Bush Hotel 1918 Lineage',
      operationalPretext: 'Refusal of Telecare Third-Party Funds',
      triggerMechanism: 'Summary Unlawful Detainer Filing'
    },
    associatedDocs: [
      {
        id: 'doc-252-1',
        title: 'Full Satisfaction of Judgment (Case 25-2-17456-5)',
        type: 'filing',
        date: '2026-01-07',
        fileSize: '410 KB',
        summary: 'Official court certification closing eviction action upon satisfaction.'
      },
      {
        id: 'doc-252-2',
        title: 'Telecare Corp. Assistance Block Correspondence',
        type: 'filing',
        date: '2023-10-18',
        fileSize: '360 KB',
        summary: 'Case manager records detailing SCIDpda refusal to supply billing invoices for grant funds.'
      }
    ],
    tags: ['Eviction', 'SCIDpda', 'Retaliatory Timing', 'KIRO News', 'Telecare Block', 'Majorat Covenant']
  },
  {
    id: '26-2-01443-4',
    caseNumber: '26-2-01443-4 SEA',
    title: 'Shane Lozenich vs. The State of Washington',
    court: 'King County Superior Court',
    cause: 'Quiet Title Action & Declaratory Judgment — Seattle-Bremerton Majorat',
    judge: 'King County Superior Court Bench',
    incarcerationDates: 'N/A (Petitioner-Led Structural Action)',
    incarcerationDuration: 'Affirmative Action',
    disposition: 'Active Comprehensive Civil Action / Injunction Request',
    status: 'Under Investigation',
    year: 2026,
    headlineQuote: '"A Jurisdictional Challenge and Structural Indictment of Quasi-Governmental Immunity"',
    coverImage: 'https://images.unsplash.com/photo-1731450626260-0ca05713fdd7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    executiveSummary: 'Case No. 26-2-01443-4 SEA is a Quiet Title and Declaratory Judgment action filed in January 2026 that flips the polarity of the entire archive: Shane Lozenich acts as petitioner, challenging the State of Washington and quasi-governmental entities (Port of Seattle, 4Culture, KCRHA) over the historically referenced Seattle-Bremerton Majorat—a sovereign security corridor valued at $200-250 billion USD.',
    contextualOrigins: 'The action coincided with the April 2026 forensic audit of the King County Regional Homelessness Authority (KCRHA), which exposed $13 million in unaccounted public funds, a negative cash position of $44.7 million, and led to City and County Council resolutions to dissolve the agency. This collapse validates the petition’s claim that quasi-governmental entities operate under improper indemnity shields (RCW 39.34) without constitutional accountability.',
    backgroundSummary: 'The petition asserts hereditary estate rights rooted in the House of Hohenstein lineage, encompassing the I-5/SR-99 corridor from downtown Seattle to Bremerton Naval Base. It integrates a Memorandum of Understanding and Offer for Tenancy in Common (TIC) with the Swedish Armed Forces (SAF/FMLOG) for strategic logistics, cyber defense, and critical infrastructure resilience.',
    narrativeSummary: 'The filing reframes the preceding 5 years of criminal charges, involuntary medical holds, and eviction actions not as isolated events, but as symptoms of a compromised jurisdictional environment where administrative layering shields state actors while weaponizing transparency against the heir.',
    proceduralCollapse: 'Quasi-governmental authorities have operated under Interlocal Agreements (ILAs) and bond covenants that bypass constitutional limits, suppress civil rights, and create shadow jurisdictions.',
    proceduralBreach: [
      'Unlawful utilization of quasi-governmental indemnity shields under RCW 39.34',
      'Systemic exclusion of recorded restrictive land covenants running with the land',
      'Failure of civilian and military authorities (Puget Sound Naval Shipyard IG) to investigate V2K and network intrusion claims, creating a jurisdictional vacuum'
    ],
    evidenceAndInfo: [
      'KCRHA Forensic Audit Report (2021-2025) detailing $13M unaccounted funds and $44.7M deficit',
      'King County Cultural Development Authority (4Culture) Charter liability limitation analysis',
      'Memorandum of Understanding & Tenancy in Common Offer to Swedish Armed Forces (FMLOG)',
      'Asset Valuation Report detailing $211-258 Billion structural asset baseline'
    ],
    constitutionalViolations: [
      {
        amendment: 'Constitutional Supremacy',
        violation: 'Subordinating constitutional guarantees to administrative interlocal agreements and liability shields.'
      },
      {
        amendment: 'Cognitive Liberty & Human Rights',
        violation: 'Failure to protect bodily and cognitive autonomy under international law (Nuremberg Code, UN CAT).'
      }
    ],
    systemicVulnerabilities: [
      {
        vector: 'Quasi-Governmental Immunity Shields',
        manifestation: 'Entities like KCRHA, 4Culture, and Port of Seattle operating outside direct municipal liability.'
      },
      {
        vector: 'Jurisdictional Vacuums',
        manifestation: 'Civilian and military authorities disclaiming responsibility for technologically mediated harms.'
      }
    ],
    interactionModel: 'Macro-legal corrective strategy: forcing judicial adjudication of foundational title, governance legitimacy, and administrative accountability.',
    proposedReforms: [
      'Establish a clear probate pathway in Superior Court to verify hereditary majorat status under RCW 11.02.',
      'Refine covenant enforcement standards to give full effect to recorded sovereignty provisions.',
      'Mandate forensic investigations for empirical evidence of digital and auditory harassment.',
      'Increase transparency and dissolve compromised quasi-governmental development authorities.'
    ],
    systemicVariables: {
      landStatus: 'Seattle-Bremerton Sovereign Security Corridor ($200-250B Valuation)',
      dataContext: 'KCRHA $13M Forensic Audit & 4Culture Charter Immunity Analysis',
      triggerMechanism: 'Quiet Title & Declaratory Judgment Petition'
    },
    associatedDocs: [
      {
        id: 'doc-262-1',
        title: 'Memorandum of Understanding to Swedish Armed Forces (Oct 2025)',
        type: 'filing',
        date: '2025-10-09',
        fileSize: '1.1 MB',
        summary: 'Official MOU and TIC offer defining 4 operational pillars for infrastructure resilience.'
      },
      {
        id: 'doc-262-2',
        title: 'Seattle-Bremerton Majorat Asset Valuation Dossier',
        type: 'filing',
        date: '2025-12-01',
        fileSize: '1.8 MB',
        summary: 'Comprehensive valuation breakdown of Seattle core, transit, and maritime assets ($211-258B).'
      }
    ],
    tags: ['Quiet Title', 'Majorat', 'Sovereign Corridor', 'KCRHA Audit', 'Swedish Armed Forces', 'Constitutional Challenge']
  }
];

export const initialTimelineEvents: TimelineEvent[] = [
  {
    id: 't-2020-01',
    date: 'Autumn / Winter 2020',
    title: 'The WA State Auditor Data Breach & Stalking Escalation',
    category: 'context',
    summary: 'The Washington State Auditor’s Office suffers an Accellion data breach compromising 1.6M residents. Lozenich receives threatening location-specific messages.',
    details: 'During the COVID-19 pandemic, Lozenich was renting a room from a high school music teacher in Seattle. Around this time, the state data breach occurred. Lozenich experienced access lockouts on email and Google Drive, followed by threatening texts from strangers describing his clothing and real-time movements in detail.',
    anomaly: 'State agencies failed to investigate the digital breach and spoofing reports.'
  },
  {
    id: 't-2021-01',
    date: 'Late 2020 / Early 2021',
    title: 'Unexplained Audio Hardware & Onset of V2K Sensations',
    category: 'medical',
    summary: 'Roommate orders specialized AV frequency equipment. Lozenich reports severe cranial migraines, high-frequency vibrations, and auditory voices.',
    details: 'Roommate ordered equipment including an electrometer (E-meter), switchboards, and frequency devices. Lozenich began experiencing severe headaches, intense jaw pain, and taunting external voices that sounded like neighbors. Physical confrontations with the roommate ensued, including an unprovoked bite while showering and a knife threat by a guest.',
    anomaly: 'Seattle Police refused to file domestic battery reports citing COVID precinct closures.'
  },
  {
    id: 't-2021-02',
    date: 'February 24, 2021',
    title: 'Temporary Protection Order Issued',
    caseRef: '658931',
    category: 'court',
    summary: 'Roommate files a domestic violence protection petition; deputies serve eviction notice.',
    details: 'While Lozenich’s 911 reports were ignored, the roommate obtained a protective order. Deputies served the order and Lozenich stayed in a hotel for a week before returning believing his rental lease remained in effect.',
    location: 'Seattle Residence'
  },
  {
    id: 't-2021-03',
    date: 'March 7–8, 2021',
    title: 'First Arrest & "No Complaint Filed" Dismissal',
    caseRef: '658931',
    category: 'arrest',
    summary: 'Arrested in bed for alleged NCO violation. Held overnight in King County Jail; case dismissed due to no complaint filed.',
    details: 'Two SPD officers entered his bedroom on March 7 and arrested him (Booking #221002695). At the March 8 hearing, Judge Catherine McDowall dismissed the case because the City Attorney filed no criminal complaint. An unconstitutional arrest record remained active in state repositories.',
    anomaly: 'Defendant held in custody for 24 hours without any formal charging document.'
  },
  {
    id: 't-2021-04',
    date: 'March 10, 2021',
    title: 'Second Arrest: Unidentified Camouflage Unit & Fenced Lot',
    caseRef: '658959',
    category: 'arrest',
    summary: 'Arrested after borrowing $40 from roommate with consent. Detained 1 hour in unmarked fenced police lot.',
    details: 'Lozenich visited the residence to collect items and borrowed $40 cash with consent. Walking back from buying food, he was arrested by officers including an unidentified individual in full military camouflage named "Heiffer". They drove him north to an undisclosed fenced vehicle compound before booking him downtown.',
    anomaly: 'Undocumented 1-hour detention gap in military-adjacent secure vehicle lot.'
  },
  {
    id: 't-2021-05',
    date: 'March 11–24, 2021',
    title: 'Competency Diversion in Municipal Court',
    caseRef: '658959',
    category: 'court',
    summary: 'Stand-in public defender raises competency to bypass factual review. Charges dismissed for incompetency.',
    details: 'At arraignment, defense counsel Elizabeth Mustin raised RCW 10.77 competency rather than evaluating roommate consent. On March 24, all criminal charges were dismissed without prejudice by reason of incompetency and referred for a 72-hour 71.05 evaluation.',
    anomaly: 'Competency evaluation utilized to dismiss criminal charges without factual inquiry.'
  },
  {
    id: 't-2021-06',
    date: 'March 24 – April 15, 2021',
    title: 'Harborview Hospital Involuntary Hold & Forced Medication',
    caseRef: '658959',
    category: 'medical',
    summary: '22-day involuntary psychiatric hold without court order in release paperwork. Forced Haloperidol and Risperdal.',
    details: 'Transferred in handcuffs from jail in street clothes with no court order attached. Staff forcibly injected him with Haloperidol and Risperdal while strapped in leather bed restraints, triggering a violent 2-hour acute dystonic muscle spasm. Unexplained chest X-rays led to speculative TB and neurosyphilis diagnoses, followed by high-dose penicillin and a lumbar puncture. Apple Health ordered release on April 5, but hospital detained him until April 15.',
    anomaly: 'Forced psychotropic injections, leather restraints, and 10 days of detention beyond insurer discharge order.'
  },
  {
    id: 't-2021-07',
    date: 'May 15–17, 2021',
    title: 'Third Arrest: Mail Retrieval & Database Misclassification',
    caseRef: '660121',
    category: 'arrest',
    summary: 'Arrested retrieving mail based on roommate text invite. Database sync error flagged expired order as active.',
    details: 'After receiving a text confirming important mail in the mailbox, Lozenich checked the empty mailbox. While walking away, police approached. Fleeing due to trauma, he was surrounded by multiple cruisers in a tactical containment maneuver. Court dismissed the case under prior competency, issuing an unexecuted "Dismiss and Refer" order.',
    anomaly: 'Tactical arrest triggered entirely by municipal database clerical error.'
  },
  {
    id: 't-2021-08',
    date: 'July 23, 2021 – January 5, 2022',
    title: 'Felony Arrest by Unidentified Agents & Western State Hospital',
    caseRef: '21-1-04347-2',
    category: 'arrest',
    summary: 'Ambushed in downtown Seattle by unmarked vehicles. 45-day restoration order signed without hearing or defense counsel.',
    details: 'Unmarked cars intercepted Lozenich on Columbia St. Agents without badges seized his phone without warrant and produced a stranger’s passport photocopy. On Sept 13, Judge Melinda Young signed a restoration order without hearing or defense signature. At Western State Hospital, he was forcibly medicated with 20mg olanzapine based on a 2017 food stamp appointment. Released in January 2022 after completing program early.',
    anomaly: 'Restoration order issued without a hearing, evaluation, or defense counsel present.'
  },
  {
    id: 't-2022-01',
    date: 'March 30–31, 2022',
    title: 'Fourth Arrest: Overnight Detention Without Complaint',
    caseRef: '664676',
    category: 'arrest',
    summary: 'Arrested leaving for groceries with roommate’s verbal consent. No complaint filed; dismissed overnight.',
    details: 'While leaving for the grocery store with his roommate Brian (who confirmed Lozenich had permission to stay), police arrested Lozenich stating court orders override private consent. Held overnight without counsel, scheduled morning hearing stricken, and dismissed at 1:30 PM with no complaint filed.',
    anomaly: 'Overnight jail detention executed during police union recruitment bonus negotiations.'
  },
  {
    id: 't-2022-02',
    date: 'August 10, 2022 – May 5, 2023',
    title: 'Governor Voicemail Felony Case & 10-Month Pretrial Detention',
    caseRef: '22-1-04242-3',
    category: 'arrest',
    summary: 'Ambushed at Bush Hotel apartment. Charged with threatening Gov. Jay Inslee. Held 10 months without trial.',
    details: 'Arrested outside his apartment by mixed police and military-style personnel without warrant or Miranda warning. Held for 10 months in King County Jail. Suffered broken nose during assault by ex-Marine cellmate and illness from contaminated jail water. State never produced voicemail audio or transcript in discovery. Released May 5, 2023 on time-served credits with case still pending.',
    anomaly: 'Ten months of pretrial detention without trial on an unproduced voicemail recording.'
  },
  {
    id: 't-2024-01',
    date: 'June 3–11, 2024',
    title: 'KIRO News Broadcast & Retaliatory Eviction Service',
    caseRef: '25-2-17456-5',
    category: 'housing',
    summary: 'Lozenich interviewed on KIRO News regarding neighborhood security. Eviction lawsuit served 8 days later.',
    details: 'Lozenich appeared on KIRO News advocating for nighttime safety in Chinatown-ID. Eight days later, SCIDpda served an unlawful detainer complaint, despite Telecare Corp having offered to pay all arrears and Lozenich possessing money order receipts.',
    anomaly: 'Eviction proceeding initiated 8 days after protected public speech on broadcast television.'
  },
  {
    id: 't-2026-01',
    date: 'January 7–8, 2026',
    title: 'Eviction Satisfied & Quiet Title Sovereign Claim Filed',
    caseRef: '26-2-01443-4',
    category: 'court',
    summary: 'Full Satisfaction of Judgment closes eviction. Lozenich files Quiet Title action over Seattle-Bremerton Majorat.',
    details: 'On Jan 7, 2026, Full Satisfaction of Judgment was filed closing the housing case. On Jan 8, Lozenich filed Case 26-2-01443-4 SEA in Superior Court, challenging quasi-governmental immunity (Port of Seattle, 4Culture, KCRHA) and asserting hereditary Majorat stewardship.',
    location: 'King County Superior Court'
  },
  {
    id: 't-2026-02',
    date: 'February 11, 2026',
    title: 'Forensic Competency Restored by Dr. Jamie Leavey',
    caseRef: '21-1-04347-2',
    category: 'milestone',
    summary: 'Official psychiatric evaluation finds Lozenich fully competent to stand trial with zero active psychotic symptoms.',
    details: 'Dr. Jamie Leavey of the Office of Forensic Mental Health Services issued a formal opinion confirming Lozenich understands all proceedings, can assist counsel, and completed outpatient restoration—formally reversing 5 years of state competency stalling.',
    anomaly: 'Official clinical confirmation that defendant is fully trial-ready after multi-year psychiatric containment.'
  }
];

export const initialNetworkNodes: NetworkNode[] = [
  // Cases
  { id: 'c-21-1-04347-2', label: 'Case 21-1-04347-2 SEA (Felony Harassment)', type: 'case', degree: 15, betweenness: 0.0000, closeness: 0.311, reach: 0.352, reachEfficiency: 0.022, categoryName: 'Legal Case', description: 'Primary felony case with widest institutional reach (35.2%), connecting 6 agencies, 5 failure modes, and 3 reforms.' },
  { id: 'c-664676', label: 'Case 664676 (Order Violation / Economic Churn)', type: 'case', degree: 12, betweenness: 0.0000, closeness: 0.245, reach: 0.278, reachEfficiency: 0.021, categoryName: 'Legal Case', description: 'Overnight detention case with sole root-cause link to police union economic incentivization.' },
  { id: 'c-658959', label: 'Case 658959 (Harborview Involuntary Hold)', type: 'case', degree: 11, betweenness: 0.0000, closeness: 0.245, reach: 0.296, reachEfficiency: 0.025, categoryName: 'Legal Case', description: 'Highest reach efficiency (0.025) in entire network; rapid cascade from criminal dismissal to involuntary hospitalization.' },
  { id: 'c-22-1-04242-3', label: 'Case 22-1-04242-3 SEA (Governor Threats)', type: 'case', degree: 11, betweenness: 0.0000, closeness: 0.236, reach: 0.278, reachEfficiency: 0.023, categoryName: 'Legal Case', description: 'Political prosecution track; 10 months pretrial detention with unproduced central voicemail evidence.' },
  { id: 'c-658931', label: 'Case 658931 (No Complaint Filed)', type: 'case', degree: 9, betweenness: 0.0000, closeness: 0.179, reach: 0.204, reachEfficiency: 0.020, categoryName: 'Legal Case', description: 'Foundational pandemic-era due process failure; arrest without criminal complaint.' },
  { id: 'c-660121', label: 'Case 660121 (Database Sync Error)', type: 'case', degree: 9, betweenness: 0.0000, closeness: 0.179, reach: 0.204, reachEfficiency: 0.020, categoryName: 'Legal Case', description: 'Tactical arrest triggered by database misclassification of expired protective order.' },
  { id: 'c-scidpda', label: 'Case SCIDpda-2026 (Unlawful Detainer)', type: 'case', degree: 7, betweenness: 0.0000, closeness: 0.132, reach: 0.148, reachEfficiency: 0.019, categoryName: 'Legal Case', description: 'Housing eviction action following KIRO News broadcast and blocked third-party rent funds.' },
  
  // Agencies
  { id: 'a-spd', label: 'Seattle Police Department (SPD)', type: 'agency', degree: 9, betweenness: 0.0040, closeness: 0.057, reach: 0.074, categoryName: 'Enforcement Agency', description: 'Sole structural bridge in the entire network (betweenness 0.0040). Main bottleneck between arrest, prosecution, and courts.' },
  { id: 'a-kc-jail', label: 'King County Jail', type: 'agency', degree: 6, betweenness: 0.0007, closeness: 0.019, reach: 0.037, categoryName: 'Correctional Facility', description: 'Secondary bridge (betweenness 0.0007). Central detention hub for 5 cases.' },
  { id: 'a-smc', label: 'Seattle Municipal Court', type: 'agency', degree: 4, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Judicial Body', description: 'Municipal court handling misdemeanor dockets and unexecuted competency referrals.' },
  { id: 'a-kcsc', label: 'King County Superior Court', type: 'agency', degree: 4, betweenness: 0.0004, closeness: 0.019, reach: 0.037, categoryName: 'Judicial Body', description: 'Tertiary bridge (betweenness 0.0004). Connects felony flow to competency and OCRP.' },
  { id: 'a-kcpo', label: 'King County Prosecutor’s Office', type: 'agency', degree: 3, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Prosecution Agency', description: 'Prosecutorial agency with zero outbound connections; passive recipient of case pressure.' },
  { id: 'a-ocrp', label: 'Outpatient Competency Restoration (OCRP)', type: 'agency', degree: 3, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'State Program', description: 'DSHS state outpatient competency restoration program used to sustain multi-year supervision.' },
  { id: 'a-harborview', label: 'Harborview Medical Center', type: 'agency', degree: 2, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Medical Institution', description: 'Involuntary psychiatric and medical detention center for Case 658959.' },
  { id: 'a-wsh', label: 'Western State Hospital', type: 'agency', degree: 2, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Psychiatric Hospital', description: 'State psychiatric hospital for inpatient restoration commitments.' },
  { id: 'a-scidpda-org', label: 'SCIDpda (Public Development Authority)', type: 'agency', degree: 3, betweenness: 0.0000, closeness: 0.019, reach: 0.037, categoryName: 'Housing Authority', description: 'Quasi-governmental housing authority managing Bush Hotel apartments.' },
  { id: 'a-gov-office', label: 'Washington Governor’s Office', type: 'agency', degree: 2, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Executive Body', description: 'Protected party in Case 22-1-04242-3.' },
  { id: 'a-mayor-office', label: 'Seattle Mayor’s Office', type: 'agency', degree: 1, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Executive Body', description: 'Protected party in Case 21-1-04347-2.' },
  { id: 'a-telecare', label: 'Telecare Corporation', type: 'agency', degree: 2, betweenness: 0.0000, closeness: 0.000, reach: 0.019, categoryName: 'Support Organization', description: 'Accredited third-party rental relief organization blocked by landlord.' },

  // Failure Modes
  { id: 'fm-opacity', label: 'Institutional Opacity (FM)', type: 'failure_mode', degree: 3, categoryName: 'Structural Pathology', description: 'Highest indegree (3) failure mode; connects felony cyberstalking, political prosecution, and housing tracks.' },
  { id: 'fm-admin-sub', label: 'Administrative Substitution (FM)', type: 'failure_mode', degree: 3, categoryName: 'Structural Pathology', description: 'Endemic competency pipeline mechanism: clinical labels substituted for evidentiary review in 3 cases.' },
  { id: 'fm-diag-loop', label: 'Diagnostic Looping (FM)', type: 'failure_mode', degree: 2, categoryName: 'Clinical Capture', description: 'Recycling previous diagnostic labels to justify continuing restrictions without current justification.' },
  { id: 'fm-no-complaint', label: 'No Complaint Filed (FM)', type: 'failure_mode', degree: 2, categoryName: 'Procedural Breakdown', description: 'Custodial arrest executed without timely prosecutorial complaint in Cases 658931 and 664676.' },
  { id: 'fm-v2k-dismiss', label: 'Technological Harassment Dismissal (FM)', type: 'failure_mode', degree: 2, categoryName: 'Unremediated Claim', description: 'Automatic dismissal of V2K and digital harassment reports as psychiatric symptoms.' },
  { id: 'fm-db-lag', label: 'Database Lag / Misclassification (FM)', type: 'failure_mode', degree: 1, categoryName: 'Technical Failure', description: 'Data sync error between courts and police triggering wrongful arrest in Case 660121.' },
  { id: 'fm-econ-incent', label: 'Economic Incentivization of Detention (FM)', type: 'failure_mode', degree: 1, categoryName: 'Root Cause', description: 'The SOLE identified Root Cause in the network: detention data leveraging union recruitment bonuses.' },

  // Reforms
  { id: 'rf-competency', label: 'Competency Oversight Reform (RF)', type: 'reform', degree: 3, categoryName: 'Priority 1 - Critical', description: 'Highest indegree (3) reform: independent review board for restoration orders and limits on psychiatric substitution.' },
  { id: 'rf-realtime-track', label: 'Real-Time Digital Tracking (RF)', type: 'reform', degree: 2, categoryName: 'Priority 1 - Critical', description: 'Mandate digital tracking linking jail bookings directly to prosecutor queues with auto-release triggers.' },
  { id: 'rf-db-purge', label: 'Cross-Database Purge Protocols (RF)', type: 'reform', degree: 2, categoryName: 'Priority 2 - High', description: 'Automatic cross-database synchronization upon case dismissal to purge false records.' },
  { id: 'rf-dig-evidence', label: 'Digital Evidence Protocols (RF)', type: 'reform', degree: 2, categoryName: 'Priority 2 - High', description: 'Mandatory warrants for digital device extractions and 30-day evidence production limits.' },
  { id: 'rf-transparency', label: 'Transparency Safeguards (RF)', type: 'reform', degree: 2, categoryName: 'Priority 2 - High', description: 'Public disclosure when unidentified agents make arrests and public registry for continuances.' },
  { id: 'rf-med-sig', label: 'Judicial Signature Requirements (RF)', type: 'reform', degree: 1, categoryName: 'Priority 3 - Moderate', description: 'Mandate written judicial orders for all inter-agency medical transfers post-dismissal.' }
];

export const initialNetworkEdges: NetworkEdge[] = [
  // Cases to Agencies
  { id: 'e1', source: 'c-658931', target: 'a-spd', type: 'Involves entity' },
  { id: 'e2', source: 'c-658931', target: 'a-kc-jail', type: 'Involves entity' },
  { id: 'e3', source: 'c-658931', target: 'a-smc', type: 'Involves entity' },
  
  { id: 'e4', source: 'c-658959', target: 'a-spd', type: 'Involves entity' },
  { id: 'e5', source: 'c-658959', target: 'a-kc-jail', type: 'Involves entity' },
  { id: 'e6', source: 'c-658959', target: 'a-smc', type: 'Involves entity' },
  { id: 'e7', source: 'c-658959', target: 'a-harborview', type: 'Involves entity' },
  
  { id: 'e8', source: 'c-660121', target: 'a-spd', type: 'Involves entity' },
  { id: 'e9', source: 'c-660121', target: 'a-kc-jail', type: 'Involves entity' },
  { id: 'e10', source: 'c-660121', target: 'a-smc', type: 'Involves entity' },
  
  { id: 'e11', source: 'c-21-1-04347-2', target: 'a-spd', type: 'Involves entity' },
  { id: 'e12', source: 'c-21-1-04347-2', target: 'a-kc-jail', type: 'Involves entity' },
  { id: 'e13', source: 'c-21-1-04347-2', target: 'a-kcsc', type: 'Involves entity' },
  { id: 'e14', source: 'c-21-1-04347-2', target: 'a-wsh', type: 'Involves entity' },
  { id: 'e15', source: 'c-21-1-04347-2', target: 'a-ocrp', type: 'Involves entity' },
  { id: 'e16', source: 'c-21-1-04347-2', target: 'a-mayor-office', type: 'Involves entity' },

  { id: 'e17', source: 'c-22-1-04242-3', target: 'a-spd', type: 'Involves entity' },
  { id: 'e18', source: 'c-22-1-04242-3', target: 'a-kc-jail', type: 'Involves entity' },
  { id: 'e19', source: 'c-22-1-04242-3', target: 'a-kcsc', type: 'Involves entity' },
  { id: 'e20', source: 'c-22-1-04242-3', target: 'a-ocrp', type: 'Involves entity' },
  { id: 'e21', source: 'c-22-1-04242-3', target: 'a-gov-office', type: 'Involves entity' },

  { id: 'e22', source: 'c-664676', target: 'a-spd', type: 'Involves entity' },
  { id: 'e23', source: 'c-664676', target: 'a-kc-jail', type: 'Involves entity' },
  { id: 'e24', source: 'c-664676', target: 'a-smc', type: 'Involves entity' },

  { id: 'e25', source: 'c-scidpda', target: 'a-scidpda-org', type: 'Involves entity' },
  { id: 'e26', source: 'c-scidpda', target: 'a-telecare', type: 'Involves entity' },
  { id: 'e27', source: 'c-scidpda', target: 'a-kcsc', type: 'Involves entity' },

  // Agency to Agency breakdowns
  { id: 'e28', source: 'a-spd', target: 'a-kcpo', type: 'Suffers procedural breakdown', label: 'Zero Feedback Loop' },
  { id: 'e29', source: 'a-spd', target: 'a-smc', type: 'Suffers procedural breakdown', label: 'Database Lag' },
  { id: 'e30', source: 'a-kcsc', target: 'a-ocrp', type: 'Sustains structural gap', label: 'Competency Loop' },
  { id: 'e31', source: 'a-scidpda-org', target: 'a-telecare', type: 'Suffers procedural breakdown', label: 'Refusal of Aid' },

  // Cases to Failure Modes
  { id: 'e32', source: 'c-658931', target: 'fm-no-complaint', type: 'Exposes systemic flaw' },
  { id: 'e33', source: 'c-658959', target: 'fm-admin-sub', type: 'Exposes systemic flaw' },
  { id: 'e34', source: 'c-658959', target: 'fm-v2k-dismiss', type: 'Exposes systemic flaw' },
  { id: 'e35', source: 'c-660121', target: 'fm-db-lag', type: 'Exposes systemic flaw' },
  { id: 'e36', source: 'c-21-1-04347-2', target: 'fm-opacity', type: 'Exposes systemic flaw' },
  { id: 'e37', source: 'c-21-1-04347-2', target: 'fm-admin-sub', type: 'Exposes systemic flaw' },
  { id: 'e38', source: 'c-21-1-04347-2', target: 'fm-diag-loop', type: 'Exposes systemic flaw' },
  { id: 'e39', source: 'c-22-1-04242-3', target: 'fm-opacity', type: 'Exposes systemic flaw' },
  { id: 'e40', source: 'c-22-1-04242-3', target: 'fm-admin-sub', type: 'Exposes systemic flaw' },
  { id: 'e41', source: 'c-22-1-04242-3', target: 'fm-diag-loop', type: 'Exposes systemic flaw' },
  { id: 'e42', source: 'c-664676', target: 'fm-no-complaint', type: 'Exposes systemic flaw' },
  { id: 'e43', source: 'c-664676', target: 'fm-econ-incent', type: 'Root cause mechanism', label: 'Root Cause' },
  { id: 'e44', source: 'c-scidpda', target: 'fm-opacity', type: 'Exposes systemic flaw' },

  // Cases to Reforms
  { id: 'e45', source: 'c-658959', target: 'rf-competency', type: 'Remedied by' },
  { id: 'e46', source: 'c-21-1-04347-2', target: 'rf-competency', type: 'Remedied by' },
  { id: 'e47', source: 'c-22-1-04242-3', target: 'rf-competency', type: 'Remedied by' },
  { id: 'e48', source: 'c-658931', target: 'rf-realtime-track', type: 'Remedied by' },
  { id: 'e49', source: 'c-664676', target: 'rf-realtime-track', type: 'Remedied by' },
  { id: 'e50', source: 'c-660121', target: 'rf-db-purge', type: 'Remedied by' },
  { id: 'e51', source: 'c-658931', target: 'rf-db-purge', type: 'Remedied by' },
  { id: 'e52', source: 'c-21-1-04347-2', target: 'rf-dig-evidence', type: 'Remedied by' },
  { id: 'e53', source: 'c-658959', target: 'rf-dig-evidence', type: 'Remedied by' },
  { id: 'e54', source: 'c-21-1-04347-2', target: 'rf-transparency', type: 'Remedied by' },
  { id: 'e55', source: 'c-22-1-04242-3', target: 'rf-transparency', type: 'Remedied by' },
  { id: 'e56', source: 'c-658959', target: 'rf-med-sig', type: 'Remedied by' }
];

export const initialEvidence: EvidenceDocument[] = [
  {
    id: 'ev-001',
    title: 'Harborview Medical Center CSF Spinal Tap Laboratory Findings',
    docNumber: 'HMC-LAB-2021-0329',
    category: 'Medical & Lab',
    date: '2021-03-29',
    entity: 'Harborview Medical Center',
    classification: 'Medical Record',
    summary: 'Spinal fluid panel showing 95% neutrophils, reactive FTA-ABS, positive VDRL 1:4 with laboratory warning on blood-brain barrier disruption, and negative TB/viral PCRs.',
    content: `LABORATORY REPORT - CEREBROSPINAL FLUID (CSF)
Patient: Shane Lozenich | DOB: 1980 | Service Date: 03/27/2021 - 04/07/2021
Ordering Facility: Seattle Municipal Court 71.05 Referral / Harborview Inpatient

1. SEROLOGY & TREPONEMAL ASSAYS:
- CSF VDRL: Positive ("Serology: Positive !") Titer: 1:4
- FTA-ABS (Treponemal Antibody): Reactive ("FTA Result, CSF: Reactive !")
* LAB INTERPRETIVE WARNING: "Detection of antibodies in the CSF may suggest CNS infection. However, these results are unable to distinguish between intrathecal antibodies and serum antibodies introduced into the CSF at the time of lumbar puncture or from blood-brain barrier breakdown."

2. CELL COUNT & DIFFERENTIAL:
- Nucleated Cells: 87 cells/uL (Elevated)
- Polymorphonuclear Neutrophils: 95% (CRITICAL CONTRADICTION: Neurosyphilis classically presents with lymphocytic predominance; 95% neutrophils is indicative of acute bacterial inflammation or traumatic tap)
- RBC Count: 0 cells/uL (No frank blood contamination)
- CSF Glucose: 62 mg/dL (Normal)
- CSF Protein: 47 mg/dL (Mild elevation)

3. INFECTIOUS VIRAL & BACTERIAL PANELS (ALL NEGATIVE):
- Varicella Zoster PCR: None Detected
- HSV-1 / HSV-2 PCR: None Detected
- Tuberculosis (TB) PCR: Negative
- Acid-Fast Bacilli (AFB) Culture: Negative
- COVID-19 PCR (x2): Negative

4. CLINICAL OBSERVATIONS & DIAGNOSTIC INFLATION:
Problem list updated to include: Neurosyphilis (Principal), AIDS (No confirmatory HIV Ab/viral load lab on record), Psychosis, Sepsis due to unknown organism.
Administered: Penicillin G Potassium IV q4h x 14d, Haloperidol 5mg BID, Risperdal, Benztropine.`,
    sourceRef: 'Harborview Clinical Records Archive (Master Report pp. 148, 151-160)',
    verified: true,
    fileSize: '890 KB',
    tags: ['CSF Lab', 'Neurosyphilis Contradiction', '95% Neutrophils', 'Informed Consent', 'Harborview']
  },
  {
    id: 'ev-002',
    title: 'Dr. Jamie Leavey Forensic Psychiatric Evaluation & Competency Restoration',
    docNumber: 'DSHS-OFMHS-2026-0211',
    category: 'Court Dockets',
    date: '2026-02-11',
    entity: 'Office of Forensic Mental Health Services (DSHS)',
    classification: 'Forensic Log',
    summary: 'Official psychiatric evaluation concluding that Shane Lozenich is competent to stand trial, understands legal charges, is highly engaged, and has no active psychotic symptoms.',
    content: `STATE OF WASHINGTON - OFFICE OF FORENSIC MENTAL HEALTH SERVICES
COMPETENCY EVALUATION REPORT
In re: Shane Jonathan Lozenich | Cause Nos: 21-1-04347-2 SEA & 22-1-04242-3 SEA
Evaluator: Jamie Leavey, Psy.D., Forensic Evaluator

SUMMARY OF CLINICAL FINDINGS:
1. Trial Competence: Mr. Lozenich demonstrated a comprehensive understanding of the adversarial nature of court proceedings, the specific roles of the judge, prosecutor, and defense counsel, and the available legal defenses.
2. Cognitive Engagement: Evaluator notes Mr. Lozenich is "highly engaged, demonstrating an ability to retain complex legal information and assist in his own defense."
3. Absence of Psychosis: No active psychotic symptoms observed during formal evaluation. Clinical presentation in early remission with adherence to voluntary outpatient regimen (Citalopram, Naltrexone).
4. Procedural Implication: Formally concludes the defendant possesses the legal capacity to proceed to trial, reversing prior 2021-2022 clinical assessments used to justify restorative containment.`,
    sourceRef: 'King County Superior Court E-Filed Records',
    verified: true,
    fileSize: '1.4 MB',
    tags: ['Competency Restored', 'Dr. Leavey', 'Trial Readiness', 'DSHS', 'Superior Court']
  },
  {
    id: 'ev-003',
    title: 'King County Regional Homelessness Authority (KCRHA) Forensic Audit',
    docNumber: 'KC-AUDIT-2026-KCRHA',
    category: 'Property & Deeds',
    date: '2026-04-28',
    entity: 'King County Auditor & City Council Oversight',
    classification: 'Public Record',
    summary: 'Independent forensic audit uncovering $13 million in unaccounted public funds, a $44.7M negative cash balance, and administrative failures within KCRHA.',
    content: `FORENSIC AUDIT OF THE KING COUNTY REGIONAL HOMELESSNESS AUTHORITY (2021-2025)
Released: April 2026

KEY FINDINGS:
1. Unreconciled Funding: Approximately $13,000,000 in public tax appropriations could not be reconciled or accounted for by independent auditors.
2. Negative Cash Position: Agency reached a peak negative cash deficit of -$44.7 million during the audit period due to unauthorized commitments and lack of internal controls.
3. Legislative Dissolution: Seattle City Councilmember Maritza Rivera and King County Councilmember Rod Dembowski introduced companion resolutions to dissolve KCRHA.
4. Jurisdictional Relevance: Cited in Case 26-2-01443-4 SEA as proof that quasi-governmental municipal corporations operate under improper indemnity shields (RCW 39.34) without constitutional accountability.`,
    sourceRef: 'Seattle City Council Legislative Records',
    verified: true,
    fileSize: '2.1 MB',
    tags: ['KCRHA Audit', '$13M Unaccounted', 'Quasi-Government', 'Dissolution Resolution', 'RCW 39.34']
  },
  {
    id: 'ev-004',
    title: 'Network Forensics: iPhone XR Traceroutes and Anomaly Logs',
    docNumber: 'NET-TRACE-2021-LOGS',
    category: 'Network Logs & Traceroutes',
    date: '2021-07-20',
    entity: 'Independent Network Analysis & Telecom Correspondence',
    classification: 'Forensic Log',
    summary: 'Traceroute data logs and IP routing diagrams showing anomalous packet transit from device nodes through unverified intermediate hops.',
    content: `NETWORK FORENSICS DATA LOG & TRACEROUTE AUDIT
Device: Apple iPhone XR | Submitter: Shane Lozenich | Target: Global Routing Nodes

ANALYSIS OF INTERMEDIATE HOPS:
Hop 1: 192.168.1.1 (Local Gateway)
Hop 2: 10.144.0.1 (ISP Local Aggregation - Seattle, WA)
Hop 3: Obfuscated Node [Sub-second routing to residential IP in Manhattan, NY]
Hop 4: Secondary Relay [Seattle Hardware Repair Node]
Hop 5: International Transit Interface [Anomalous latency signatures to Middle Eastern / European endpoints]

CORRESPONDENCE RECORD:
Formal submissions logged to Verizon Wireless Security Operations, King County Office of Inspector General, and FCC Technical Standards Bureau requesting forensic chain-of-custody audits.`,
    sourceRef: 'Dossier "Invisible Attacks: Personal Narratives and the Role of Technology in Modern Terror"',
    verified: true,
    fileSize: '1.6 MB',
    tags: ['Traceroutes', 'Network Logs', 'Digital Fingerprint', 'IP Routing', 'Forensics']
  },
  {
    id: 'ev-005',
    title: 'Memorandum of Understanding & Offer for Tenancy in Common (Swedish Armed Forces)',
    docNumber: 'MOU-SBM-SAF-2025-10',
    category: 'Property & Deeds',
    date: '2025-10-09',
    entity: 'Seattle-Bremerton Majorat / Swedish Armed Forces (FMLOG)',
    classification: 'Sworn Affidavit',
    summary: 'Offer for Tenancy in Common outlining 4 operational pillars for infrastructure resilience, logistics mapping, and cyber defense across the $250B Majorat corridor.',
    content: `MEMORANDUM OF UNDERSTANDING AND OFFER FOR TENANCY IN COMMON
Date: October 6-9, 2025 | Grantor: Seattle-Bremerton Majorat | Grantee: Swedish Armed Forces (FMLOG)

FOUR MUTUALLY DEPENDENT PILLARS:
I. Logistics and Supply Chain Resilience: Pre-positioning strategic reserves, mapping I-5/SR-99 transportation choke points between Port of Seattle and Bremerton Naval Base.
II. Multi-Domain Security & Counter-TFT: Joint Cyber Threat Fusion Cell monitoring anomalous traffic and establishing counter-measures against signal-based psychological operations.
III. Legal, Governance & Accountability: Operating agreements superseding restrictive covenants and establishing federally-compliant evidence preservation protocols for 250+ GB of data.
IV. Heir & Personnel Protection: Protective countermeasures and safe haven jurisdiction for Shane Jonathan Lozenich.`,
    sourceRef: 'Case 26-2-01443-4 SEA Exhibits',
    verified: true,
    fileSize: '1.1 MB',
    tags: ['Swedish Armed Forces', 'Majorat MOU', 'Sovereign Corridor', '$250B Valuation', 'FMLOG']
  },
  {
    id: 'ev-006',
    title: 'King County Jail Incident Report: Cellmate Assault & Broken Nose',
    docNumber: 'KCJ-MED-2022-1114',
    category: 'Police & Dispatch',
    date: '2022-11-14',
    entity: 'King County Department of Adult and Juvenile Detention',
    classification: 'Public Record',
    summary: 'Medical treatment logs documenting physical assault by cellmate resulting in fractured nose, facial hematomas, and solitary confinement placement.',
    content: `KING COUNTY CORRECTIONAL FACILITY - MEDICAL INCIDENT REPORT
Inmate: Lozenich, Shane | Booking #: 222008191 | Date of Incident: Fall 2022

CLINICAL REPORT:
Patient was brought to clinic following physical altercation in cell. Patient reports cellmate pulled him from top bunk and punched/choked him.
Physical Exam:
- Nasal bone deformity, active bleeding, severe edema and tenderness consistent with nasal fracture.
- Periorbital ecchymosis (bilateral).
- Multiple abrasions across neck and thorax.
Treatment:
- Ice compress, analgesics, referral to ENT/radiology. Photodocumented by medical staff.
- Patient relocated to segregation/solitary cell for victim protection. No criminal charges pressed against assailant by facility.`,
    sourceRef: 'Master Case Study Compendium (Case 22-1-04242-3 SEA)',
    verified: true,
    fileSize: '670 KB',
    tags: ['Jail Assault', 'Eighth Amendment', 'Fractured Nose', 'King County Jail', 'Solitary Confinement']
  },
  {
    id: 'ev-007',
    title: 'Washington State Patrol Jan 6 Governor Mansion Breach Policy Memo',
    docNumber: 'WSP-EXEC-2021-0106',
    category: 'Police & Dispatch',
    date: '2021-01-06',
    entity: 'Washington State Patrol',
    classification: 'Public Record',
    summary: 'WSP internal report confirming non-arrest posture during the 100+ person perimeter fence breach at Governor Jay Inslee’s Olympia executive mansion.',
    content: `WASHINGTON STATE PATROL - EXECUTIVE PROTECTION DIVISION
Incident: Governor's Mansion Perimeter Incursion | Olympia, WA | Date: January 6, 2021

SUMMARY:
A group of approximately 100 to 125 demonstrators breached the outer security perimeter gate and occupied the grounds of the Governor's Mansion.
Operational Posture:
- Decision made by command staff to make zero on-scene custodial arrests to avoid "agitating the crowd."
- Demonstrators vacated premises after several hours. Minor trespass charges referred months later for only 2-3 individuals.
Contrast Analysis: Contrasted with Case 22-1-04242-3 SEA, where an individual faced felony charges and 10 months pretrial detention for an unproduced telephone voicemail.`,
    sourceRef: 'State Patrol Public Records Archive',
    verified: true,
    fileSize: '480 KB',
    tags: ['WSP', 'Jan 6 Breach', 'Mansion Incursion', 'Selective Enforcement', 'Equal Protection']
  }
];

export const initialArticles: Article[] = [
  {
    id: 'art-001',
    title: 'Seattle Officers Seek Anonymity in Supreme Court While Whistleblowers Face Institutional Shadow',
    subtitle: 'An investigative analysis of how the highest courts shielded law enforcement identities after Jan. 6, while citizens documenting systemic cracks faced warrantless arrests.',
    author: 'Investigative Bureau',
    date: 'May 12, 2026',
    readTime: '8 min read',
    category: 'Investigative Report',
    featuredImage: 'https://images.unsplash.com/photo-1697237089826-331838962a04?q=80&w=377&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageCaption: 'King County Superior Courthouse, where parallel tracks of accountability and secrecy intersected between 2021 and 2026.',
    summary: 'While Seattle Police Officers Guild members petitioned the U.S. Supreme Court to conceal names from public records after the Jan. 6 Capitol rally, whistleblower Shane Lozenich was arrested by unmarked agents with no visible badges—exposing a profound double standard in transparency.',
    content: `When the Seattle Police Officers Guild (SPOG) moved to block the release of unredacted investigation records concerning six off-duty officers who attended the January 6, 2021 rally in Washington, D.C., they argued that public disclosure would violate their First Amendment rights and expose them to political harassment.

The Washington State Supreme Court ruled in early 2025 that officers possessed no constitutionally protected privacy interest in attending a highly publicized political event, clearing the way for public record releases. Yet the officers promptly petitioned the United States Supreme Court for a stay.

At the exact same time, across the Puget Sound corridor, a starkly opposite standard was being applied to citizens who sought transparency from local government.

### The Inversion of Transparency

In Case No. 21-1-04347-2 SEA, Shane Jonathan Lozenich was arrested on July 23, 2021 on Columbia Street in downtown Seattle. The arresting personnel emerged from unmarked vehicles, wore no uniform insignia, displayed no visible badges, and failed to administer Miranda warnings. When arresting officers seized Lozenich's mobile phone without a warrant and produced photocopies of a passport he had never possessed, the state listed the Seattle Mayor's Office and Detective Ryan Ellis as "protected parties."

This juxtaposition forms what the Demopocrisy archive terms the **Nexus of Secrecy and Prosecution**:

> *"Anonymity is a high-level privilege reserved for the enforcers of the state, while transparency is weaponized to criminalize the citizen. By labeling documentation of systemic vulnerabilities as 'Cyberstalking' and 'Felony Harassment', administrative bodies successfully substitute a narrative of personal threat to conceal institutional failure."*

### Competency as a Procedural Shield

The pattern across King County courts reveals that whenever foundational evidence was weak or unproducible, prosecutors and stand-in public defenders defaulted to competency evaluations under RCW 10.77. On September 13, 2021, Judge Melinda Young authorized a 45-day inpatient restoration commitment at Western State Hospital—referencing an evaluation that was never conducted, with no defense counsel signature on the order.

By February 2026, Dr. Jamie Leavey of the Office of Forensic Mental Health Services formally concluded that Lozenich was completely competent, trial-ready, and exhibited zero active psychotic symptoms—exposing five years of clinical stalling as an administrative substitute for evidentiary trial.`,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    mediaType: 'gallery',
    relatedCases: ['21-1-04347-2', '660121', '22-1-04242-3'],
    tags: ['Jan 6 Officers', 'SPOG', 'Anonymity Privilege', 'Competency Bypass', 'Due Process'],
    isFeatured: true
  },
  {
    id: 'art-002',
    title: 'Inslee Threat Case Drifts into Year Four Without Voicemail Recording or Transcript',
    subtitle: 'How an unproduced telephone message resulted in 10 months of pretrial detention, broken bones, and three years of continuous court delays.',
    author: 'Legal Systems Audit',
    date: 'April 25, 2026',
    readTime: '6 min read',
    category: 'Legal Audit',
    featuredImage: 'https://images.unsplash.com/photo-1581309558346-f325181f9df6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageCaption: 'Executive Mansion security gates in Olympia, where hundreds breached the lawn with zero on-scene arrests on Jan 6, 2021.',
    summary: 'The felony prosecution of Shane Lozenich for an alleged voicemail left on Governor Jay Inslee’s office line has continued for over 1,300 days without the state ever producing the audio file or transcript in discovery.',
    content: `On August 10, 2022, heavily armed officers in mixed police and tactical military attire executed what records describe as an ambush arrest in the hallway of an apartment building in Seattle's Chinatown-ID. The charge: felony threats against Governor Jay Inslee.

Yet, over three years later, as the case heads toward a scheduled 2026 trial date, the single most critical piece of evidence has never been produced.

### Missing Discovery and Pretrial Confinement

Despite ten months of pretrial incarceration in King County Jail, during which Lozenich suffered a fractured nasal bone in an unprovoked cellmate assault and fell ill from contaminated jail water, the prosecution has failed to produce:
1. The original audio recording of the alleged voicemail.
2. A certified transcript of the communication.
3. Metadata or telecommunications routing verifying the originating caller ID.

When the case appeared before the bench, the judge clarified that the alleged statement was left on a general voicemail line, not received by the Governor directly.

### The Double Standard: Executive Mansion Breach

The prosecution stands in stark contrast to the Washington State Patrol's response on January 6, 2021, when 100 to 125 demonstrators breached the outer security perimeter gate at the Governor's Mansion in Olympia and occupied the lawn. State Patrol command staff ordered zero on-scene arrests to avoid "agitating the crowd."

While mass physical trespass onto executive grounds resulted in immediate de-escalation, remote phone speech was escalated into felony charges, multiple psychiatric holds, and prolonged detention without trial.`,
    audioUrl: 'https://actions.google.com/sounds/v1/emergency/police_siren.ogg',
    mediaType: 'audio',
    relatedCases: ['22-1-04242-3', '22-1-04247-3'],
    tags: ['Gov Jay Inslee', 'Missing Evidence', 'Speedy Trial', '8th Amendment', 'Selective Prosecution'],
    isFeatured: true
  },
  {
    id: 'art-003',
    title: 'Zoned for Erasure: A Forensic Audit of 911 Calls, Missing Neighbors, and Deed Scrubbing on Midvale Ave N',
    subtitle: 'Investigating the intersection of rapid property turnover, sewer line infrastructure, and municipal deed alteration in Seattle.',
    author: 'Urban Forensics Desk',
    date: 'May 04, 2026',
    readTime: '7 min read',
    category: 'Forensics',
    featuredImage: 'https://images.unsplash.com/photo-1465961482777-c1070dfd906b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageCaption: 'Single-family residences on Midvale Ave North rezoned for multi-family condominium development following sudden turnover.',
    summary: 'A detailed forensic examination of emergency 911 dispatch spikes across two residential blocks on Midvale Ave North, followed by rapid property sales, zoning conversions, and deed record alterations.',
    content: `Between 2020 and 2022, emergency dispatch records revealed an anomalous spike in 911 calls across two residential blocks on Midvale Avenue North in Seattle. Shortly after these calls—which included wellness check requests for long-standing neighbors who abruptly disappeared—multiple homes were vacated, sold in rapid succession, and rezoned from single-family parcels to high-density multi-family condos.

### The Mechanism of Property Turnover

When Shane Lozenich reported the disappearance of his next-door neighbor Toby and her children in early 2021 after hearing muffled screams and encountering unfamiliar occupants claiming to be the homeowners, police dismissed the concerns. 

Subsequent investigation uncovered key technical patterns:
- **Sewer Line Infrastructure**: Properties connected to shared secondary sewer conduits were systematically consolidated for multi-unit developer permits, while direct main-line parcels remained excluded.
- **Deed Alteration Initiatives**: County-wide initiatives positioned publicly as "scrubbing racist covenant language" from historic deeds created administrative cover for altering deed ledgers and property transfer records.
- **Competency Weaponization**: When Lozenich presented these real estate forensics during 2022 court hearings, evaluators cited his missing-neighbor documentation as primary evidence of "delusional themes" to justify incompetency findings.`,
    mediaType: 'gallery',
    relatedCases: ['658931', '25-2-17456-5'],
    tags: ['Real Estate Forensics', 'Midvale Ave N', '911 Logs', 'Deed Alteration', 'Urban Renewal']
  },
  {
    id: 'art-004',
    title: 'Acoustic Jurisprudence: The Forensic Record of V2K, Signal Ingress, and Cognitive Liberty',
    subtitle: 'Declassified defense research, electromagnetic measurements, and the legal gray zone of non-kinetic technological harassment.',
    author: 'Special Intelligence Brief',
    date: 'April 18, 2026',
    readTime: '10 min read',
    category: 'Deep Dive',
    featuredImage: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1pbmR8ZW58MHx8MHx8fDA%3D',
    imageCaption: 'Spectral analysis of anomalous electromagnetic and radio frequency fields recorded in urban residential environments.',
    summary: 'Examining the scientific basis of the microwave auditory effect (Frey effect), network device node exploitation, and why the legal system requires a "Z-Axis" Digital Bill of Rights for cognitive liberty.',
    content: `For decades, the legal frameworks governing civil liberties have operated along two physical dimensions: the protection of tangible real property (X-axis) and digital data privacy (Y-axis). However, the emergence of advanced signal technologies and neuro-invasive methods creates an urgent demand for a **Z-axis of Cognitive Liberty**—protecting the human mind and biological perception from non-consensual electromagnetic ingress.

### The Microwave Auditory Effect (Frey Effect)

Documented by the Department of Defense since the 1970s and recognized in declassified military literature, pulsed microwave radiation can induce thermoelastic expansion in brain tissue, creating audible perception without acoustic sound waves in the room.

When targeted individuals report continuous auditory harassment, sleep disruption, and sharp cranial pain, law enforcement agencies lacking technical radio-frequency meters or forensic protocols reflexively dismiss these reports as psychiatric symptoms. This creates an **Administrative Impunity Loop**:
1. Citizen reports signal-based intrusion or hardware misuse (e.g., E-meters, frequency switchboards).
2. Responding officers lack technical mandates and categorize the report as a mental health crisis.
3. The clinical classification is used in court to justify competency referrals.
4. The competency referral suspends discovery and blocks forensic investigation into the digital devices.`,
    audioUrl: 'https://actions.google.com/sounds/v1/weather/thunderstorm.ogg',
    mediaType: 'audio',
    relatedCases: ['658959', '21-1-04347-2', '664676'],
    tags: ['Acoustic Jurisprudence', 'V2K', 'Cognitive Liberty', 'Microwave Auditory Effect', 'Frey Effect']
  },
  {
    id: 'art-005',
    title: 'The Sovereign Corridor: Understanding the $250B Seattle-Bremerton Majorat and KCRHA Audit Collapse',
    subtitle: 'How historic land trusts, 4Culture charter immunities, and an international defense MOU challenge municipal overreach.',
    author: 'Economic & Governance Bureau',
    date: 'May 08, 2026',
    readTime: '9 min read',
    category: 'Legal Audit',
    featuredImage: 'https://images.unsplash.com/photo-1731450626260-0ca05713fdd7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageCaption: 'The Seattle-Bremerton maritime corridor connecting Puget Sound Naval Shipyard to the Port of Seattle.',
    summary: 'Case No. 26-2-01443-4 SEA seeks Quiet Title and Declaratory Judgment over the Seattle-Bremerton Majorat, challenging the unchecked liability shields of special-purpose municipal development authorities.',
    content: `Spanning 82.5 kilometers from downtown Seattle across the Puget Sound to the Puget Sound Naval Shipyard in Bremerton, the Seattle-Bremerton Majorat represents an interconnected infrastructure corridor valued between $211 billion and $258 billion USD.

### The KCRHA $13M Audit Crisis

In April 2026, an independent forensic audit of the King County Regional Homelessness Authority (KCRHA) uncovered that $13 million in public funding could not be reconciled, with the agency reaching a negative cash position of -$44.7 million. Seattle and King County councilmembers introduced companion legislation to dissolve the agency.

This collapse directly supports the core thesis of Case No. 26-2-01443-4 SEA: that quasi-governmental Public Development Authorities (PDAs) and interlocal entities (under RCW 39.34) have created unaccountable shadow jurisdictions that strip citizen property rights while shielding municipal governments from liability.

### International Tenancy in Common MOU

In response, the Majorat entered into a formal Memorandum of Understanding with the Swedish Armed Forces Logistics (FMLOG), establishing a framework for logistics hardening, cyber defense cells, and critical infrastructure stewardship.`,
    relatedCases: ['26-2-01443-4', '25-2-17456-5'],
    tags: ['Seattle-Bremerton Majorat', 'KCRHA Audit', 'Swedish Armed Forces', 'Quiet Title', 'RCW 39.34']
  }
];

export const initialSubmissions: UserSubmission[] = [
  {
    id: 'sub-001',
    title: 'Unfiled SPD Booking Report & Expired Warrant Alert Log',
    submitterName: 'Confidential Investigator (King County)',
    email: 'records-analyst@proton.me',
    isAnonymous: false,
    date: '2026-05-02',
    category: 'Police Dispatch Records',
    caseRef: '660121',
    description: 'Attached are CAD dispatch logs from May 15, 2021 showing that the 911 call attributed to a neighbor was generated from an unverified VoIP number, and the CAD alert for the protective order had not been updated following the April municipal dismissal.',
    attachedFileName: 'CAD_Log_May15_2021_Redacted.pdf',
    status: 'Verified',
    verificationNotes: 'Cross-checked against Seattle Municipal Court case docket #660121. Sync timestamp matches 48-hour database lag window.',
    isPublic: true
  },
  {
    id: 'sub-002',
    title: 'SCIDpda Bush Hotel Tenant Ledger & Rent Money Order Carbon Copies',
    submitterName: 'Advocacy Support Network',
    isAnonymous: true,
    date: '2026-04-20',
    category: 'Housing & Rent Records',
    caseRef: '25-2-17456-5',
    description: 'Financial proof of payment submitted to SCIDpda showing $250/month repayment checks received and endorsed by property management during 2023-2024.',
    attachedFileName: 'Money_Order_Receipts_2023_2024.pdf',
    status: 'Verified',
    verificationNotes: 'Receipt serial numbers match bank clearing records and satisfy full default claims.',
    isPublic: true
  },
  {
    id: 'sub-003',
    title: 'Public Inquiry: RF Shielding Standards for Multi-Unit Residences',
    submitterName: 'Dr. A. Chen, Bio-Acoustic Researcher',
    email: 'achen.lab@uw-bio.org',
    isAnonymous: false,
    date: '2026-05-10',
    category: 'Technical & RF Data',
    description: 'Submitting baseline RF spectrum data measured in Capitol Hill residential corridors demonstrating anomalous 2.4GHz / 5.8GHz sideband emissions above commercial baselines.',
    attachedFileName: 'RF_Spectrum_Survey_Seattle_2025.csv',
    status: 'Pending',
    verificationNotes: 'Under review by forensic technical panel.',
    isPublic: true
  }
];

export const initialComments: PublicComment[] = [
  {
    id: 'com-001',
    targetType: 'article',
    targetId: 'art-001',
    authorName: 'Legal Reform Advocate',
    date: '2026-05-13',
    content: 'The contrast between how SPOG officers were protected with anonymity while ordinary citizens faced unmarked vehicles and fabricated evidence is the most damning part of this entire archive.',
    approved: true
  },
  {
    id: 'com-002',
    targetType: 'case',
    targetId: '658959',
    authorName: 'Medical Rights Watchdog',
    date: '2026-05-11',
    content: 'A 95% neutrophil count in CSF spinal fluid is a textbook sign of bacterial meningitis or traumatic tap, NOT neurosyphilis. Prescribing high-dose Haldol and Risperdal without consent in that state is horrifying medical battery.',
    approved: true
  },
  {
    id: 'com-003',
    targetType: 'case',
    targetId: '22-1-04242-3',
    authorName: 'Constitutional Defense Counsel',
    date: '2026-05-09',
    content: 'Holding someone in jail for 10 months on a felony threat charge without ever producing the voicemail recording or transcript is a direct Sixth Amendment violation.',
    approved: true
  }
];
