import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NewsCard from '../Components/NewsCard';
import { useSearch } from "../Contexts/SearchContext";
import { Typography, Box } from "@mui/material";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchquery } = useSearch();
  
 
  useEffect(() => {
    console.log("Current search query:", searchquery);
  }, [searchquery]);
  
  const fetchData = async (retryCount = 0) => {
    try {
      setLoading(true);
      const response = await axios.get('https://newsdata.io/api/1/news?apikey=pub_560273712d33d2a388df314ffee7d0de9685e&q=top%20news');
      console.log("response:", response.data);
      setData(response.data.results)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

 
  const filteredData = useMemo(() => {
    if (!searchquery || searchquery.trim() === '') {
      return data;
    }
    
    const query = searchquery.toLowerCase().trim();
    console.log("Filtering with query:", query);
    
    const filtered = data.filter(article => {
      
      const titleMatch = article.title ? article.title.toLowerCase().includes(query) : false;
      const descMatch = article.description ? article.description.toLowerCase().includes(query) : false;
      const contentMatch = article.content ? article.content.toLowerCase().includes(query) : false;
      
      return titleMatch || descMatch || contentMatch;
    });
    
    console.log("Filtered results:", filtered.length, "articles");
    return filtered;
  }, [data, searchquery]);
  
  return (
    <div className="container mx-auto px-4">

  {searchquery && searchquery.trim() !== '' && (
    <Box sx={{ padding: 2, margin: '100px auto 0', textAlign: 'center' }}>
      <Typography variant="h6">
        {filteredData.length > 0 
          ? `Found ${filteredData.length} results for "${searchquery}"`
          : `No results found for "${searchquery}"`}
      </Typography>
    </Box>
  )}
  

  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5">
    {!loading && filteredData.map((value, index) => (
      <NewsCard key={index} article={value} />
    ))}
  </div> 
  
  
   {!loading && filteredData.length === 0 && searchquery && (
    <div className="w-full text-center p-4">
      No articles found matching your search. Try different keywords.
    </div>
  )}
</div>
  );
};

export default HomePage;