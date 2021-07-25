import React, {useState} from 'react';

function PassportForm() {
    let [number,setNumber] = useState("");
    let [image,setImage] = useState("");
    return (
        <React.Fragment>
            <form>
                <div className="form-group">
                    <label htmlFor="inputNumber" className="sr-only">Number*</label>
                    <input type="text" id="inputNumber" className="form-control" placeholder="Number" required autoFocus
                           onChange={(e)=> setNumber(e.target.value)}
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

export default PassportForm;