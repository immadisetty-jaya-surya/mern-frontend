import axios from "axios";
import { useState, useEffect } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      let res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/categories`,
        {
          params: { page, itemsPerPage },
        }
      );
      setCategories(res.data.categories);
    };

    const fetchSelectedCategories = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/selectedCategories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedCategories(res.data.selectedCategories);
    };
    fetchCategories();
    fetchSelectedCategories();
  }, [page]);

  const handleSelectCategory = async (categoryId) => {
    const updatedSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedSelection);

    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/updateSelectedCategories`,
      { selectedCategories: updatedSelection },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleSelectCategory(category.id)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default CategoryPage;
