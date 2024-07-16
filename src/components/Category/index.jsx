import axios from "axios";
import { useState,useEffect } from "react"

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories,setSelectedCategories] = useState([]);
  const [page,setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCategories = async ()=>{
      let res = await axios.get('http://localhost:5000/api/categories',{
        params:{page,itemsPerPage}
      });
      setCategories(res.data.categories);
    };

    const fetchSelectedCategories = async ()=>{
      const res = await axios.get('http://localhost:5000/api/selectedCategories',{
        withCredentials: true,
      });
      setSelectedCategories(res.data.selectedCategories);
    };
    fetchCategories();
    fetchSelectedCategories();
  },[page]);

  const handleSelectCategory = async (categoryId) => {
    const updatedSelection = selectedCategories.includes(categoryId) ? selectedCategories.filter(id => id !== categoryId) : [...selectedCategories,categoryId]

    setSelectedCategories(updatedSelection);

    await axios.post(
      'http://localhost:5000/api/updateSelectedCategories',{selectedCategories:updatedSelection},{withCredentials:true}
    )
  }
    
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category)=>(
          <li key={category.id}>
            <label>
              <input
                type="checkbox"
                checked = {selectedCategories.includes(category.id)}
                onChange={() => handleSelectCategory(category.id)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page-1)}>Previous</button>
        <button onClick={() => setPage(page+1)}>Next</button>
      </div>
    </div>
  )
}

export default CategoryPage