export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label> <br />
      <input id="wd-name" defaultValue="A1 - HTML" /><br /><br />
      <textarea id="wd-description"> The assignment is available online Submit a link to the landing page of </textarea>
      <br />
        <table>
            <tr>
                <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
            </td>
            <td>
                <input id="wd-points" defaultValue={100} />
            </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                <label  htmlFor="wd-select-one-group"> Assignment group </label>
                </td>
                <td>
                    <select id="wd-select-one-group">
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td align="right" valign="top">
                <label  htmlFor="wd-select-one-display">Display grade as </label>
                </td>
                <td>
                    <select id="wd-select-one-display">
                        <option selected value="PERCENTAGE">PERCENTAGE</option>
                        <option value="FRACTION">FRACTION</option>
                        <option value="LETTER">LETTER</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td align="right" valign="top">
                    <label  htmlFor="wd-select-one-sub">Submission type </label>
                </td>    
                
                <td>
                        <tr> 
                            <select id="wd-select-one-sub">
                                <option selected value="ONLINE">ONLINE</option>
                                <option value="IN-PERSON">IN-PERSON</option>
                            </select> 
                        </tr>    
                    
                        <tr> 
                            <label>Online Entry Options</label><br/>

                            <input type="checkbox" name="check-genre" id="wd-chkbox-Text-Entry"/>
                            <label htmlFor="wd-chkbox-Text-Entry">Text Entry</label><br/>

                            <input type="checkbox" name="check-genre" id="wd-chkbox-web"/>
                            <label htmlFor="wd-chkbox-web">Website URL</label><br/>

                            <input type="checkbox" name="check-genre" id="wd-chkbox-rec"/>
                            <label htmlFor="wd-chkbox-rec">Media Recordings</label><br/>

                            <input type="checkbox" name="check-genre" id="wd-chkbox-anno"/>
                            <label htmlFor="wd-chkbox-anno">Student Annotation</label><br/>

                            <input type="checkbox" name="check-genre" id="wd-chkbox-file"/>
                            <label htmlFor="wd-chkbox-file">File Uploads</label>
                        </tr>

                    
                </td>
            </tr>

            <tr>
                <td align="right" valign="top">
                    <label  htmlFor="wd-select-one-assign">Assign </label>
                </td>

                <label> Assign to</label>
                <tr>
                    <input id="wd-points" defaultValue={"Everyone"} />
                </tr>

                <label> Due</label>
                <tr>
                    <input type="date"
                            defaultValue="2000-01-21"
                            id="wd-text-fields-due"/>
                </tr>

                <tr> 
                    <label>Avalable from</label>
                    <tr>
                        <input type="date"
                            defaultValue="2000-01-21"
                            id="wd-text-fields-available-from"/>
                    </tr>  
                    <td> 
                    <label>Until</label>
                        <tr>
                            <input type="date"
                            defaultValue="2000-01-21"
                            id="wd-text-fields-until"/>
                        </tr> 
                    </td>
                </tr>

            </tr>

        </table>
        <div id="wd-cancel-save"> 
            <button>cancel</button>
            <button>save</button>   
        </div>
    </div>
);}
