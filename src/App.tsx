import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12">
      <Header />
      <Board />
    </main>
  );
}

export default App;
