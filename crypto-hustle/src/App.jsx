import { useEffect, useState } from "react";
import "./App.css";
import CoinInfo from "./Components/coinInfo";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const searchItems = searchValue => {
  setSearchInput(searchValue);
  if (searchValue !== ""){
    const filteredData = Object.keys(list.Data).filter((item) =>
      Object.values(item).join("").toLowerCase().includes(searchValue.toLowerCase())
  
  )
  setFilteredResults(filteredData);
  } else {

    setFilteredResults(Object.keys(list.Data));
    }
  };
  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" +
            API_KEY
        );
        const json = await response.json();
        setList(json);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchAllCoinData().catch(console.error);
    // console.log(list.Data);
  }, []);
  console.log(list.Data);
  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input type="text" placeholder="Search.." onChange={(inputString) => searchItems(inputString.target.value)} />
        <ul>
          {list.Data &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                // <li key={list.Data[coin].FullName}>
                //   {list.Data[coin].FullName}
                // </li>
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )}
        </ul>
      </div>
    </>
  );
}

export default App;
