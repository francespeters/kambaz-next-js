import Link from "next/link";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import FormControl from "react-bootstrap/esm/FormControl";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <Col sm={3}>
      <h3>Profile</h3>
      <FormControl id="wd-username"
             value="alice"
             className="mb-2"/>
      <FormControl id="wd-password"
             value="123"
             className="mb-2"/>
      <FormControl id="wd-firstname"
             value="Alice"
             className="mb-2"/>
      <FormControl id="wd-lastname"
             value="Wonderland"
             className="mb-2"/>
      <FormControl type="date" defaultValue="2024-01-21" className="mb-2"/>
      <FormControl type="email" defaultValue="alice@wonderland.com" className="mb-2"/>
      <FormControl type="text" defaultValue="User" disabled className="mb-2"/>
      <Button size="lg" className="btn btn-danger w-100 mb-2" id="wd-collapse-all-btn">
                             Sign out </Button>

      </Col>
      
    </div>
);}
