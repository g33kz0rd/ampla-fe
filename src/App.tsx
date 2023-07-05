import { Sheet } from "./components/Sheet";

function App() {
  return (
    <div style={{ fontFamily: "monospace", fontSize: "large" }}>
      <Sheet rowCount={100} columnCount={30} />
    </div>
  );
}

export default App;
