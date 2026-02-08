import Link from "next/link";
import { Col } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";

export default function Signup() {
  return (
    
    <div id="wd-signup-screen">
      <Col sm={3}>
      <h3>Sign up</h3>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <FormControl id="wd-password-verify"
             placeholder="verify password" type="password"
             className="mb-2"/>
      <Link id="wd-signup-btn"
            href="/account/profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link>
      <Link  href="/account/signin" > Sign in </Link>
      </Col>
      
    </div>
);}


