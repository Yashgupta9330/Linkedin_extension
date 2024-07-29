import React, { useState } from 'react';
import ReactTimeago from 'react-timeago';
import { Profile } from './Profile';
import PostContent from './PostContent';
import HeartIcons from './icons/Hearticons';
import MessageIcons from './icons/MessageIcons';
import ShareIcons from './icons/Shareicons';

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate content to the first 50 words
  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length <= wordLimit) return content;
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  // Check if content length exceeds 50 words
  const shouldShowReadMore = post.content.length > 10;

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };


  const handleCopyUrl = (data) => {
    navigator.clipboard.writeText(data).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  };



  return (
    <div className="w-full bg-white my-2 border border-gray-300 rounded-[10px]">
      <div className="flex gap-2 p-4">
        <Profile src={post.avatar} />
        <div className="flex items-center justify-between w-full">
          <div className='text-black'>
            <h1 className="text-sm font-bold">{post.name}</h1>
            <p className="text-xs text-gray-500">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
          <span className='border bg-green-300 rounded-lg p-1 text-black text-sm'>{post.postType}</span>
        </div>
      </div>
      {/* Post Content */}
      <div className="px-4 py-2 text-black">
        <PostContent content={isExpanded ? post.content : truncateContent(post.content, 10)} />
        {shouldShowReadMore && (
          <button 
            onClick={handleToggleContent} 
            className="text-blue-600 text-sm mt-2"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
      <div className="px-4 py-2 text-black border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center justify-center w-5 h-5">
              <HeartIcons className="w-4 h-4" />
              <span className="sr-only">Like</span>
            </div>
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center justify-center w-5 h-5">
              <MessageIcons className="w-4 h-4" />
              <span className="sr-only">Comment</span>
            </div>
            <span>{post.comments}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center justify-center w-5 h-5">
              <ShareIcons className="w-4 h-4" />
              <span className="sr-only">Share</span>
            </div>
            <span>{post.shares}</span>
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-between p-4'>
        <a href={post.url} className='flex items-center justify-center gap-1'>
          <span className='text-blue-600 text-sm'>View</span>
        </a>
        <div className='flex items-center justify-center gap-1 cursor-pointer' onClick={()=>handleCopyUrl(post.url)}>
          <span className='text-blue-600 text-sm'>URL</span>
        </div>
        <div className='flex items-center justify-center gap-1 cursor-pointer' onClick={()=>handleCopyUrl(post.embedUrl)}>
          <span className='text-blue-600 text-sm'>Embed</span>
        </div>
        <div className='flex items-center justify-center gap-1 cursor-pointer' onClick={()=>handleCopyUrl(post.content)}>
          <span className='text-blue-600 text-sm'>Copy</span>
        </div>
      </div>
    </div>
  );
};


export default Post;
