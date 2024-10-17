import { useEffect, useState } from "react";
import "./App.css";
import CoinInfo from "./components/CoinInfo";
import SideNav from "./components/SideNav";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Search and filter function
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((coin) =>
        list.Data[coin].FullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        list.Data[coin].Symbol.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  // Fetch data from API
  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?&api_key=${API_KEY}`
        );
        const json = await response.json();
        setList(json);
        setFilteredResults(Object.keys(json.Data)); // Initialize filtered results
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchAllCoinData();
  }, []);

  return (
    <>
      <div className="whole-page">
        <h1>Crypto Broski</h1>
        <h3>Track the latest prices and trends in the crypto world!</h3>
        <input
        className="search-bar"
          type="text"
          placeholder="Search.."
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
        />
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((coin) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={list.Data[coin].Symbol}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )
            : list.Data &&
              Object.entries(list.Data).map(([coin]) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={list.Data[coin].Symbol}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )}
        </ul>
      </div>
      <SideNav  />
    </>
  );
}

export default App;
