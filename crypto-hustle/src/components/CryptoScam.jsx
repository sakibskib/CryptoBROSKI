import React, { Component, useEffect, useState} from "react";

const CryptoScam = () => {
    const [scamList, setScamList] = useState([]);

    useEffect(() => {
        const getScams= async () =>{
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            try {
               
                const response = await fetch(
                    "https://api.cryptoscamdb.org/v1/scams", requestOptions
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                console.log(json);
                setScamList(json);
            } catch (error) {
                console.error('Fetch error: ', error);
            }
        };
        getScams();
    }, []);
    console.log(scamList);
    return(
        <div>
             Here is a list of coins and platforms involved in recent crypto-related scams:
             <ul className="side-list">
                {scamList && scamList.result && scamList.result.map((scam) => 
                <li key={scam.name}>{scam.name}</li>    
            )}
             </ul>
        </div>
    )
};
export default CryptoScam;