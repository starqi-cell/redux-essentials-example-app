import hyRequest from '@/service' 

// 获取通知数据，支持可选的since参数来获取新通知
export function getNotice(since?: string){
    // 构建查询参数
    const queryParams = since ? `?since=${encodeURIComponent(since)}` : ''
    return hyRequest.get({
        url: `/fakeApi/notifications${queryParams}`
    })
}