import './cities.css';
import React,{useState} from 'react';
import {cities} from './citiesData.js'


function CitiesOptions(props)  {
  
    const filterText = props.filterText;

    let cards = []; // ebbe töltjük fel a select Options listet
     props.cities.map( (city) =>  {
            if ( !(!city.name.toLowerCase().startsWith(filterText.toLowerCase()) || filterText === ''))
              cards.push( <option key={city.name} value={city.name}>{city.name}</option> );

              return '';
          });
  console.log('cards.length=',cards.length);

  // ha 0-la option van akkor eltüntetjük, ha több mint nulla akkor megjelenitjük
  let citylist =document.getElementById('cityList');
 

  if ( !(citylist === null))
     cards.length ===0 
            ? citylist.classList.add('hide')
            :citylist.classList.remove('hide')
      
  
    return ( cards.map( (e)=> e)  );
}

/* input search feltötlti a select option list-et*/
function SearchBar(props){
   const handleFilterTextChange = (e) => props.onFilterTextChange(e.target.value);    
    return (<>
                  <p>Search city</p>
                  <input
                      id="searchInput"
                      type="text"
                      placeholder="enter city name..."
                      value={props.filterText}
                      onChange={handleFilterTextChange}
                  />
            </>
   
     
    );
    
}

function FilterableCitiesTable(props)  {

  const [filterText,setFilterText] = useState('');
  const handleFilterTextChange = (filterText) => setFilterText(filterText);
      
    return (
     
            <div className="cities-optionlist" >
                  <SearchBar
                      filterText={filterText}
                      onFilterTextChange={handleFilterTextChange}
                    />
            
                    <select className="hide" 
                            key="otherCities"
                            data-id={filterText} 
                            id="cityList" 
                            size="4" 
                            onChange={(e) => props.CitySearch(e)  } 
                    >
                        <CitiesOptions 
                          cities={props.cities}
                          filterText={filterText}
                        />
                    </select>
           
          </div>

    
    );
  
}
const CITIES = cities;

// Ez van meghívva az App.js-be
function Othercities(props) {

  return (
       <FilterableCitiesTable 
         cities={CITIES}
        //  átadjuk a FilterableCitiesTable-nek
         CitySearch={props.CitySearch}
       />
  );
}

export default Othercities;
