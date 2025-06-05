import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Input from "./component/input";
import List from "./component/list";

function App() {
  return (
    <div className="container">
      <Input />
      <List />
    </div>
  );
}

export default App;
