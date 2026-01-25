export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <div className="module-options">
        <button> Collapse All </button>
        <button> View Progress </button>
        <button> Publish All </button>
        <button> + Module </button>
      </div>

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
                <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Introduction to the course</li>
                    <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                </li>
            </ul>
        </li>
        <li className="wd-module"> <div className="wd-title">Week 2</div> 
            <ul className="wd-lessons">
                <li className="wd-lesson">
                    <span className="wd-title">LEARNING OBJECTIVES</span>
                    <ul className="wd-content">
                        <li className="wd-content-item">HTML</li>
                        <li className="wd-content-item">Skeleton implementation</li>
                    </ul>
                    <span className="wd-title">READING</span>
                    <ul className="wd-content">
                        <li className="wd-content-item">Chapter 1 - 2: HTML Basics</li>
                    </ul>
                </li>
          </ul>
        </li>
        <li className="wd-module"> <div className="wd-title">Week 3</div>
            <ul className="wd-lessons">
                <li className="wd-lesson">
                    <span className="wd-title">LEARNING OBJECTIVES</span>
                    <ul className="wd-content">
                        <li className="wd-content-item">JavaScript</li>
                    </ul>
                    <span className="wd-title">READING</span>
                    <ul className="wd-content">
                        <li className="wd-content-item">Chapter 2 - 3: JavaScript Basics</li>
                    </ul>
                </li>
          </ul>
        </li>
      </ul>
    </div>
);}
