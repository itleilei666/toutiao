const key = 'jeek-heima'
export const setToken = (token) => {
  localStorage[key] = token
}
export const getToken = () => localStorage[key]
export const removeToken = () => localStorage.removeItem(key)
