document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    //extract book data input
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const price = document.getElementById('price').value;

    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title, genre, price })
    });

    const result = await response.json();
    document.getElementById('entry-message').textContent = result.message;
});

document.getElementById('search-button').addEventListener('click', async () => {
    const keyword = document.getElementById('search').value;
    const response = await fetch(`http://localhost:3000/books/${keyword}`);
    const books = await response.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    books.forEach(book => {
        resultsDiv.innerHTML += `<p>${book.title} by ${book.author}, ${book.genre}, $${book.price}</p>`;
    });
});

document.getElementById('show-all-books-button').addEventListener('click', async () => {
});

// Function to handle tab switching
async function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    document.getElementById(tabId).style.display = 'block';
    if (tabId === 'view-books') { // Fetch and display all books when "View All Books" tab is selected
        const response = await fetch('http://localhost:3000/books');
        const books = await response.json();
        const allBooksDiv = document.getElementById('all-books');
        allBooksDiv.innerHTML = '';
        books.forEach(book => {
            allBooksDiv.innerHTML += `<p>${book.title} by ${book.author}, ${book.genre}, $${book.price}</p>`;
        });
    }
}