import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css'],
})
export class InvoiceCreateComponent implements OnInit {
  enteredTitle: '';
  enteredAmount: 0;

  constructor(private invoicesService: InvoicesService) {}

  ngOnInit(): void {}

  addInvoice(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const invoice: Invoice = {
      title: form.value.title,
      amount: form.value.amount,
    };
    this.invoicesService.addInvoices(form.value.title, form.value.amount);
    form.resetForm();
  }
}
