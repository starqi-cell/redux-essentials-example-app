import hyRequest from '@/service' 

export function getNotice(since?: string){
    const queryParams = since ? `?since=${encodeURIComponent(since)}` : ''
    return hyRequest.get({
        url: `/fakeApi/notifications${queryParams}`
    })
}