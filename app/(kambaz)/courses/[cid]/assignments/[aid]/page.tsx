import { Button, Col, FormSelect } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import FormCheck from "react-bootstrap/esm/FormCheck";

import FormControl from "react-bootstrap/esm/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Row from "react-bootstrap/esm/Row";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
                <Form>
                    <Row className="mb-3" >
                        <Col>

                            <FormLabel> Assignment Name </FormLabel>
                            <FormControl type="text" defaultValue="A1" placeholder="Assignment name"/> 
            
                        </Col>  
                        
                    </Row>

                    <Row className="mb-3" >
                        <Col>
                        <FormControl as="textarea" style={{ height: "100px" }} placeholder="Assignment description" defaultValue="This is the assignment description." />
                            </Col>
                    </Row>

                    <div id ="wd-assignment-offset-section">
                        <Row className="mb-3">
                            <Col sm={3}>                            
                                <FormLabel> Points </FormLabel>
                            </Col>
                            <Col sm={9}> 
                                <FormControl type="number" defaultValue="100" /> 
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={3}>
                                <FormLabel> Assignment Group </FormLabel>
                            </Col>
                            
                            <Col sm={9}>
                                <FormSelect>
                                    <option value="1" defaultChecked>ASSIGNMENTS</option>
                                    <option value="2">QUIZZES</option>
                                    <option value="3">PROJECTS</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>                            
                                <FormLabel> Display Grade as</FormLabel>
                            </Col>
                            <Col>
                                <FormSelect>
                                <option value="1" defaultChecked> Percentage</option>
                                <option value="2">Letter Grade</option>
                                <option value="3">Points</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>                            
                                <FormLabel column sm={2} > Submission Type </FormLabel>
                            </Col>
                            <Col sm={9} className="border border-1 rounded p-3">
                                <FormSelect>
                                <option value="1" defaultChecked>Online</option>
                                <option value="2">In-person</option>
                                </FormSelect>
                                <p className="mt-3"> <strong>Online Entry Options</strong></p>
                                <FormCheck type="checkbox" label="Text Entry" name="online-entry-options" id="wd-chkbox-text-entry"/>
                                <FormCheck type="checkbox" label="Website URL" name="online-entry-options" id="wd-chkbox-web" defaultChecked/>
                                <FormCheck type="checkbox" label="Media Recordings" name="online-entry-options" id="wd-chkbox-rec"/>
                                <FormCheck type="checkbox" label="Student Annotation" name="online-entry-options" id="wd-chkbox-anno"/>
                                <FormCheck type="checkbox" label="File Uploads" name="online-entry-options" id="wd-chkbox-file"/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>
                                <FormLabel > Assign </FormLabel>
                            </Col>
                            
                            <Col className="border border-1 rounded p-3" sm={9}>
                                <Row>
                                   <Col>
                                    <FormLabel className="fw-bold">Assign to</FormLabel>
                                    <FormControl type="text" defaultValue="Everyone" />
                                    </Col> 
                                </Row>
                                
                                
                                <Row className="mt-3">
                                    <Col >
                                        <FormLabel className="fw-bold">Due</FormLabel>
                                        <FormControl type="date" defaultValue="2024-01-21" /> 
                                    </Col> 
                                </Row>

                                <Row className="mt-3">
                                    <Col sm={6}>
                                        <FormLabel className="fw-bold">Available from</FormLabel>
                                        <FormControl type="date" defaultValue="2024-01-21" />                                 
                                    </Col>

                                    <Col sm={6}>
                                        <FormLabel className="fw-bold">Until</FormLabel>
                                        <FormControl type="date" defaultValue="2024-01-21" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>  
                </Form>
                <hr/>
                <div className="d-flex gap-2 float-end"> 
                    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress-btn">
                        Cancel </Button>
                
                        <Button variant="secondary" size="lg" className="border-0 bg-danger me-1 float-end text-white" id="wd-collapse-all-btn">
                             Save </Button>
                                
                </div> 

    </div>
);}
