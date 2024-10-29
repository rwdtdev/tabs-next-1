import { columns } from "@/components/PaymentsTable/columns";
import { DataTable } from "@/components/PaymentsTable/dataTable";
import { payments } from "@/components/PaymentsTable/tabledata";

export default function PaymentsTable() {
  return (
    <>
      <h1>PaymentsTable</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={payments} />
      </div>
    </>
  );
}
