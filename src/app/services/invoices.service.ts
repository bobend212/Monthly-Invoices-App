import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private invoices: Invoice[] = [];
  private invoicesUpdated = new Subject<Invoice[]>();

  constructor(private http: HttpClient) {}

  getInvoices() {
    this.http
      .get<{ message: string; invoices: Invoice[] }>(
        'http://localhost:3000/invoices'
      )
      .subscribe((data) => {
        this.invoices = data.invoices;
        this.invoicesUpdated.next([...this.invoices]);
      });
  }

  getInvoiceUpdateListener() {
    return this.invoicesUpdated.asObservable();
  }

  addInvoices(title: string, amount: number) {
    const invoice: Invoice = {
      id: null,
      title: title,
      amount: amount,
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/invoices', invoice)
      .subscribe((data) => {
        console.log(data.message);
      });
    this.invoices.push(invoice);
    this.invoicesUpdated.next([...this.invoices]);
  }
}
