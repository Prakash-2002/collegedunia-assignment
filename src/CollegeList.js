
import React, { useState, useEffect } from 'react';


const initialColleges = [
    {rank:"1", name: "IIT Bombay", location: "Mumbai, Maharashtra", course: "BE/B.Tech", fees: "1,49,000", userReviews: "8.1/10", ranking: "#24", featured: false },
    {rank:"2", name: "IIT Madras", location: "Chennai, Tamil Nadu", course: "BE/B.Tech", fees: "2,29,300", userReviews: "8.8/10", ranking: "#3", featured: true },
    {rank:"3", name: "NIT Trichy", location: "Tiruchirappalli, Tamil Nadu", course: "BE/B.Tech", fees: "1,85,000", userReviews: "8.5/10", ranking: "#5", featured: false },
    {rank:"4", name: "BITS Pilani", location: "Pilani, Rajasthan", course: "BE/B.Tech", fees: "3,00,000", userReviews: "9.0/10", ranking: "#2", featured: true },
    {rank:"5", name: "IIT Delhi", location: "New Delhi, NCR", course: "BE/B.Tech", fees: "2,10,000", userReviews: "8.4/10", ranking: "#6", featured: false },
    {rank:"6", name: "VIT Vellore", location: "Vellore, Tamil Nadu", course: "BE/B.Tech", fees: "2,50,000", userReviews: "8.2/10", ranking: "#8", featured: false },
    {rank:"7", name: "IIIT Hyderabad", location: "Hyderabad, Telangana", course: "BE/B.Tech", fees: "2,20,000", userReviews: "8.9/10", ranking: "#4", featured: true },
    {rank:"8", name: "NIT Warangal", location: "Warangal, Telangana", course: "BE/B.Tech", fees: "1,80,000", userReviews: "8.7/10", ranking: "#9", featured: false },
    {rank:"9", name: "SRM Institute of Science and Technology", location: "Chennai, Tamil Nadu", course: "BE/B.Tech", fees: "2,80,000", userReviews: "8.3/10", ranking: "#10", featured: true },
    {rank:"10", name: "Thapar Institute of Engineering and Technology", location: "Patiala, Punjab", course: "BE/B.Tech", fees: "2,75,000", userReviews: "8.0/10", ranking: "#11", featured: false },
    {rank:"11", name: "PSG College of Technology", location: "Coimbatore, Tamil Nadu", course: "BE/B.Tech", fees: "2,00,000", userReviews: "8.6/10", ranking: "#12", featured: false },
    {rank:"12", name: "NIT Surathkal", location: "Surathkal, Karnataka", course: "BE/B.Tech", fees: "1,95,000", userReviews: "8.9/10", ranking: "#13", featured: true },
    // Add more colleges here
  
  ];
  
const CollegeList = () => {
    const [colleges, setColleges] = useState(initialColleges);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // You have reached the bottom of the page
        setLoading(true);
        // Simulate loading more data with a delay
        setTimeout(() => {
          setLoading(false);
          // Add more data here, for example:
          // const newData = [...colleges, ...moreColleges];
          // setColleges(newData);
        }, 1000);
      }
    };
  
    // Sort by collegedunia rating
    const sortByRating = (order) => {
      const sortedColleges = [...colleges].sort((a, b) => {
        const ratingA = parseFloat(a.userReviews);
        const ratingB = parseFloat(b.userReviews);
        return order === "asc" ? ratingA - ratingB : ratingB - ratingA;
      });
      setColleges(sortedColleges);
    };
  
    // Sort by fees
    const sortByFees = (order) => {
      const sortedColleges = [...colleges].sort((a, b) => {
        const feesA = parseInt(a.fees.replace(/,/g, ''));
        const feesB = parseInt(b.fees.replace(/,/g, ''));
        return order === "asc" ? feesA - feesB : feesB - feesA;
      });
      setColleges(sortedColleges);
    };
  
    // Search by college name
    const searchByName = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
    };
    const filteredColleges = colleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm)
    );
  return (
    <div>
<div className='conntainers'>
<div className='search-box'>
             {/* Input field for search */}
     <input type="text" id="search-input" placeholder="Search by college name" onChange={searchByName} />

        </div>
        
        <div className='sort-option'>
{/* Buttons for sorting */}
<h4 className='sortby'>Sort By</h4>
<button onClick={() => sortByRating('asc')}>Rating ↓</button>
<button onClick={() => sortByRating('desc')}>Rating  ↑ </button>
<button onClick={() => sortByFees('asc')}>Fees ↓</button>
<button onClick={() => sortByFees('desc')}>Fees  ↑ </button>
        </div>
    

</div>
        


{/* Table for displaying colleges */}
<table id="college-table">
  <thead>
    <tr>
    <th>CD Rank</th>
      <th>College Name</th>
      <th>Location</th>
      <th>Course</th>
      <th>Fees</th>
      <th>User Reviews</th>
      <th>Ranking</th>
      <th>Featured</th>
    </tr>
  </thead>
  <tbody id="college-list">
  {filteredColleges.map(college => (
      <tr key={college.name}>
         <td>{college.rank}</td>
        <td>{college.name}</td>
        <td>{college.location}</td>
        <td>{college.course}</td>
        <td>{college.fees}</td>
        <td>{college.userReviews}</td>
        <td>{college.ranking}</td>
        <td>{college.featured ? 'Featured' : ''}</td>
      </tr>
    ))}
     {loading && <tr><td colSpan="7">Loading...</td></tr>}
  </tbody>
</table>  
    </div>
  )
}

export default CollegeList
