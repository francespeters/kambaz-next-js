import { Button, Col, FormSelect, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import FormCheck from "react-bootstrap/esm/FormCheck";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

import FormControl from "react-bootstrap/esm/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Row from "react-bootstrap/esm/Row";
import { BsCalendar, BsSearch } from "react-icons/bs";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
        <div id="wd-css-responsive-forms-2">
                <h3>Responsive forms 2</h3>
                <Form>
                    <Row className="mb-3" >
                        <Col>
                            <FormLabel column sm={2}> Assignment Name </FormLabel>
                            <Col sm={10}> <FormControl type="text" defaultValue="A1" /> </Col>
            
                        </Col>  
                        
                    </Row>

                    <Row className="mb-3" >
                            <Col sm={10}>
                                <FormControl as="textarea" style={{ height: "100px" }} defaultValue="This is the assignment description." />
                            </Col>
                    </Row>

                    <Col>
                
                        <Row className="mb-3">
                            <FormLabel column sm={2}> Points </FormLabel>
                            <Col sm={5}> <FormControl type="number" defaultValue="100" /> </Col>
                        </Row>
                        <Row className="mb-3">
                            <FormLabel column sm={2}> Assignment Group </FormLabel>
                            <Col sm={5}>
                                <FormSelect>
                                <option value="1" defaultChecked>ASSIGNMENTS</option>
                                <option value="2">QUIZZES</option>
                                <option value="3">PROJECTS</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <FormLabel column sm={2}> Display Grade as</FormLabel>
                            <Col sm={5}>
                                <FormSelect>
                                <option value="1" defaultChecked> Percentage</option>
                                <option value="2">Letter Grade</option>
                                <option value="3">Points</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <FormLabel column sm={2} > Submission Type </FormLabel>
                            <Col sm={5} className="border border-1 rounded p-3">
                                <FormSelect>
                                <option value="1" defaultChecked>Online</option>
                                <option value="2">In-person</option>
                                </FormSelect>
                                <p className="mt-3"> <strong>Online Entry Options</strong></p>
                                <FormCheck type="checkbox" label="Text Entry" name="online-entry-options" id="wd-chkbox-text-entry"/>
                                <FormCheck type="checkbox" label="Website URL" name="online-entry-options" id="wd-chkbox-web"/>
                                <FormCheck type="checkbox" label="Media Recordings" name="online-entry-options" id="wd-chkbox-rec"/>
                                <FormCheck type="checkbox" label="Student Annotation" name="online-entry-options" id="wd-chkbox-anno"/>
                                <FormCheck type="checkbox" label="File Uploads" name="online-entry-options" id="wd-chkbox-file"/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <FormLabel column sm={2} > Assign </FormLabel>
                            <Col sm={5} className="border border-1 rounded p-3">
                                <Col>
                                    {/* <FormLabel>Assign to</FormLabel>
                                    <Select isMulti options={[
                                        { value: "everyone", label: "Everyone" },
                                        { value: "john-jacob", label: "John Jacob" },
                                        { value: "section-1", label: "Students in Section 1" }
                                    ]} defaultValue={[{ value: "everyone", label: "Everyone" }]} /> */}
                                </Col>

                                <Col>
                                    <FormLabel>Due</FormLabel>

                                    <InputGroup className="mb-3">
                                        <FormControl type="date" defaultValue="2024-01-21" />
                                        <InputGroupText className="bg-white">
                                            <BsCalendar />
                                        </InputGroupText>
                                    </InputGroup>
                                    
                                </Col>

                                <Row>
                                    <Col>
                                    <FormLabel>Available from</FormLabel>

                                    <InputGroup className="mb-3">
                                        <FormControl type="date" defaultValue="2024-01-21" />
                                        <InputGroupText className="bg-white">
                                            <BsCalendar />
                                        </InputGroupText>
                                    </InputGroup>
                                    
                                </Col>

                                <Col>
                                    <FormLabel>Until</FormLabel>

                                    <InputGroup className="mb-3">
                                        <FormControl type="date" defaultValue="2024-01-21" />
                                        <InputGroupText className="bg-white">
                                            <BsCalendar />
                                        </InputGroupText>
                                    </InputGroup>
                                    
                                </Col>


                                </Row>
                            
                            
                            
                            </Col>
                        </Row>
                    </Col>
                </Form>

                <hr/>
                <div className="d-flex gap-2 float-end"> 
                    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress-btn">
                        Cancel </Button>
                
                        <Button variant="secondary" size="lg" className="border-0 bg-danger me-1 float-end text-white" id="wd-collapse-all-btn">
                             Save </Button>
                                
                                
                </div> 
            </div>

    </div>
);}
