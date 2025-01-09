export function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
        .replace(/\s+/g, "_");   // Reemplaza espacios por "_"
}