import React, { useEffect, useState } from 'react';
import './styles.css';

import { Link } from 'react-router-dom';

import CourseCard from '../../components/CourseCard';

import { getAllCourses } from '../../services';


const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);

    // useEffect(()=>{
    //     fetch(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         setCourses(data);
    //         localStorage.setItem('allCourses', JSON.stringify(data));
    //     })
    //     .catch(err => console.error(err))
    // }, [])

    useEffect(()=>{
        getAllCourses().then(setCourses);
    }, [])

    useEffect(()=> {
        let data = localStorage.getItem('myCourses');
        if(data) setMyCourses(data);
    }, [])

    const buyHandler=()=>{
        window.location.href = "/payment"
    }

    return ( 
        <div className="dashboard">
            <h2>My Courses</h2>
            <div className="courseContainer">
            {
                courses
                .filter(({id}) => myCourses.includes(id))
                .map(course => <Link to={`/course/${course.id}`}><CourseCard key={course.id} {...course} /></Link>)
            }
            </div>
            <h2>Available Courses</h2>
            <div className="courseContainer">
            {
                courses
                .filter(({id}) => !myCourses.includes(id))
                .map(course => <CourseCard key={course.id} {...course} buyHandler={buyHandler} />)
            }
            </div>
        </div>
     );
}
 
export default Dashboard;