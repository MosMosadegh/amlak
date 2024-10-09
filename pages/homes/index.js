import Home from "@/components/modules/Home";
import React, { useEffect, useState } from "react";
import db from "./../../data/db.json";
import styles from "./../../styles/Homes.module.css";

function index() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-1");
  const [homes, setHomes] = useState([...db.homes]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const newHome = db.homes.filter((home) => home.title.includes(search));
    setHomes(newHome);
  }, [search]);

  useEffect(() => {
    switch (sort) {
      case "price": {
        const newHome = [...homes].sort((a, b) => a.price - b.price);
        setHomes(newHome);
        break;
      }
      case "room": {
        const newHome = [...homes].sort((a, b) => a.roomCount - b.roomCount);
        setHomes(newHome);
        break;
      }
      case "meterage": {
        const newHome = [...homes].sort((a, b) => a.meterage - b.meterage);
        setHomes(newHome);
        break;
      }
      default: {
        setHomes([...db.homes]);
      }
    }
  }, [sort]);

  const paginateHandler = (event, page) => {
    event.preventDefault();
    setCurrentPage(page)
    console.log('Next Page =>' , page)
    const endIndex = 3*page
    const startIndex = endIndex-3
    const paginatedHomes = db.homes.slice(startIndex, endIndex)
    setHomes(paginatedHomes)
  };

  return (
    <div className="home-section" id="houses">
      <div className="home-filter-search">
        <div className="home-filter">
          <select defaultValue={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="-1">انتخاب کنید</option>
            <option value="price">بر اساس قیمت</option>
            <option value="room">بر اساس تعداد اتاق</option>

            <option value="meterage">بر اساس اندازه</option>
          </select>
        </div>
        <div className="home-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو کنید"
          />
        </div>
      </div>
      <div className="homes">
        {homes.length > 0 ? (
          homes.slice(0, 3).map((home) => <Home key={home.id} {...home} />)
        ) : (
          <p>آیتمی برای نمایش وجود ندارد</p>
        )}
      </div>
      {homes.length > 0 ? (
        <ul className="pagination__list">
          {Array.from({ length: Math.ceil(db.homes.length / 3) }).map(
            (item, index) => (
              <li key={index+1}
                className="pagination__item"
                onClick={(event) => paginateHandler(event, index + 1)}
              >
                <a href="#" className={`pagination__item ${currentPage === index + 1 ? 'active' : ''}`}>
                  {index + 1}{" "}
                </a>
              </li>
            )
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default index;
