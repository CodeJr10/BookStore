import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Spinner from "../page/Spinner";
import axios from "aixos";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books list</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
