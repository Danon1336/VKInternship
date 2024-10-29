import React from "react";
import ItemList from "./components/ItemList";
import "antd/dist/reset.css"; 


const App: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Приложение с бесконечным скроллингом</h1>
      <ItemList />
    </div>
  );
};

export default App;
