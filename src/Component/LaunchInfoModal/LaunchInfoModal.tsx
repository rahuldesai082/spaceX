import React, { FunctionComponent } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/esm/Alert';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { launchDetailsObject } from '../../Utils/Interface';

import Button from 'react-bootstrap/esm/Button';

import {ImWikipedia} from 'react-icons/im'
import {SlSocialYoutube} from 'react-icons/sl'

import './LaunchInfoModal.scss';

interface LaunchInfoModalProps {
    isLoading: boolean,
    error?: string,
    showModal: boolean,
    launchDetails: launchDetailsObject | null,
    hideDetails: () => void,
}
 
const LaunchInfoModal: FunctionComponent<LaunchInfoModalProps> = ({showModal, launchDetails, isLoading, hideDetails}) => {
    return <Modal className='launchDetailsModal' centered show={showModal} onHide={() => hideDetails()}>
        {
            isLoading ? <AiOutlineLoading3Quarters className='loader' size='24px'/> : <>
                <Modal.Body>
                    <Button type="button" className="btn-close" aria-label="Close" onClick={()=>hideDetails()}/>
                    <Row>
                        <img className='launchBadge' src={launchDetails?.mission_patch} alt ='launch Icon'/>
                        <Col>
                            <div className="launchTitle">
                                <div>{launchDetails?.mission_name}</div>
                                <Alert className="launchStatus" variant='success'>Success</Alert>
                            </div>
                            <Row className="rocketName">
                                {launchDetails?.rocket_name}
                            </Row>
                            <div className="launchRefLinks">
                                <img src='./nasa.png' alt='nasa logo' className='nasaLogo'/>
                                <ImWikipedia/>
                                <SlSocialYoutube/>
                            </div>
                        </Col> 
                    </Row>
                    {
                        launchDetails?.details && <Row className='mt-3'>
                            {launchDetails?.details}
                        </Row>
                    }
                    <Row className='mt-4 launchDetails'>
                        <Col>Flight Number</Col>
                        <Col>{launchDetails?.flight_number}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Mission Name</Col>
                        <Col>{launchDetails?.mission_name}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Rocket Type</Col>
                        <Col>{launchDetails?.rocket_type}</Col>
                    </Row >
                    <Row className="launchDetails">
                        <Col>Rocket Name</Col>
                        <Col>{launchDetails?.rocket_name}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Manufacturer</Col>
                        <Col>{launchDetails?.manufacturer}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Nationality</Col>
                        <Col>{launchDetails?.nationality}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Launch Date</Col>
                        <Col>{launchDetails?.launch_date_utc}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Payload Type</Col>
                        <Col>{launchDetails?.payload_type}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Orbit</Col>
                        <Col>{launchDetails?.orbit}</Col>
                    </Row>
                    <Row className="launchDetails">
                        <Col>Launch Site</Col>
                        <Col>{launchDetails?.site_name}</Col>
                    </Row>
                </Modal.Body>
            </>
        }
    </Modal>;
}
 
export default LaunchInfoModal;