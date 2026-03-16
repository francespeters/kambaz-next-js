import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";

export default function AssignmentSearch() {
    

    const { cid } = useParams<{ cid: string }>();
    const router = useRouter();
  return (
    <div className="d-flex justify-content-between align-items-center mb-3"> 
        <InputGroup style={{ width: "300px" }}>
            <InputGroupText className="bg-white">
                <BsSearch />
            </InputGroupText>
            <FormControl placeholder="Search..." />
        </InputGroup>

        <div className="d-flex gap-2"> 
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress-btn">
                 <IoAdd className="fs-4 me-2" /> Group
            </Button>

        <Button variant="secondary" size="lg" className="border-0 bg-danger me-1 float-end text-white" id="wd-collapse-all-btn"
            onClick={() => router.push(`/courses/${cid}/assignments/new`)}
        >
             <IoAdd className="fs-4 me-2" /> Assignment
        </Button>
                
                
        </div> 
    </div>
    
  );
}