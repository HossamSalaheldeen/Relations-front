import React, {useState} from 'react';

function ProfileForm() {
    let [date_of_birth,setDate_Of_Birth] = useState("");
    let [image,setImage] = useState("");


    return (
        <React.Fragment>
            <form>
                <div className="form-group">
                    <label htmlFor="inputDate" className="sr-only">Number*</label>
                    <input type="text" id="inputDate" className="form-control" placeholder="date of birth" required autoFocus
                           onChange={(e)=> setDate_Of_Birth(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="inputImage" className="sr-only">Image*</label>
                    <input type="text" id="inputImage" className="form-control" placeholder="Name" required
                           onChange={(e) => setImage(e.target.value)}
                    />
                </div>
            </form>
        </React.Fragment>
    );
}

export default ProfileForm;