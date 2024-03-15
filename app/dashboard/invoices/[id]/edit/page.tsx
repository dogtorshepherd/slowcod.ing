import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function Page({params}:{params:{id:string}}){
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(params.id),
        fetchCustomers(),
    ]);
    if(!invoice){
      notFound();
    }
    return (
    <>
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm customers={customers} invoice={invoice}/>
    </>
    )
}