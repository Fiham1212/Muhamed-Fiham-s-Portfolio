import { Skill, SkillCategory, Service, Project, Education } from './types';

export const PORTFOLIO_DATA = {
  name: "Muhamed Fiham",
  title: "Sr. Quantity Surveyor / Contract Administrator",
  tagline: "Commercial Management | Contract Law | Digital Engineering",
  about: `I am a Sr. Quantity Surveyor and Contract Administrator with over 6+ years of proven experience in commercial and contract management across the GCC and Sri Lanka. I am skilled in handling all aspects of pre- and post-contract administration for prestigious projects, including high-rise buildings, luxury hotels, commercial complexes, and civil works.

I uniquely combine traditional quantity surveying with advanced digital tools—using AutoLISP for drafting automation and Excel VBA/Power BI for complex data analysis—to deliver value-driven solutions, accurate cost estimation, and effective claims management.`,
  
  contact: {
    email: "fiham121@gmail.com",
    phone: "+971 56 123 3613 | +94 76 729 8328",
    location: "UAE | Immediate Available",
    linkedin: "linkedin.com/in/muhamed-fiham",
  },

  skills: [
    { name: "Contract Administration", level: 95, category: SkillCategory.COMMERCIAL },
    { name: "Quantity Surveying", level: 95, category: SkillCategory.COMMERCIAL },
    { name: "Claims & FIDIC", level: 85, category: SkillCategory.COMMERCIAL },
    { name: "AutoCAD 2D", level: 95, category: SkillCategory.ENGINEERING },
    { name: "Advanced Excel (VBA/PowerQuery)", level: 92, category: SkillCategory.DATA },
    { name: "Power BI", level: 80, category: SkillCategory.DATA },
    { name: "AutoLISP Automation", level: 80, category: SkillCategory.SOFTWARE },
    { name: "CostX & PlanSwift", level: 85, category: SkillCategory.SOFTWARE },
    { name: "SAP S/4HANA & Oracle", level: 75, category: SkillCategory.SOFTWARE },
    { name: "BOQ Preparation (POMI/NRM)", level: 95, category: SkillCategory.ENGINEERING },
  ] as Skill[],

  tools: [
    "AutoCAD (2017–2025)",
    "Microsoft Excel (VBA)",
    "Power BI",
    "CostX",
    "Plan Swift",
    "SAP S/4HANA",
    "Oracle",
    "AutoLISP",
  ],

  services: [
    {
      title: "Commercial & Contract Management",
      description: "Managing interim/final accounts, variations, and claims (EOT/Cost) per FIDIC clauses. Ensuring compliance with contractual requirements.",
      icon: "FileText"
    },
    {
      title: "QS & Cost Estimation",
      description: "Comprehensive BOQ preparation (POMI, NRM 1&2, CESMM), cost forecasting, and cashflow planning for high-value projects.",
      icon: "Calculator"
    },
    {
      title: "Drafting & Automation",
      description: "Developing custom AutoLISP tools to automate repetitive CAD tasks, improving drafting accuracy and reducing turnaround time.",
      icon: "Ruler"
    },
    {
      title: "Data Analysis & Reporting",
      description: "Creating dynamic dashboards in Excel and Power BI for budget vs. actual reporting, delay analysis, and CTC analysis.",
      icon: "BarChart3"
    }
  ] as Service[],

  experience: [
    {
      title: "Avenue Mall - Riyadh",
      role: "Sr. Quantity Surveyor",
      client: "Al - Habdan Contracting Est",
      period: "Sep 2023 – Sep 2025",
      description: "Led commercial operations for a major mall project (Consultant: PACE Saudi Arabia). Managed interim accounts, claims, and EOT submissions per FIDIC. Maintained commercial registers and negotiated settlements with clients.",
      technologies: ["FIDIC", "Cost Control", "Claims", "Excel"]
    },
    {
      title: "Qurayat Light Workshop",
      role: "Quantity Surveyor",
      client: "Al Bawani Construction Co (Saudi Arabia)",
      period: "June 2020 – July 2023",
      description: "Managed variations, subcontractor administration, and payment certifications for a Saudi Railway Company project. Conducted technical assessments of bids and quotations.",
      technologies: ["AutoCAD", "SAP", "Variations", "Subcontract Management"]
    },
    {
      title: "Labor Offices Project",
      role: "Quantity Surveyor",
      client: "Nawaloka Construction Company (Sri Lanka)",
      period: "March 2018 – March 2020",
      description: "Prepared BOQs, cost estimates, and tender documents. Collaborated with project teams to align pre-contract planning with budgets.",
      technologies: ["BOQ", "Tendering", "Measurement", "Site Records"]
    }
  ] as Project[],

  education: [
    {
      degree: "BSc (Hons) in Quantity Surveying",
      institution: "Birmingham University ®",
      location: "UK"
    },
    {
      degree: "Higher National Diploma in Quantity Surveyor",
      institution: "Nqual",
      location: "UK"
    },
    {
      degree: "Advanced Diploma in Management Accounting",
      institution: "CIMA",
      location: "UK"
    }
  ] as Education[]
};

export const SYSTEM_INSTRUCTION = `
You are an AI assistant representing Muhamed Fiham.
Profile:
Name: ${PORTFOLIO_DATA.name}
Role: ${PORTFOLIO_DATA.title}
Experience: 6+ years in GCC and Sri Lanka.
Key Skills: Contract Administration, Claims (FIDIC), AutoLISP, Advanced Excel.
Contact: ${PORTFOLIO_DATA.contact.email}

Goal: Answer recruiter questions professionally.
Tone: Confident, Professional, Technical.
If asked about automation: Mention AutoLISP scripts for CAD and VBA for Excel.
If asked about contracts: Mention experience with FIDIC, claims, and EOT.
`;