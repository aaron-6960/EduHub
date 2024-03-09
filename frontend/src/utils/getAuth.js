const getAuth = () => {
    const auth = localStorage.getItem('auth')

    if (auth) {
        return JSON.parse(auth)
    } else {return auth}
}

export default getAuth