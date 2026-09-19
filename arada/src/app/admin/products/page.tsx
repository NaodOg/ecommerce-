"use client";

import { useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductWithImage } from "@/convex/products";
import type { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

type OptionalStorageId = Id<"_storage"> | null;

const categories = ["tees", "hoodies", "outerwear", "pants", "accessories"];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminProductsPage() {
  const router = useRouter();
  const products = useQuery(api.products.listProducts);
  const createProduct = useMutation(api.products.createProduct);
  const updateProduct = useMutation(api.products.updateProduct);
  const deleteProduct = useMutation(api.products.deleteProduct);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const [editing, setEditing] = useState<ProductWithImage | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function handleDelete(p: ProductWithImage) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await deleteProduct({ productId: p._id });
  }

  if (products === undefined) {
    return (
      <div className="p-8 font-mono text-sm text-outline uppercase tracking-widest">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-tighter text-on-surface">Products</h1>
          <p className="font-mono text-sm text-outline uppercase tracking-widest">{products.length} total</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-primary-container text-white font-display text-base px-4 py-2.5 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="flex flex-col border border-outline-variant bg-surface-container overflow-hidden">
            <div className="relative aspect-[4/3] bg-surface-dim">
              {p.image ? (
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-sm text-outline uppercase">
                  No image
                </div>
              )}
              {(p.badge || p.plain) && (
                <span className="absolute top-2 right-2 bg-background border border-secondary text-secondary font-mono text-sm px-2 py-0.5 uppercase">
                  {p.badge ?? "PLAIN"}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-on-surface uppercase tracking-tighter truncate">{p.name}</h3>
                  <span className="font-mono text-sm text-outline uppercase tracking-widest">{p.category}</span>
                </div>
                <span className="font-display text-base text-secondary shrink-0">{formatPrice(p.price)}</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant line-clamp-2">{p.description}</p>
              <div className="mt-auto flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant text-on-surface-variant hover:text-secondary hover:border-secondary transition-colors font-mono text-sm uppercase tracking-widest"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant text-error hover:border-error transition-colors font-mono text-sm uppercase tracking-widest"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-display text-xl text-on-surface-variant uppercase tracking-tighter">No products yet</p>
          <p className="font-mono text-sm text-outline uppercase tracking-widest mt-2">Add your first product to the shop</p>
        </div>
      )}

      {showForm && (
        <ProductForm
          key={editing?._id ?? "new"}
          product={editing}
          generateUploadUrl={generateUploadUrl}
          onSubmit={async (data) => {
            if (editing) {
              await updateProduct({ productId: editing._id, ...data });
            } else {
              await createProduct(data);
            }
            setShowForm(false);
            router.refresh();
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  generateUploadUrl,
  onSubmit,
  onClose,
}: {
  product: ProductWithImage | null;
  generateUploadUrl: () => Promise<string>;
  onSubmit: (data: {
    name: string;
    slug: string;
    price: string;
    category: string;
    description: string;
    badge?: string;
    imageStorageId: Id<"_storage"> | null;
    imageUrl?: string;
    plain?: boolean;
    bulkPrice?: string;
    bulkMin?: number;
  }) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [category, setCategory] = useState(product?.category ?? categories[0]);
  const [description, setDescription] = useState(product?.description ?? "");
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [imageStorageId, setImageStorageId] = useState<OptionalStorageId>(product?.imageStorageId ?? null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(product?.imageUrl);
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);
  const [plain, setPlain] = useState(product?.plain ?? false);
  const [bulkPrice, setBulkPrice] = useState(product?.bulkPrice ?? "");
  const [bulkMin, setBulkMin] = useState(product?.bulkMin?.toString() ?? "");
  const fileRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);

  function autoSlug() {
    if (!product && !slug.trim()) setSlug(slugify(name));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!result.ok) throw new Error("Upload failed");
    const { storageId } = await result.json();
    setImageStorageId(storageId as Id<"_storage">);
    setImageUrl(undefined);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        name,
        slug: slug || slugify(name),
        price,
        category,
        description,
        badge: badge || undefined,
        imageStorageId,
        imageUrl,
        plain: plain || undefined,
        bulkPrice: plain && bulkPrice ? bulkPrice : undefined,
        bulkMin: plain && bulkMin ? Number(bulkMin) : undefined,
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save product.");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-surface-dim border border-outline-variant text-on-surface font-body focus:outline-none focus:border-secondary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg bg-surface-container border border-outline-variant flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-5 border-b border-outline-variant">
          <div>
            <h2 className="font-display text-xl uppercase tracking-tighter text-on-surface">
              {product ? "Edit Product" : "New Product"}
            </h2>
            <p className="font-mono text-sm text-outline uppercase tracking-widest">
              {product ? product.slug : "Draft"}
            </p>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-secondary transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">Image</span>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {preview ? (
              <div className="relative aspect-video bg-surface-dim overflow-hidden">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImageStorageId(null);
                    setPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/70 text-white hover:text-error transition-colors"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="aspect-video border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 hover:border-secondary transition-colors cursor-pointer"
              >
                <Upload className="text-secondary" size={20} />
                <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
                  Upload image
                </span>
              </button>
            )}
          </div>

          <input type="text" required placeholder="Product name" value={name} onChange={(e) => { setName(e.target.value); autoSlug(); }} className={inputClass} />
          <input type="text" required placeholder="Slug (auto)" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} />
          <input type="text" required placeholder="Price in ETB (e.g. 800)" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input type="text" placeholder="Badge (e.g. NEW, SOLD OUT)" value={badge} onChange={(e) => setBadge(e.target.value)} className={inputClass} />
          <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={cn(inputClass, "resize-none")} />

          <label className="flex items-center gap-3 border border-outline-variant px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              checked={plain}
              onChange={(e) => setPlain(e.target.checked)}
              className="w-4 h-4 accent-primary-container"
            />
            <span className="font-mono text-sm text-on-surface uppercase tracking-widest">
              Plain garment (sewn, no print)
            </span>
          </label>

          {plain && (
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Bulk price per piece in ETB (e.g. 640)"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(e.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                min={1}
                placeholder="Min qty (e.g. 10)"
                value={bulkMin}
                onChange={(e) => setBulkMin(e.target.value)}
                className={cn(inputClass, "max-w-[140px]")}
              />
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-outline-variant text-on-surface-variant hover:text-secondary transition-colors font-mono text-sm uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary-container text-white font-display text-base px-4 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all disabled:opacity-40"
            >
              {submitting ? "Saving..." : product ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}