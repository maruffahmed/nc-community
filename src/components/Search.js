import React,{useState, useEffect} from 'react';
import Header from './lib/Header';
import Footer from './lib/Footer';
import SearchResult from './utils/SearchResults';
import SearchForm from './utils/SearchForm';
import axios from 'axios'

const Search = () => {

    let [searchQuery, setSearchQuery] = useState({
        id : '',
        year : '2020',
        semester : 'Fall',
        type : 'Online'
    })
    let [resultPage, setResultPage] = useState(0);
    let [searchData, setSearchData] = useState([]);

    // Fetching data
    useEffect(() => {
        if(resultPage){
            let course = searchQuery.id.toUpperCase().split(' ');
            console.log(course)
            axios.get("http://localhost:3000/cccourse/find",{
                params : {
                    "ClassID" : course[1],
                    "CourseSubject" : course[0],
                    "classType" : searchQuery.type
                }
            })
            .then(res => {
                setSearchData(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[resultPage])

    return (
        <>
            <Header/>
                {
                    resultPage == 0 ? (
                        <SearchForm 
                            searchQuery = {searchQuery}
                            setSearchQuery = {setSearchQuery}
                            setResultPage = {setResultPage}
                        />
                    ) : 
                    (
                        <SearchResult searchQuery = {searchQuery} searchData = {searchData} setSearchQuery = {setSearchQuery} setResultPage = {setResultPage}/>
                    )
                }
            <Footer/>
            
        </>
    );
}

export default Search;