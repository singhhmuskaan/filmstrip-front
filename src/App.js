import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function App() {
    const [slides, setSlides] = useState([]);
    const [selectedSlide, setSelectedSlide] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3000')
            .then(response => response.json())
            .then(data => {
                setSlides(data);
                setSelectedSlide(data[0]); // Set the first slide as the default selected slide
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const imageBaseUrl = 'http://127.0.0.1:3000/images/';

    const handleImageClick = (slide) => {
        setSelectedSlide(slide);
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    const CustomLeftArrow = ({ onClick }) => {
        return <button onClick={onClick} className="custom-left-arrow">{'<'}</button>;
    };

    const CustomRightArrow = ({ onClick }) => {
        return <button onClick={onClick} className="custom-right-arrow">{'>'}</button>;
    };

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Row>
                        {selectedSlide && (
                            <>
                                <Col xs={6}>
                                    <img height="400px" src={`${imageBaseUrl}${selectedSlide.image}`} alt={selectedSlide.title} />
                                </Col>
                                <Col xs={4}>
                                    <p><Badge bg="secondary">TITLE</Badge> {selectedSlide.title}</p>
                                    <p><Badge bg="secondary">DESCRIPTION</Badge> {selectedSlide.description}</p>
                                    <p><Badge bg="secondary">COST</Badge> {selectedSlide.cost}</p>
                                    <p><Badge bg="secondary">THUMBNAIL FILE</Badge> {selectedSlide.thumbnail}</p>
                                    <p><Badge bg="secondary">IMAGE FILE</Badge> {selectedSlide.image}</p>
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row className="mt-5">
                        <Carousel
                            responsive={responsive}
                            customLeftArrow={<CustomLeftArrow />}
                            customRightArrow={<CustomRightArrow />}
                            ssr
                            infinite
                            keyBoardControl
                            containerClass="carousel-container"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {slides.map((slide, index) => (
                                <Card
                                    key={index}
                                    style={{ width: '18rem', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(slide)}
                                    className={selectedSlide && selectedSlide.id === slide.id ? 'selected' : ''}
                                >
                                    <Card.Img variant="top" src={`${imageBaseUrl}${slide.image}`} alt={slide.title} />
                                    <Card.Body>
                                        <Card.Title>{slide.id}</Card.Title>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Carousel>
                    </Row>
                </Container>
            </header>
        </div>
    );
}

export default App;
