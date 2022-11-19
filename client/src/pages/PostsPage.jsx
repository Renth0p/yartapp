import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import PostItem from "../components/PostItem";

function PostsPage() {
    const [posts, setPosts] = useState([])
    const fetchMyPosts = async () => {
        try {
            const {data} = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div className={'w-1/2 mx-auto py-10 flex-col gap-10'}>
            {posts?.map((post,idx) => <PostItem key={idx} post={post} />)}
        </div>
    );
}

export default PostsPage;