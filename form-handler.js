const templates = {
  hype: (name, price, tag) => `🚀 DROP TERBARU TELAH TIBA! 🚀\n\nKalian udah nungguin ${name} kan? Stok baru aja masuk nih!\n\n💸 Cuma ${price}\n🔥 Grab it fast sebelum kehabisan!\n📦 Free ongkir ke seluruh Indonesia.\n\nKlik link di bio buat order sekarang! 👇\n\n#${tag} #Shop #GadgetBaru #MustHave`,
  casual: (name, price, tag) => `Halo semuanya! 👋\n\nBuat kalian yang lagi nyari ${name}, kita ready stock nih. Harganya pas di kantong, cuma ${price} aja.\n\nCocok banget buat upgrade setup kalian. Kualitasnya nggak usah diraguin lagi deh pokoknya.\n\nDM kita ya kalau mau tanya-tanya! ✨\n\n#${tag} #SetupInspirasi #RekomendasiGadget`
};

const form = document.getElementById("marketingForm");

const rules = {
  productName: (val) => {
    if (!val.trim()) return "Nama produk nggak boleh kosong.";
    if (val.length < 3) return "Minimal 3 karakter.";
    return "";
  },
  price: (val) => {
    if (!val) return "Harga nggak boleh kosong.";
    if (Number(val) < 1000) return "Harga minimal Rp 1.000.";
    return "";
  }
};

function validateField(id) {
  const input = document.getElementById(id);
  const errorSpan = document.getElementById(`${id}-error`);
  const msg = rules[id](input.value);
  
  errorSpan.textContent = msg;
  input.style.borderColor = msg ? "var(--danger)" : "";
  return !msg;
}

["productName", "price"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => validateField(id));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateField("productName");
  const isPriceValid = validateField("price");

  if (!isNameValid || !isPriceValid) return;

  const name = document.getElementById("productName").value.trim();
  const rawPrice = Number(document.getElementById("price").value);
  const formattedPrice = rawPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  const tone = document.getElementById("tone").value;
  
  const tag = name.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");

  document.getElementById("output").value = templates[tone](name, formattedPrice, tag);
});