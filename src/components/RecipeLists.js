import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { fetchData } from "../service";
import { MdFavoriteBorder } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
function RecipeLists(props) {
  const [searchedTearm, setSearchedTearm] = useState("");
  const [query, setQuery] = useState("pasta");
  const [selectedItems, setSelectedItems] = useState([]);
  const [favoriteCount,setFavoriteCount]=useState([])
  const [data, setData] = useState("");

  const searchrecipe = (searchQuery) => {
    fetchData(searchQuery).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  };

  const handleAddMdFavorite = (items) => {
    const existingData = JSON.parse(localStorage.getItem("favorite")) || [];
    console.log(existingData)
    const newData = [...existingData, items];
    localStorage.setItem("favorite", JSON.stringify(newData));
    setSelectedItems([...selectedItems, items]);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('favorite');
    if (storedData) {
        setFavoriteCount(JSON.parse(storedData));
      }
    fetchData(query).then((response) => {
      setData(response);
      props.setLoader(false);
    });

  }, []);
  return (
    <div className="container">
      <div className="heading-line">
        <div className="favorite-cart">
          <strong>Search Recipes</strong>
          <div>
            <p>{selectedItems.length || favoriteCount.length}</p>
            <BsCart4 size={"30px"} />
          </div>
        </div>
        <div className="input-wrapper">
          <input
            onChange={(e) => setSearchedTearm(e.target.value)}
            value={searchedTearm}
            type="text"
            placeholder="Search you recipe"
          />
          <button
            onClick={() => (searchrecipe(searchedTearm), props.setLoader(true))}
          >
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flexbox">
        {data &&
          data.hits.map((item, index) => (
            <div key={index} className="flexItem">
              <div className="img-wrapper">
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <div className="title-favorite">
                <p>{item.recipe.label}</p>
                <p>
                  <MdFavoriteBorder
                    size={"20px"}
                    onClick={() => handleAddMdFavorite(item)}
                    style={{
                      color: selectedItems.includes(item) ? "red" : "black",
                    }}
                  />
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeLists;
