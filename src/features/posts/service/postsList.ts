import { createAsyncThunk,createEntityAdapter } from '@reduxjs/toolkit'
import hyRequest from '@/service' 



export function getPosts(){
    return hyRequest.get({
        url:'/fakeApi/posts'
    })
}

export function addPost(postData: { title: string; content: string; userId: string }) {
  const { userId, ...rest } = postData
  
  return hyRequest.post({
    url: '/fakeApi/posts',
    data: {
      ...rest,
      user: userId 
    }
  })
}