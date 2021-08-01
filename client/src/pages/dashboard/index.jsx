import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import CourseCard from '../../components/CourseCard';

import { getAllCourses, getMyCourses } from '../../services';


const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getAllCourses().then(setCourses);
        setMyCourses(getMyCourses());
    }, [])

    const buyHandler = (id) => history.push(`/payment/${id}`)

    return (
        <div className="dashboard">
            <h2>My Courses</h2>
            <div className="courseContainer">
                {
                    myCourses.length > 0 ?
                        courses
                            .filter(({ id }) => myCourses.includes(id))
                            .map(course => <Link key={course.id} to={`/course/${course.id}`}><CourseCard {...course} /></Link>)
                        :
                        <div>No courses have been purchased</div>
                }
            </div>
            <h2>Available Courses</h2>
            <div className="courseContainer">
                {
                    courses
                        .filter(({ id }) => !myCourses.includes(id))
                        .map(course => <CourseCard key={course.id} {...course} buyHandler={() => buyHandler(course.id)} />)
                }
            </div>
        </div>
    );
}

export default Dashboard;