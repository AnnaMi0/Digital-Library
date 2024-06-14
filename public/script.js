// Event listener for form submission to add a new book
document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault();// Prevent the default form submission behavior

    // Extract book data from form inputs
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const price = document.getElementById('price').value;

    // Send a POST request to the server to add the new book
    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title, genre, price })
    });

    // Display the response message
    const result = await response.json();
    document.getElementById('entry-message').textContent = result.message;
});

// Event listener for search button to search for books
document.getElementById('search-button').addEventListener('click', async () => {
    const keyword = document.getElementById('search').value;

    // Send a GET request to the server to search for books by keyword
    const response = await fetch(`http://localhost:3000/books/${keyword}`);
    const books = await response.json();

    // Display the search results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    books.forEach(book => {
        resultsDiv.innerHTML += `<p>${book.title} by ${book.author}, ${book.genre}, $${book.price}</p>`;
    });
});

// Function to handle tab switching
async function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    document.getElementById(tabId).style.display = 'block';
    if (tabId === 'view-books') { //view books tab was selected

        // Send a GET request to the server to fetch all books
        const response = await fetch('http://localhost:3000/viewBooks');
        const books = await response.json();

        // Display all books
        const allBooksDiv = document.getElementById('all-books');
        allBooksDiv.innerHTML = '';
        books.forEach(book => {
            allBooksDiv.innerHTML += `<p>${book.title} by ${book.author}, ${book.genre}, $${book.price}</p>`;
        });
    }
}