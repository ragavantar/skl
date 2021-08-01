import './styles.css';

const CourseCard = ({ price, thumbnailURL, title, buyHandler }) => {
    return (
        <div className="courseCard">
            <img src={thumbnailURL} alt={title} />
            <div>
            <div>{title}</div>
            <div>Price: {price}</div>
            {buyHandler &&
                <button onClick={buyHandler}>Buy</button>
            }
            </div>
        </div>
    );
}

export default CourseCard;