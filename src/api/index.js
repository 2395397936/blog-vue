import requests from './ajax'

export const getArticles = (params) => requests({url: 'blog/public/getArticles', method: 'post', data:params})

export const getArticleCount = () => requests({url: 'blog/public/getArticleCounts', method: 'post'})

export const getArchive = () => requests({url: 'blog/public/getArchives', method: 'post'})

export const getByYearAndMonth = (params) => requests({url: 'blog/public/getByYearAndMonth', method: 'post',data:params})

export const register = (params) => requests({url: 'user/register', method: 'post',data:params})

export const registerAdmin = (params) => requests({url: 'user/public/registerAdmin', method: 'post',data:params})

export const forget = (params) => requests({url: 'user/public/forget', method: 'post',data:params})

export const logout = () => requests({url: 'logout', method: 'post'})

export const getNewArticles = () => requests({url: 'blog/public/getNewArticles', method: 'post'})

export const getArticleBody = (param) => requests({url: 'blog/public/view/'+param, method: 'post'})

export const getComments = (param) => requests({url: 'blog/public/comments/'+param, method: 'post'})

export const comment = (param) => requests({url: 'blog/comment', method: 'post',data:param})

export const getCategories = () => requests({url: 'blog/public/getCategories', method: 'post'})

export const getAllTags = () => requests({url: 'blog/public/getAllTags', method: 'post'})

export const deleteArticle = (param) => requests({url: 'blog/deleteArticle/'+param, method: 'post'})

export const publish = (param) => requests({url: 'blog/publish', method: 'post',data:param})

export const sendEmail = (param) => requests({url: 'email/send', method: 'post',data:param})

export const modify = (param) => requests({url: 'user/modify', method: 'post',data:param})

export const modifyPassword = (param) => requests({url: 'user/modifyPassword', method: 'post',data:param})

export const modifyAvatar = (param) => requests({url: 'user/modifyAvatar', method: 'post',data:param})

export const getByTagOrCategory = (by,id,param) => requests({url: 'blog/public/getBy'+by+'/'+id, method: 'post',data:param})

export const getTagOrCategoryById = (by,param) => requests({url: 'blog/public/get'+by+'ById/'+param, method: 'post'})

export const getSelfArticle = () => requests({url: 'blog/getSelfArticle', method: 'post'})

export const updateArticle = (id,param) => requests({url: 'blog/updateArticle/'+id, method: 'post',data:param})

export const searchArticle = (name,param) => requests({url: 'blog/public/searchArticle/'+name, method: 'post',data:param})

