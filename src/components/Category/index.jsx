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
          // withCredentials:true
        }
      );
      setCategories(res.data.categories);
    };

    const fetchSelectedCategories = async () => {
      const token = localStorage.getItem("token");
      try{
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/selectedCategories`,
          {
            headers: { Authorization: `Bearer ${token}` },
            // withCredentials: true
          }
        );
        console.log(res.data.selectedCategories);
        // console.log(res.data.selectedCategories[0]);
        setSelectedCategories(res.data.selectedCategories || []);
      }catch (error){
        console.error('Error fetching selected categories:', error);
      }
    }
    fetchCategories();
    fetchSelectedCategories();
  }, [page]);

  const handleSelectCategory = async (categoryId) => {
    const updatedSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

      // const updatedSelection = categoryId === selectedCategories ? null : categoryId;
      console.log(updatedSelection);

    setSelectedCategories(updatedSelection);

    const token = localStorage.getItem("token");
    try{
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/updateSelectedCategories`,{ selectedCategories: updatedSelection ? [updatedSelection] : [] },
        { 
          withCredentials: true, 
          headers: { Authorization: `Bearer ${token}` } 
        }
      )
    }catch(error) {
      console.error('Error updating categories:', error);
    }
  }

  return (
    <div className="flex flex-col  border-solid border-gray-300 border-2 p-4 rounded-3xl w-[576px] h-[550px] mx-[480px] my-6">
      <h1 className="text-2xl font-bold px-[110px] py-[10px]">Please mark your interests</h1>
      <h1 className="font-medium px-44">We will keep you notified</h1>
      <div className="px-5 py-3">
        <h1 className="font-semibold mb-4">My saved interests!</h1>
        <ul >
          {categories.map((category,index) => (
            <li key={category.id} className="mb-2">
              <label className="flex items-center text-base">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  // checked = {selectedCategories === category.id}
                  onChange={() => handleSelectCategory(category.id)}
                  className="mr-2 w-4 h-4 bg-black"
                />
                {/* {console.log(category.id)} */}
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
    </div>
  );
};

export default CategoryPage;
