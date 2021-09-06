import React, { Component } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      error:false,
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    try{
    const location = e.target.name.value;
    console.log('user Input Location: ', location);
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_key}&q=${location}&format=json`
      );
      console.log(e.target.name.value);

    console.log("our axios response", response.data);

    this.setState({
      location: response.data[0],
    });
  }catch(error){
    this.setState({
     error:true,
    });


  }};

  render() {
let locations
    if (this.state.location.lat) {
      locations =  `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_key}&center=${this.state.location.lat},${this.state.location.lon}&format=jpg `;

    }
    else{
      locations = "";
    }
    return (
      <div>
        <Form onSubmit={this.submitForm}>
  <Form.Group  className="mb-3" controlId="formBasicEmail">
    <Form.Label>Location Name:</Form.Label>
    <Form.Control name="name" type="text" placeholder="Enter location" />
    
  </Form.Group>

  
  <Button variant="primary" type="submit">
  search
  </Button>
</Form>
        {/* <form onSubmit={this.submitForm}>
          <label>Location Name:</label>
          <input name="Name" type="text" placeholder="Enter location" />
          <input type="submit" value="search " />
        </form> */}
      
          {!this.state.error&&
            <div>
          <h1>Location information</h1>
          <p>{this.state.location.display_name}</p>
          <p>{this.state.location.lon}</p>
            <p>{this.state.location.lat}</p>
        <img src={locations} alt={""} />
            </div>}
            {this.state.error &&<p>error getting the data  </p>}
            

       
        
        

      </div>
    );
  }
}

export default App;
