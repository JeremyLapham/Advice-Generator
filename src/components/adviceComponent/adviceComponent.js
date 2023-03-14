import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { GetData, OnLoadGet } from '../Services/DataService';
import './advice.css';

export default function Advice() {
    const [advice, setAdvice] = useState('');
    const [countdown, setCountdown] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const fetchData = async () => {
        setDisabled(true);
        setCountdown(true);
        const adviceData = await GetData();
        setAdvice(adviceData);
        setTimeout(() =>{ 
            setCountdown(false)
            setDisabled(false);
        }, 2000);
    };

    useEffect(async () => {
        const adviceData = await OnLoadGet();
        setAdvice(adviceData);
    }, []);

    return (
        <div className='background'>
            <Container>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <div className='box relative'>
                            <p className='wordColor text-center'>Advice #{advice.id}</p>
                            <p className='adviceWordStyle text-center'>"{advice.advice}"</p>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='deskDivide'></div>
                        <div className='mobileDivide'></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className='d-flex justify-content-center'>
                       <button className={`dice ${countdown ? 'countdown' : ''}`} onClick={fetchData} disabled={disabled}></button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}