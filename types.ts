
export enum ExtractionStatus {
  OK = 'OK',
  ERROR = 'ERROR',
  LOW_CONFIDENCE = 'LOW_CONFIDENCE'
}

export enum RPAStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface InvoiceItem {
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  date: string;
  client: string;
  amount: number;
  currency: string;
  extractionStatus: ExtractionStatus;
  rpaStatus: RPAStatus;
  creditCost: number;
  vendorName: string;
  vendorAddress: string;
  taxId: string;
  items: InvoiceItem[];
}

export interface Batch {
  id: string;
  name: string;
  dateCreated: string;
  origin: 'CLIENT' | 'BACKOFFICE';
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'PARTIAL';
  totalInvoices: number;
  successCount: number;
  errorCount: number;
  totalValue: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITEUR' | 'LECTEUR';
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Article {
  id: string;
  name: string;
  code: string;
  price: number;
}
