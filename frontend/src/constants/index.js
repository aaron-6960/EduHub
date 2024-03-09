const navbarLinks = [
    {title:'Home',link:'/'},
    {title:"Dashboard", link: "/dashboard"},
    {title:"Ask", link: "/ask"},
    {title:"Chat", link:"/chat"}
]

const footerItems = [
    {title:"About", link:""},
    {title:"Privacy Policy", link:""},
    {title:"Contact", link:""}
]

const graphItems = ['LAC','Chemistry','BME','BCE','Graphics']

const graphItemColors = {
    LAC: "#1f72de",
    Chemistry: "#069e16",
    BME: "#cf1f1f",
    BCE: "#e0c424",
    Graphics: "#b51abd",
}

const profileColleges = ['--- Select A College ---','Govt. Model Engineering College','test','test2']

const profileSemesters = ['--- Select A Semester ---','1','2','3','4','5','6','7','8']

const apiBase = import.meta.env.VITE_API_URL


export {navbarLinks,apiBase,footerItems, graphItems, graphItemColors, profileColleges, profileSemesters}