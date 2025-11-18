import ProductTable from "@/components/products/product-table";

export default function Dahboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      <ProductTable limit={10} />
    </div>
  );
}
