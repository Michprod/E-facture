
import { ExtractionStatus, RPAStatus, Invoice, Batch, User, Client, Article, Nid } from './types';

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'FAC-2023-001',
    date: '24 Oct 2023',
    client: 'Acme Corp',
    amount: 1200.00,
    currency: 'EUR',
    extractionStatus: ExtractionStatus.OK,
    rpaStatus: RPAStatus.COMPLETED,
    creditCost: 2,
    vendorName: 'Acme Solutions Ltd.',
    vendorAddress: '123 Rue de la Paix, Paris, 75001',
    taxId: 'FR-987654321',
    items: [
      { description: 'Services Professionnels', qty: 10, unitPrice: 100, amount: 1000 },
      { description: 'Licence Logicielle', qty: 1, unitPrice: 200, amount: 200 }
    ]
  },
  {
    id: 'FAC-2023-002',
    date: '24 Oct 2023',
    client: 'Stark Industries',
    amount: 450.50,
    currency: 'EUR',
    extractionStatus: ExtractionStatus.ERROR,
    rpaStatus: RPAStatus.PENDING,
    creditCost: 0,
    vendorName: 'Stark R&D',
    vendorAddress: 'Avenue des Champs-Élysées, Paris',
    taxId: 'FR-111222333',
    items: []
  },
  {
    id: 'FAC-2023-003',
    date: '25 Oct 2023',
    client: 'Wayne Enterprises',
    amount: 980.00,
    currency: 'EUR',
    extractionStatus: ExtractionStatus.OK,
    rpaStatus: RPAStatus.IN_PROGRESS,
    creditCost: 1,
    vendorName: 'Wayne Supplies',
    vendorAddress: '1007 Mountain Drive, Gotham',
    taxId: 'FR-444555666',
    items: [
      { description: 'Support & Maintenance', qty: 1, unitPrice: 980, amount: 980 }
    ]
  }
];

export const MOCK_BATCHES: Batch[] = [
  {
    id: 'LOT-3092',
    name: 'factures_octobre.xlsx',
    dateCreated: '24 Oct 2023 - 10:42',
    origin: 'BACKOFFICE',
    status: 'PROCESSING',
    totalInvoices: 245,
    successCount: 180,
    errorCount: 2,
    totalValue: 124500.00
  }
];

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Morgan', email: 'alex@company.com', role: 'ADMIN' },
  { id: '2', name: 'Marie Curie', email: 'marie@company.com', role: 'EDITEUR' }
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'C1', name: 'Acme Corp', email: 'billing@acme.com', phone: '0123456789', address: 'Paris, France' },
  { id: 'C2', name: 'Stark Industries', email: 'finance@stark.com', phone: '0987654321', address: 'Malibu, CA' }
];

export const MOCK_ARTICLES: Article[] = [
  { id: 'A1', name: 'Consulting IT', code: 'SRV-001', price: 150 },
  { id: 'A2', name: 'Licence SaaS', code: 'LIC-002', price: 49.90 }
];

export const MOCK_NIDS: Nid[] = [
  { id: 'N1', label: 'Siège social', address: '123 Rue de la Paix, 75001 Paris' },
  { id: 'N2', label: 'Entrepôt', address: '10 Avenue de l’Industrie, 69000 Lyon' }
];
