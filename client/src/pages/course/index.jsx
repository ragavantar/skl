import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, getMyCourses } from '../../services';

import './styles.css';

const Course = () => {
    let { id } = useParams();
    let [data, setData] = useState({});

    useEffect(() => {
        // check course is purchased
        if (!getMyCourses().includes(id))
            setData({ title: "You have not purchased this course" })
        else
            getCourseById(id).then(setData);
    }, [])


    const getFormattedLink = (link) => `https://www.youtube.com/embed/${link.split('/')[3]}`

    const { thumbnailURL, title, videoLink = [] } = data;
    return (
        <div className="coursePage">
            <div><Link to="/dashboard">Go Back To DashBoard</Link></div>
            <h2>{title}</h2>
            <img src={thumbnailURL} />
            <h3>Course Videos</h3>
            {videoLink.map(link =>
                <iframe
                    key={link}
                    src={getFormattedLink(link)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            )}
        </div>
    );
}

export default Course;