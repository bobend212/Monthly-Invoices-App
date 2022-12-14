import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  invoices: Invoice[] = [];
  private invoiceSub: Subscription;

  constructor(private invoicesService: InvoicesService) {}

  ngOnDestroy(): void {
    this.invoiceSub.unsubscribe();
  }

  ngOnInit(): void {
    this.invoicesService.getInvoices();
    this.invoiceSub = this.invoicesService
      .getInvoiceUpdateListener()
      .subscribe((data: Invoice[]) => {
        this.invoices = data;
      });
  }

  getTotal() {
    var total = 0;
    this.invoices.forEach((element) => {
      total += element.amount;
    });
    return total;
  }
}
