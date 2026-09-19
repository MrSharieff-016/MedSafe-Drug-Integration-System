// Auto-generated from Project_SAFE_Drug_Interaction_Dataset-1.xlsx
// Source: Project SAFE Drug Interaction Dataset

export type Severity = "Major" | "Moderate" | "Minor";

export interface DrugInteraction {
  drugA: string;
  drugB: string;
  severity: Severity;
  interaction: string;
  mechanism: string;
  possibleEffect: string;
  projectAction: string;
}

export const medicationList: string[] = [
  "ACE inhibitors",
  "Alcohol",
  "Allopurinol",
  "Alprazolam",
  "Amiodarone",
  "Amoxicillin",
  "Antacid",
  "Apixaban",
  "Aspirin",
  "Atorvastatin",
  "Azathioprine",
  "Azithromycin",
  "Calcium carbonate",
  "Carbamazepine",
  "Ciprofloxacin",
  "Clarithromycin",
  "Clonazepam",
  "Clopidogrel",
  "Colchicine",
  "Diazepam",
  "Digoxin",
  "Doxycycline",
  "Erythromycin",
  "Fluconazole",
  "Fluoxetine",
  "Furosemide",
  "Ibuprofen",
  "Ketoconazole",
  "Lamotrigine",
  "Levothyroxine",
  "Lisinopril",
  "Lithium",
  "Losartan",
  "MAO inhibitor",
  "Metformin",
  "Methotrexate",
  "Metoprolol",
  "Metronidazole",
  "NSAIDs",
  "Nitroglycerin",
  "Omeprazole",
  "Opioids",
  "Oral contraceptive",
  "Oxycodone",
  "Phenytoin",
  "Potassium chloride",
  "Prednisone",
  "Rifampicin",
  "Sertraline",
  "Sildenafil",
  "Simvastatin",
  "Spironolactone",
  "Tizanidine",
  "Tramadol",
  "Trimethoprim",
  "Valproate",
  "Verapamil",
  "Warfarin"
];

export const drugInteractions: DrugInteraction[] = [
  {
    "drugA": "Warfarin",
    "drugB": "Aspirin",
    "severity": "Major",
    "interaction": "Increased bleeding risk",
    "mechanism": "Anticoagulant plus antiplatelet effect",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Warfarin",
    "drugB": "Ibuprofen",
    "severity": "Major",
    "interaction": "Increased bleeding risk",
    "mechanism": "Anticoagulant plus NSAID effects",
    "possibleEffect": "Bleeding/GI bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Sildenafil",
    "drugB": "Nitroglycerin",
    "severity": "Major",
    "interaction": "Severe hypotension risk",
    "mechanism": "Additive vasodilation",
    "possibleEffect": "Dizziness/fainting",
    "projectAction": "Avoid combination; clinical review required"
  },
  {
    "drugA": "Simvastatin",
    "drugB": "Clarithromycin",
    "severity": "Major",
    "interaction": "Increased simvastatin exposure and muscle toxicity risk",
    "mechanism": "CYP3A4 inhibition",
    "possibleEffect": "Muscle pain/weakness",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Digoxin",
    "drugB": "Amiodarone",
    "severity": "Major",
    "interaction": "Increased digoxin exposure/toxicity risk",
    "mechanism": "Reduced digoxin clearance",
    "possibleEffect": "Nausea/arrhythmia",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Methotrexate",
    "drugB": "Trimethoprim",
    "severity": "Major",
    "interaction": "Increased methotrexate toxicity",
    "mechanism": "Reduced elimination/additive antifolate effects",
    "possibleEffect": "Mouth sores/bone-marrow suppression",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Fluoxetine",
    "drugB": "Tramadol",
    "severity": "Major",
    "interaction": "Serotonin syndrome and seizure risk",
    "mechanism": "Serotonergic effects",
    "possibleEffect": "Agitation/tremor/fever",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Lithium",
    "drugB": "Ibuprofen",
    "severity": "Major",
    "interaction": "Increased lithium levels/toxicity risk",
    "mechanism": "Reduced renal lithium clearance",
    "possibleEffect": "Tremor/confusion/nausea",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Alprazolam",
    "drugB": "Oxycodone",
    "severity": "Major",
    "interaction": "Increased CNS and respiratory depression",
    "mechanism": "Additive CNS-depressant effects",
    "possibleEffect": "Excessive sedation/slow breathing",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Spironolactone",
    "drugB": "Potassium chloride",
    "severity": "Major",
    "interaction": "Hyperkalemia risk",
    "mechanism": "Additive potassium-retaining effects",
    "possibleEffect": "Weakness/arrhythmia",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "ACE inhibitors",
    "drugB": "Potassium chloride",
    "severity": "Moderate",
    "interaction": "Increased potassium levels",
    "mechanism": "Reduced aldosterone-mediated potassium excretion",
    "possibleEffect": "Hyperkalemia",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Levothyroxine",
    "drugB": "Calcium carbonate",
    "severity": "Moderate",
    "interaction": "Reduced levothyroxine absorption",
    "mechanism": "Binding in gastrointestinal tract",
    "possibleEffect": "Reduced thyroid replacement effect",
    "projectAction": "Separate administration; verify with clinician"
  },
  {
    "drugA": "Doxycycline",
    "drugB": "Antacid",
    "severity": "Moderate",
    "interaction": "Reduced doxycycline absorption",
    "mechanism": "Chelation with polyvalent cations",
    "possibleEffect": "Reduced antibiotic effect",
    "projectAction": "Separate administration; verify with clinician"
  },
  {
    "drugA": "Clopidogrel",
    "drugB": "Omeprazole",
    "severity": "Moderate",
    "interaction": "Potentially reduced clopidogrel activation",
    "mechanism": "CYP2C19 inhibition",
    "possibleEffect": "Reduced antiplatelet effect",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Rifampicin",
    "drugB": "Oral contraceptive",
    "severity": "Major",
    "interaction": "Reduced contraceptive hormone exposure",
    "mechanism": "Strong enzyme induction",
    "possibleEffect": "Reduced contraceptive effectiveness",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Carbamazepine",
    "drugB": "Erythromycin",
    "severity": "Major",
    "interaction": "Increased carbamazepine levels/toxicity risk",
    "mechanism": "CYP3A4 inhibition",
    "possibleEffect": "Dizziness/ataxia/nausea",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Furosemide",
    "drugB": "Digoxin",
    "severity": "Moderate",
    "interaction": "Increased risk of digoxin toxicity",
    "mechanism": "Electrolyte disturbances, especially low potassium",
    "possibleEffect": "Arrhythmia/nausea",
    "projectAction": "Monitor electrolytes clinically"
  },
  {
    "drugA": "Metformin",
    "drugB": "Alcohol",
    "severity": "Moderate",
    "interaction": "Increased lactic acidosis risk in susceptible patients",
    "mechanism": "Effects on lactate metabolism",
    "possibleEffect": "Weakness/nausea",
    "projectAction": "Avoid excessive alcohol; clinical review"
  },
  {
    "drugA": "Atorvastatin",
    "drugB": "Clarithromycin",
    "severity": "Major",
    "interaction": "Increased statin exposure and muscle toxicity risk",
    "mechanism": "CYP3A4 inhibition",
    "possibleEffect": "Muscle pain/weakness",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Sertraline",
    "drugB": "MAO inhibitor",
    "severity": "Major",
    "interaction": "Serotonin syndrome risk",
    "mechanism": "Excess serotonergic activity",
    "possibleEffect": "Agitation/tremor/fever",
    "projectAction": "Contraindicated combination; clinical review"
  },
  {
    "drugA": "Ciprofloxacin",
    "drugB": "Tizanidine",
    "severity": "Major",
    "interaction": "Markedly increased tizanidine exposure",
    "mechanism": "CYP1A2 inhibition",
    "possibleEffect": "Low blood pressure/sedation",
    "projectAction": "Avoid combination; clinical review required"
  },
  {
    "drugA": "Apixaban",
    "drugB": "Ketoconazole",
    "severity": "Major",
    "interaction": "Increased apixaban exposure and bleeding risk",
    "mechanism": "Strong CYP3A4/P-gp inhibition",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Aspirin",
    "drugB": "Ibuprofen",
    "severity": "Moderate",
    "interaction": "Increased GI bleeding risk",
    "mechanism": "Additive NSAID/antiplatelet effects",
    "possibleEffect": "GI pain/bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Aspirin",
    "drugB": "Clopidogrel",
    "severity": "Major",
    "interaction": "Increased bleeding risk",
    "mechanism": "Additive antiplatelet effects",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Amoxicillin",
    "drugB": "Warfarin",
    "severity": "Moderate",
    "interaction": "May increase anticoagulant effect",
    "mechanism": "Potential alteration of vitamin-K dependent coagulation",
    "possibleEffect": "Bleeding",
    "projectAction": "Monitor clinically"
  },
  {
    "drugA": "Azithromycin",
    "drugB": "Warfarin",
    "severity": "Moderate",
    "interaction": "May increase anticoagulant effect",
    "mechanism": "Possible changes in anticoagulation",
    "possibleEffect": "Bleeding",
    "projectAction": "Monitor clinically"
  },
  {
    "drugA": "Fluconazole",
    "drugB": "Warfarin",
    "severity": "Major",
    "interaction": "Increased warfarin exposure/effect",
    "mechanism": "CYP inhibition",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Fluconazole",
    "drugB": "Simvastatin",
    "severity": "Major",
    "interaction": "Increased statin exposure and muscle toxicity risk",
    "mechanism": "CYP3A4 inhibition",
    "possibleEffect": "Muscle pain/weakness",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Clarithromycin",
    "drugB": "Colchicine",
    "severity": "Major",
    "interaction": "Increased colchicine toxicity risk",
    "mechanism": "Reduced colchicine clearance",
    "possibleEffect": "GI toxicity/muscle weakness",
    "projectAction": "Avoid combination; clinical review required"
  },
  {
    "drugA": "Verapamil",
    "drugB": "Simvastatin",
    "severity": "Major",
    "interaction": "Increased simvastatin exposure",
    "mechanism": "CYP3A4 inhibition",
    "possibleEffect": "Muscle toxicity",
    "projectAction": "Dose/therapy review required"
  },
  {
    "drugA": "Amiodarone",
    "drugB": "Warfarin",
    "severity": "Major",
    "interaction": "Increased anticoagulant effect",
    "mechanism": "Reduced warfarin metabolism",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical monitoring required"
  },
  {
    "drugA": "Amiodarone",
    "drugB": "Simvastatin",
    "severity": "Major",
    "interaction": "Increased statin exposure and muscle toxicity risk",
    "mechanism": "CYP3A4 inhibition",
    "possibleEffect": "Muscle pain/weakness",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Digoxin",
    "drugB": "Verapamil",
    "severity": "Major",
    "interaction": "Increased digoxin exposure and bradycardia risk",
    "mechanism": "Reduced clearance/additive cardiac effects",
    "possibleEffect": "Slow heart rate/nausea",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Metoprolol",
    "drugB": "Verapamil",
    "severity": "Major",
    "interaction": "Bradycardia/heart block risk",
    "mechanism": "Additive AV-node suppression",
    "possibleEffect": "Slow heart rate/dizziness",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Losartan",
    "drugB": "Potassium chloride",
    "severity": "Moderate",
    "interaction": "Hyperkalemia risk",
    "mechanism": "Reduced potassium excretion",
    "possibleEffect": "Weakness/arrhythmia",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Lisinopril",
    "drugB": "Spironolactone",
    "severity": "Major",
    "interaction": "Hyperkalemia risk",
    "mechanism": "Additive potassium-retaining effects",
    "possibleEffect": "Weakness/arrhythmia",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "NSAIDs",
    "drugB": "Lisinopril",
    "severity": "Moderate",
    "interaction": "Reduced antihypertensive effect and kidney injury risk",
    "mechanism": "Reduced renal perfusion/prostaglandin inhibition",
    "possibleEffect": "Reduced urine/kidney dysfunction",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "NSAIDs",
    "drugB": "Furosemide",
    "severity": "Moderate",
    "interaction": "Reduced diuretic effect and kidney injury risk",
    "mechanism": "Reduced renal prostaglandins",
    "possibleEffect": "Edema/kidney dysfunction",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Prednisone",
    "drugB": "Ibuprofen",
    "severity": "Moderate",
    "interaction": "Increased GI ulcer/bleeding risk",
    "mechanism": "Additive GI mucosal injury",
    "possibleEffect": "GI pain/bleeding",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Warfarin",
    "drugB": "Prednisone",
    "severity": "Moderate",
    "interaction": "May alter anticoagulant response and increase bleeding risk",
    "mechanism": "Effects on coagulation and GI tract",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical monitoring required"
  },
  {
    "drugA": "Methotrexate",
    "drugB": "NSAIDs",
    "severity": "Major",
    "interaction": "Potentially increased methotrexate toxicity",
    "mechanism": "Reduced renal elimination",
    "possibleEffect": "Bone-marrow/GI toxicity",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Allopurinol",
    "drugB": "Azathioprine",
    "severity": "Major",
    "interaction": "Severe bone-marrow toxicity risk",
    "mechanism": "Inhibition of azathioprine metabolism",
    "possibleEffect": "Low blood counts/infection risk",
    "projectAction": "Avoid or specialist-managed dosing"
  },
  {
    "drugA": "Valproate",
    "drugB": "Lamotrigine",
    "severity": "Major",
    "interaction": "Increased lamotrigine exposure and serious rash risk",
    "mechanism": "Reduced lamotrigine clearance",
    "possibleEffect": "Severe skin rash",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Carbamazepine",
    "drugB": "Oral contraceptive",
    "severity": "Major",
    "interaction": "Reduced contraceptive effectiveness",
    "mechanism": "Enzyme induction",
    "possibleEffect": "Breakthrough bleeding/pregnancy risk",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Phenytoin",
    "drugB": "Oral contraceptive",
    "severity": "Major",
    "interaction": "Reduced contraceptive effectiveness",
    "mechanism": "Enzyme induction",
    "possibleEffect": "Breakthrough bleeding/pregnancy risk",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Clonazepam",
    "drugB": "Opioids",
    "severity": "Major",
    "interaction": "Increased CNS and respiratory depression",
    "mechanism": "Additive CNS-depressant effects",
    "possibleEffect": "Excessive sedation/slow breathing",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Diazepam",
    "drugB": "Opioids",
    "severity": "Major",
    "interaction": "Increased CNS and respiratory depression",
    "mechanism": "Additive CNS-depressant effects",
    "possibleEffect": "Excessive sedation/slow breathing",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Alcohol",
    "drugB": "Metronidazole",
    "severity": "Moderate",
    "interaction": "May cause unpleasant reaction in some patients",
    "mechanism": "Possible acetaldehyde-related effect",
    "possibleEffect": "Flushing/nausea",
    "projectAction": "Avoid alcohol during treatment and shortly after; verify with clinician"
  },
  {
    "drugA": "Ciprofloxacin",
    "drugB": "Warfarin",
    "severity": "Moderate",
    "interaction": "May increase anticoagulant effect",
    "mechanism": "Possible altered warfarin metabolism",
    "possibleEffect": "Bleeding",
    "projectAction": "Clinical monitoring required"
  },
  {
    "drugA": "Trimethoprim",
    "drugB": "Spironolactone",
    "severity": "Major",
    "interaction": "Hyperkalemia risk",
    "mechanism": "Reduced renal potassium excretion",
    "possibleEffect": "Weakness/arrhythmia",
    "projectAction": "Clinical review required"
  },
  {
    "drugA": "Potassium chloride",
    "drugB": "Spironolactone",
    "severity": "Major",
    "interaction": "Hyperkalemia risk",
    "mechanism": "Additive potassium retention",
    "possibleEffect": "Weakness/arrhythmia",
    "projectAction": "Clinical review required"
  }
];
