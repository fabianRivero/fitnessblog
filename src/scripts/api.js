const API_URL = "http://localhost:4000/api";

export async function fetchBlogs() {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) throw new Error("Error fetching blogs");
    return await response.json();
}

export async function fetchPages() {
    const response = await fetch(`${API_URL}/blogs/pages`);
    if (!response.ok) throw new Error("Error fetching pages");
    return await response.json();
}
