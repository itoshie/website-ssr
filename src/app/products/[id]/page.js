import Link from "next/link";

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div style={{ padding: 24 }}>
      <Link href="/products">← Back to products</Link>
      <h1 style={{ marginTop: 12 }}>{product.title}</h1>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <img src={product.thumbnail} alt={product.title} style={{ width: 360, height: 360, objectFit: "cover", borderRadius: 8 }} />
        <div>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
        </div>
      </div>
    </div>
  );
}
