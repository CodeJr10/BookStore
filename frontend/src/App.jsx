import { Route, Routes } from "react-router-dom";

import CreateBook from "./components/CreateBook";
import DeleteBook from "./components/DeleteBook";
import EditBook from "./components/EditBook";
import Home from "./components/Home";
import ShowBook from "./components/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
