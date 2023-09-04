import './scss/app.scss';

function App() {
  return (
    <div className="App">
    </div>
  );
}

const booksData = await fetch('https://www.googleapis.com/books/v1/volumes?q=list')
  .then(data => data.json());

console.log(booksData);


export default App;
