import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private invoices: Invoice[] = [];
  private invoicesUpdated = new Subject<Invoice[]>();

  constructor() {}

  getInvoices() {
    return [...this.invoices];
  }

  getInvoiceUpdateListener() {
    return this.invoicesUpdated.asObservable();
  }

  addInvoices(title: string, amount: number) {
    const invoice: Invoice = {
      title: title,
      amount: amount,
    };
    this.invoices.push(invoice);
    this.invoicesUpdated.next([...this.invoices]);
  }
}
