import { createAsyncThunk } from '@reduxjs/toolkit'
import hyRequest from '@/service' 


export function getUsers(){
    return hyRequest.get({
        url:'/fakeApi/users'
    })
}