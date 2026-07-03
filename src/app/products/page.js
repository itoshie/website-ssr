import Link from "next/link";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=200", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const data = await getProducts();
  const products = data.products || [];

  return (
    <div style={{ padding: 24 }}>
      <h1>Products</h1>
      <p>Data from https://dummyjson.com/products</p>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
        {products.map((p) => (
          <li key={p.id} style={{ border: "1px solid #eaeaea", borderRadius: 8, padding: 12 }}>
            <Link href={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={p.thumbnail} alt={p.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />
              <h3 style={{ margin: "8px 0 4px" }}>{p.title}</h3>
              <p style={{ margin: 0 }}>${p.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
