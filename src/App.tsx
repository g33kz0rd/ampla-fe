import { useEffect, useState } from "react";
import { Sheet } from "./components/Sheet";
import { DB } from "./types/db";

function App() {
  const [db, setDB] = useState<DB>({});
  const [shareLink, setShareLink] = useState<string>();

  useEffect(() => loadLink(window.location.pathname.slice(1)), []);

  const handleShare = () => setShareLink(generateLink());

  const generateLink = (): string => {
    return btoa(JSON.stringify(db));
  };

  const loadLink = (base64: string) => {
    try {
      setDB(JSON.parse(atob(base64)));
    } catch (e) {}
  };

  return (
    <div style={{ fontFamily: "monospace", fontSize: "large" }}>
      <button onClick={handleShare}>Share!</button>
      {!!shareLink && <a href={shareLink}>{shareLink}</a>}
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
