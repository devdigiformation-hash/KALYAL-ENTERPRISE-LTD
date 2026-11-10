export interface ClipMetadata {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  frameCount: number;
  folder: string;
  poster: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  collectionPostcode: string;
  deliveryPostcode: string;
  freightType: string;
  weightApprox: string;
  collectionDate: string;
  palletCount: string;
  notes: string;
}

export interface JobApplicationData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  experienceYears: string;
  coverNote: string;
}
