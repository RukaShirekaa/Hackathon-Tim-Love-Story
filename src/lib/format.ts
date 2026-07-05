/** Format harga rupiah. null → "Hubungi kami". */
export function formatPrice(price: number | null): string {
  if (price === null) return "Hubungi kami";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Nomor WhatsApp toko (ganti sesuai kebutuhan). Format internasional tanpa +. */
export const WHATSAPP_NUMBER = "6281234567890";

/** Buat link wa.me dengan pesan pertanyaan produk. */
export function whatsappLink(productName?: string): string {
  const text = productName
    ? `Halo, saya tertarik dengan produk "${productName}". Apakah masih tersedia?`
    : "Halo, saya ingin bertanya tentang produk sasirangan.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
