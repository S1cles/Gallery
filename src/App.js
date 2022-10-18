
import React, { useState, useEffect } from "react";
import "./index.scss";
import Collection from "./components/Collection";


function App() {
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const category = categoryId ? `category=${categoryId}` : "";


  
  const categories = ["Все", "Горы", "Море", " Ахитектура", "Города"];
  const [btnState , setBtnState] = useState(false)
    const toggleBtn = () =>setBtnState(btnState = !btnState)
    let toggleClassCheck = btnState ? 'active' : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6306f7cac0d0f2b801242e89.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <div className="top">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((item , i) => (
            <li 
            key={item.name}
            className={categoryId == i ? 'active' : ''}
            onClick={()=>setCategoryId(i)}
            >{item}</li>
          ))}
        </ul>
        <input className="search-input"  placeholder="Поиск по названию" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
      </div>
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collection
            .filter((e) =>
              e.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => {
              return (
                <Collection key={index} name={obj.name} images={obj.photos} />
              );
            })
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((e, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );  }
  export default App;