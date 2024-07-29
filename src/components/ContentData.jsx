import React, { useState, useEffect } from 'react';
import '../App.css'
import Dropdown from './Dropdown';
import Search from './Search';
import PostTab from './PostTab';
import { options, options2, options3, src } from '../lib/data';
import Navbar from './Navbar';

function ContentData() {
  const [open, setOpen] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]); 
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState([]);
  const [typeOption, setTypeOption] = useState('popular-posts');

  const toggleSidebar = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    let filteredPosts = [...totalPosts];

    // Apply search filter
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply multiple filters
    if (filterOption.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        filterOption.includes(post.postType)
      );
    }

    // Apply sort filter
    switch (sortOption) {
      case 'Likes':
        filteredPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'Comments':
        filteredPosts.sort((a, b) => b.comments - a.comments);
        break;
      case 'Newest':
        filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Oldest':
        filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'Reposts':
        filteredPosts.sort((a, b) => b.shares - a.shares);
        break;
      default:
        break;
    }

    setPosts(filteredPosts);
  }, [searchQuery, sortOption, filterOption, totalPosts]);

  return (
    <div className={`App-header transition-all duration-300 fixed top-0 ${open ? 'right-0' : 'right-[-450px]'}`}>
      <div className='button' onClick={toggleSidebar}>
        <img src={src} alt="logo" className='logo' />
      </div>
      <div className='content flex flex-col'>
        <Navbar />
        <div className='w-full flex items-center justify-between px-4 py-2'>
          <Dropdown dropdown="post" options={options3} selectedOption={typeOption} setSelectedOption={setTypeOption} />
          <div className='border border-black font-semibold text-sm rounded-lg flex items-center justify-center text-black px-6 py-2'>
            <span>Shuffle</span>
          </div>
        </div>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className='w-full flex items-center justify-between px-4 py-2'>
          <Dropdown dropdown="All posts" options={options} selectedOption={filterOption} setSelectedOption={setFilterOption} />
          <Dropdown dropdown="Sort" options={options2} selectedOption={sortOption} setSelectedOption={setSortOption} />
        </div>
        <PostTab posts={posts} setPosts={setPosts} setTotalPosts={setTotalPosts} typeOption={typeOption} />
      </div>
    </div>
  );
}

export default ContentData;
