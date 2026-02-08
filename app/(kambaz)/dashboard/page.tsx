import Link from "next/link";
import Image from "next/image";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardImg from "react-bootstrap/esm/CardImg";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardText from "react-bootstrap/esm/CardText";
import Button from "react-bootstrap/esm/Button";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
   <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/web-development.png" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Full Stack software developer</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/color.jpg" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ARTF Fundementals</CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Color & Composition</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/algo.jpg" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3000 Algo</CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Algorithms & Data Structures</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/ood.webp" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3500 OOD</CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Object Oriented Design</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/type.jpg" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ARTG Typography</CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Typographic Systems</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/branding.jpg" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ARTG Design </CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Identity and Brand Design</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/drawing.webp" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ARTF1200 Drawing </CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Drawing</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>

                    <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/HCI.jpg" width={"100%"} height={150} alt="reactjs" />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2400 HCI </CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Human Computer Interaction</CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>

                    </Link>
                </Card>
            </Col>


        </Row>



   </div>
  </div>
);}
