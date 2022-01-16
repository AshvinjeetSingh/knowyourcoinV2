import axios from 'axios'
import React,{useState,useEffect,useRef} from 'react'
import {useGetSuggestionQuery} from '../services/cryptoAPI'
import { Link } from 'react-router-dom'
import { set } from 'lodash'
import { useNavigate  } from "react-router-dom";
function useOutsideAlerter(ref) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        const rows = document.getElementById('ListCoins')
        if(rows!=null && rows != undefined)
        { 
          rows.style.display="block"
          
          // alert("hello tehre")
        }
          if (ref.current && !ref.current.contains(event.target)) {
              // alert("You clicked outside of me!");
              const rows = document.getElementById('ListCoins')
              rows.style.display="none"
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
}

const Autosuggest = (props) => {
  const history = useNavigate ();
  const [searchTerm, setSearchTerm] = useState("");
  const [coins,setCoins]=useState([])
  const [matchCoins,setMatchCoins]=useState([])
  const { data: suggestionList, isLoading } = useGetSuggestionQuery(searchTerm);
  const [list, setList] = useState([]);


  const node = useRef(null);
  const elem= useRef()
  useOutsideAlerter(node);
  useEffect(() => {
    setMatchCoins([])
    setList(suggestionList?.data?.coins);
  }, [suggestionList, searchTerm]);


  useEffect(() => {
    
    function handleClickOutside(event) {
      const rows = document.getElementById('ListCoins')
      if(rows!=null && rows != undefined)
      { 
        rows.style.display="block"
      }
        if (node.current && !node.current.contains(event.target)) {
            const rows = document.getElementById('ListCoins')
            rows.style.display="none"
            setSearchTerm('')
        }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [node]);
  
  useEffect(()=>{
    const data = list && list.length>0 && list.map((item)=>item.name.replace(/\s+/g, '-').replace(/\./g,'-').trim())
    setCoins(data)
  },[list])

  const onTextChanged=(e)=>{
    
    const value=e.target.value
    let suggestion=[]
    if(value.length>0){
      const regex= new RegExp(`^${value}`,'i') 
      suggestion=coins&& coins.length>0 && coins
    }
    console.log("suggestion",suggestion)
    setSearchTerm(value)
    setMatchCoins(suggestion)
  }

  const suggestionSelectedValue=(value)=>{
    setSearchTerm(value)
      setMatchCoins([])
      history(`/coins/${value}`)
  }

  const renderSuggestions=()=>{
    if(matchCoins.length<=0){
      return <div className="ListCoinsNoRecord" id="ListCoins" ref={node}>
          <p>No record found</p>
        </div>
        
    }
    else{
      return  <div  className="ListCoins" id="ListCoins" ref={node}>
        {
          
          matchCoins && matchCoins.length && matchCoins.map((item)=>{
          return  <p ref={elem} id="pval" className="autoSuggestValues" onClick={()=>suggestionSelectedValue(item)} style={{maxWidth: '100%',cursor:'pointer',border:"1px solid black",margin:"0px"}}>
                       {item}
                    </p>
                  
            })
        }
      </div>
    }
  }
  
  return (
    <>
      <div  id="searchBar" >
      <input value={searchTerm} type="text" placeholder="Search Your Coin" onChange={onTextChanged} className="searchCoinInput"/>
      {searchTerm.length>0 && 
        
          
          renderSuggestions()
        
      }
        {/* <span id="searchIcon">
          <Icon icon={searchAlt} style={{color: '#7666E4',fontSize: '30px'}} hFlip={true} />
        </span> */}
      </div>
    </>
  )
}


export default Autosuggest
