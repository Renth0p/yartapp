import React, {useCallback, useState, useEffect} from 'react';
import Moment from "react-moment";
import {AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete} from "react-icons/ai";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {removePost} from "../redux/features/post/postSlice";
import {toast} from "react-toastify";
import {createComment} from "../redux/features/comment/commentSlice";

function PostPage() {

    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const { user } = useSelector((state) => state.auth)

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Пост был удален')
            navigate('/posts')
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({postId, comment}))
            setComment('')
        } catch (e) {
            console.log(e)
        }
    }
    
    const fetchMyPost = useCallback(async() =>  {
        const {data} = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchMyPost()
    }, [])

    if(!post) {
        return (
            <div className={'text-xl text-center text-white py-10'}>
                Загружаю...
            </div>
        )
    }

    return (
        <div>
            <button className={'flex justify-center items-center bg-gray-600 text-sx text-white rounded-sm py-2 px-4'}>
                <Link to={'/'}>Назад</Link>
            </button>

            <div className={'flex gap-10 py-8'}>
                <div className={'w-2/3 '}>
                    <div className={'flex flex-col basis-1/4 flex-grow'}>
                        <div className={ post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm' }>

                            {
                                post.imgUrl && (
                                    <img src={`http://localhost:3002/${post.imgUrl}`} alt="img" className={'object-cover w-full'}/>
                                )
                            }

                        </div>
                    </div>
                    <div className={'flex justify-between items-center pt-4 pb-3'}>
                        <div className={'text-xs text-white opacity-40'}>{post.username}</div>
                        <div className={'text-xs text-white opacity-40'}><Moment date={post.createdAt} format={'D MMM YYYY'} /></div>
                    </div>
                    <div className={'text-white text-xl'}>{post.title}</div>
                    <p className={'text-white opacity-60 text-xs pt-4'}>{post.text}</p>

                    <div className={'flex gap-3 items-center mt-3 justify-between'}>

                        <div className={'flex gap-3 mt-4'}>
                            <button className={'flex justify-between items-center gap-2 text-base text-white opacity-50'}>
                                <AiFillEye/> <span>{post.views}</span>
                            </button>
                            <button className={'flex justify-between items-center gap-2 text-base text-white opacity-50'}>
                                <AiOutlineMessage/> <span>{post.comments?.length || 0}</span>
                            </button>
                        </div>

                        {
                            user?._id === post.author && (
                                <div className={'flex gap-3 mt-4'}>
                                    <button className={'flex justify-between items-center gap-2 text-xl text-white opacity-50'}>
                                        <Link to={`/${params.id}/edit`}>
                                            <AiTwotoneEdit />
                                        </Link>
                                    </button>
                                    <button onClick={removePostHandler} className={'flex justify-between items-center gap-2 text-xl text-white opacity-50'}>
                                        <AiFillDelete/>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={'w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'}>
                    <form className={'flex gap-2'} onSubmit={(e) => e.preventDefault()}>
                        <input type="text"
                               value={comment}
                               onChange={(e) => setComment(e.target.value)}
                               placeholder={'Comment'}
                               className={'text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'}
                        />
                        <button type={"submit"}
                                onClick={handleSubmit}
                        className={'flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'}>
                            Добавить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostPage;