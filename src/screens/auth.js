const baseURL = 'https://tatto-backend.onrender.com';

export async function getUsersWithRating() {
    const response = await fetch(`${baseURL}/userwithrating`, {
        method: 'GET',
    });
    return await response.json();
}
