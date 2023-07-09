import { useState } from "react";
import { Sheet } from "./components/Sheet";
import { DB } from "./types/db";

function App() {
  const [db, setDB] = useState<DB>({});

  return (
    <div style={{ fontFamily: "monospace", fontSize: "large" }}>
      <Sheet
        rowCount={100}
        columnCount={30}
        db={db}
        onChange={(db) => setDB(db)}
      />
    </div>
  );
}

export default App;
