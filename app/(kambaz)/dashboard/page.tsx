import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
   <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/web-development.png" width={200} height={150} alt="reactjs" />
            <div>
            <h5> CS1234 React JS </h5>
            <p className="wd-dashboard-course-title">
                Full Stack software developer
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/color.jpg" width={200} height={150} alt="reactjs" />
            <div>
            <h5> ARTF Fundementals </h5>
            <p className="wd-dashboard-course-title">
                Color & Composition
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpg" width={200} height={150} alt="reactjs" />
            <div>
            <h5> CS3000 Algo </h5>
            <p className="wd-dashboard-course-title">
                Algorithms & Data Structures
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpg" width={200} height={150} alt="reactjs" />
            <div>
            <h5> CS3500 OOD </h5>
            <p className="wd-dashboard-course-title">
                Object Oriented Programming
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/type.jpg" width={200} height={150} alt="reactjs" />
            <div>
            <h5> ARTG Typography </h5>
            <p className="wd-dashboard-course-title">
                Typographic Systems
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/branding.jpg" width={200} height={150} alt="reactjs" />
            <div>
            <h5> ARTG Design </h5>
            <p className="wd-dashboard-course-title">
                Identity and Brand Design
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/drawing.webp" width={200} height={150} alt="reactjs" />
            <div>
            <h5> ARTF1200 Drawing </h5>
            <p className="wd-dashboard-course-title">
                Drawing
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/HCI.jpg" width={200} height={150} alt="reactjs" />
            <div>
            <h5> CS2400 HCI </h5>
            <p className="wd-dashboard-course-title">
                Human Computer Interaction
            </p>
            <button> Go </button>
            </div>
            </Link>
        </div>


   </div>
  </div>
);}
