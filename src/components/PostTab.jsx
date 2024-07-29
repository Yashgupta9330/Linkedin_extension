import { useEffect, useState } from "react";
import Post from "./Post";

const PostTab = ({ posts, setPosts, setTotalPosts, typeOption }) => {
    const [loading, setLoading] = useState(true); // State for loading status

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch(`http://localhost:4000/api/posts?type=${typeOption}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                setPosts(data);
                setTotalPosts(data);
                console.log('Fetched Posts:', data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        }
        
        fetchPosts();
    }, [typeOption, setPosts, setTotalPosts]);

    return (
        <div className='w-full flex flex-col items-center px-4 py-2 overflow-x-hidden'>
            {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="loader">Loading...</div> {/* Loading indicator */}
                </div>
            ) : (
                posts?.map((post, index) => (
                    <Post post={post} key={index} />
                ))
            )}
        </div>
    );
}

export default PostTab;
