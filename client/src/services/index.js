export const getAllCourses = async () => {
    try{
        let resp = await fetch(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json`);
        let data = await resp.json();
        localStorage.setItem('allCourses', JSON.stringify(data));
        return data;
    }
    catch(err) { 
        console.error(err)
        return []
    }
}

export const getCourseById = async (id) => {
    let allCourses = JSON.parse(localStorage.getItem('allCourses'));
    if(!allCourses)
    allCourses = await getAllCourses();
    return allCourses.find(course => course.id == id) || {title: 'No Course Found'}
}

export const getMyCourses = () => JSON.parse(localStorage.getItem('myCourses')) || [];